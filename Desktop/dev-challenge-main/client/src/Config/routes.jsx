import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MenuLayout } from '../Components'
import allPaths from './paths'
import { Result, Button } from 'antd'
import { Home, Signup, Login, News, Sports, Task, UploadPhoto } from '../Screens'
import axios from 'axios'
import { GET } from '../utils/apis'
import { useSelector } from 'react-redux'
import Papa from "papaparse"
import file from "../assets/file.csv"

const Page404 = (props) => {
    const { history } = props
    return (
        <Result
            status='404'
            title='404'
            subTitle='Sorry, the page you visited does not exist.'
            extra={<Button
                type='primary'
                className='form-button'
                onClick={() => history.push('/')}
            >Back Home</Button>}
        />
    )
}

const Routes = () => {
    const user = useSelector(state => state.authReducer.user)
    // console.log('user',user?._id)
    const [newsData, setNewsData] = useState(null)
    const [taskData, setTaskData] = useState(null)
    const [fileList, setFileList] = useState([])
    const [rows, setRows] = useState(null)

    // useEffect(() => {

    // }, [])

    useEffect(() => {
        Papa.parse(file, {
            download: true,
            header: true,
            complete: data => {
                setRows(data?.data)
            }
        })
        getPhotos()
        getNews()
        getTaskData()
    }, [])
    const getPhotos = (_id) => {
        let id = user?._id ? user?._id : _id
        // console.log('id',id)
        axios.get(`${GET?.GET_PHOTOS}/${id}`)
            .then((res) => {
                const { data } = res
                if (data.success) {
                    console.log(data)
                    setFileList(data?.data || [])
                }
            }).catch((e) => {
                console.log('e', e)
            })
    }
    const getNews = () => {
        axios.get(GET?.GET_NEWS_DATA)
            .then((res) => {
                const { data } = res
                if (data.success) {
                    setNewsData(data?.data || {})
                }
            }).catch((e) => {
                console.log('e', e)
            })
    }
    const getTaskData = (_id) => {
        let id = user?._id ? user?._id : _id
        // console.log('id',id)
        axios.get(`${GET?.GET_TASKS}/${id}`)
            .then((res) => {
                const { data } = res
                if (data.success) {
                    setTaskData(data?.data || [])
                }
            }).catch((e) => {
                console.log('e', e)
            })
    }

    return (
        <Router>
            <Switch>
                <Route path={allPaths?.SIGNUP} exact component={(props) => <Signup user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.LOGIN} exact component={(props) => <Login user={user} rows={rows} {...props} getPhotos={getPhotos} getNews={getNews} getTaskData={getTaskData} />} />
                <Route path={allPaths?.HOME} exact component={(props) => <Home getPhotos={getPhotos} fileList={fileList} newsData={newsData} getTaskData={getTaskData} taskData={taskData} user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.NEWS} exact component={(props) => <News newsData={newsData} user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.SPORTS} exact component={(props) => <Sports user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.TASK} exact component={(props) => <Task getTaskData={getTaskData} taskData={taskData} user={user} rows={rows} {...props} />} />
                <Route path={allPaths?.UPLOADPHOTO} exact component={(props) => <UploadPhoto getPhotos={getPhotos} fileList={fileList} user={user} rows={rows} {...props} />} />
                <Route path='/:page404' exact component={Page404} />
            </Switch >
        </Router >
    )
}

export {
    Routes,
    Page404
}