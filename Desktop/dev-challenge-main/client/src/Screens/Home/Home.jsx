import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Logo from '../../assets/Images/Homelogo.png'
import Cloud from '../../assets/Images/Clouds_icon.png'
import { DemoPie } from '../../Components'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Empty } from 'antd'
import { requiredMessage, inputPlace, errorMessage } from '../../utils/helpers'
import axios from 'axios'
import { allPaths } from '../../utils/constants'
import { GET } from '../../utils/apis'
import { LogoutOutlined } from '@ant-design/icons'
import { removeUser } from '../../Redux/actions/authActions'

const Home = (props) => {
    const { newsData, taskData, history, fileList, rows, getPhotos, getTaskData } = props
    const [weatherLoading, setWeatherLoading] = useState(false)
    let sportsNews = rows?.length && rows[0]
    const dispatch = useDispatch()
    // useEffect(() => {
    //     getPhotos()
    //     getTaskData()
    // }, [])
    const [cord, setCords] = useState({
        latitude: null,
        longitude: null
    })
    const [weatherData, setWeatherData] = useState(null)
    
    function getLocation() {
        if (navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition)
        } else {
            errorMessage("Geolocation is not supported by this browser.")
        }
    }
    function showPosition(position) {
        setCords({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude
        })
        setWeatherLoading(true)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position?.coords?.latitude}&lon=${position?.coords?.longitude}&appid=d0a10211ea3d36b0a6423a104782130e&mode=json&units=metric`)
            .then((res) => {
                const { data } = res
                setWeatherData(data)
                setWeatherLoading(false)
            })
            .catch((e) => {
                setWeatherLoading(false)
                console.log('e', e)
                errorMessage(e)
            })
    }
    useEffect(() => {
        getLocation()
    }, [])

    const navigateNews = () => {
        history.push(allPaths?.NEWS)
    }
    const navigateSport = () => {
        history.push(allPaths?.SPORTS)
    }
    const navigateTask = () => {
        history.push(allPaths?.TASK)
    }
    const navigatePhoto = () => {
        history.push(allPaths?.UPLOADPHOTO)
    }

    return (
        <div className='home_main'>
            <div className="main_home_header">
                <div className="home_logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="Swapnil_heading_div">
                    <h1>Good day Swapnil</h1>
                </div>
                <div className="logout_button">
                    {window?.location?.pathname == allPaths?.HOME ?
                        <Button style={{ backgroundColor: '#ffe65e' }} className='' /* type="primary" */ icon={<LogoutOutlined />} onClick={() => {
                            history.push(allPaths?.LOGIN)
                            dispatch(removeUser())
                        }}>Logout </Button>
                        :
                        <Button icon={<LogoutOutlined />} onClick={() => history.push(allPaths?.HOME)}>Back </Button>
                    }
                </div>
            </div>
            {/* <div className="Home_cards_section"> */}
            <div className="cards_section_one">
                {/* weather card */}
                <div className="Home_card" >
                    <h1>Weather</h1>
                    {
                        weatherLoading ?
                            <div className='spin_div'>
                                <i class="fa fa-spinner fa-spin fa-3x icon-style"></i>
                            </div>
                            :
                            <div className="inner_home_card_section">
                                <div className="weather_data">
                                    <div className="cloud"><img src={`http://openweathermap.org/img/w/${weatherData?.weather[0]?.icon}.png`} alt="" /></div>
                                    <div className="cloud_data"><span>{weatherData?.main?.temp ? weatherData?.main?.temp : 0}</span><span>degrees</span></div>
                                </div>
                                <div className="cloud_city_heading"><h2>{weatherData?.name}</h2></div>
                            </div>
                    }
                </div>
                {/* news card */}
                <div className="Home_card" onClick={navigateNews} >
                    <h1>News</h1>
                    <div className="inner_home_card_section news_and_sport_inner_section  ">
                        <div className="news_heading"><h2>{newsData?.title}</h2></div>
                        <div className="cards_data">
                            <p>
                                {newsData?.content}
                            </p>
                        </div>
                    </div>
                </div>
                {/* sports card */}
                <div className="Home_card" onClick={navigateSport}>
                    <h1>Sport</h1>
                    <div className="inner_home_card_section news_and_sport_inner_section  ">
                        {
                            sportsNews?.HomeTeam ?
                                <>
                                    <div className="news_heading"><h2>{sportsNews && `${sportsNews?.HomeTeam} VS ${sportsNews?.AwayTeam}`}</h2></div>
                                    <div className="cards_data" ><p style={{ textAlign: 'center' }}>
                                        {
                                            sportsNews?.FTR == 'H'
                                                ?
                                                `${sportsNews?.HomeTeam} won the match`
                                                :
                                                sportsNews?.FTR == 'D' ?
                                                    `${sportsNews?.HomeTeam} match has been tied`
                                                    : `${sportsNews?.HomeTeam} won the match`
                                        }
                                    </p>
                                    </div>
                                </>
                                : <Empty />
                        }

                    </div>
                </div>
                {/* Photod Card */}
                <div className="Home_card" onClick={navigatePhoto}>
                    <h1>Photos</h1>
                    <div className="inner_home_card_section   ">
                        <div className='photos_inner_section'>
                            {
                                fileList?.length ?
                                    fileList?.slice(0, 4)?.map((v, i) => {
                                        return (
                                            <div key={i} className=" photos_box">
                                                <img src={v?.imageUrl} className='upload_img' />
                                            </div>
                                        )
                                    })
                                    : <Empty />
                            }
                        </div>
                    </div>
                </div>
                {/* Task Card */}
                <div className="Home_card" onClick={navigateTask}>
                    <h1>Task</h1>
                    <div className="task_card">
                        {
                            taskData?.length ?
                                taskData?.slice(0, 3)?.map((val, i) => {
                                    return (
                                        <div className='task_data   '>
                                            <div className="task  task_border">{val?.description}</div>
                                            <div className="task_box">{val?.isCompleted ? '✔️' : null}</div>
                                        </div>
                                    )
                                })
                                : <Empty />
                        }
                    </div>
                </div>
                {/* clothes card */}
                <div className="Home_card">
                    <h1>Clothes</h1>
                    <div className="inner_home_card_section news_and_sport_inner_section  ">
                        <DemoPie />
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    )
}

export default Home