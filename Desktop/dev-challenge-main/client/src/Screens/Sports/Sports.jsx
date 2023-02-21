import React, { useEffect, useState } from 'react'

const Sports = ({ rows }) => {
    const [value, setValue] = useState(null)
    const [data, setData] = useState(null)
    const onchange = (e) => {
        let value = e?.target?.value
        setValue(value)
        let newArr = []
        rows?.filter((val, ind) => {
            if (val?.HomeTeam == value || val?.AwayTeam == value) {
                console.log('val',val)
                let obj
                if (val?.HomeTeam == value && val?.FTR == 'H' && val?.FTR != 'D') {
                    obj = {
                        HomeTeam: val?.HomeTeam,
                        AwayTeam: val?.AwayTeam,
                        FTR: val?.FTR,
                    }
                    // console.log('if', obj)
                    newArr.push(obj)
                } else if (val?.AwayTeam == value && val?.FTR == 'A' && val?.FTR != 'D') {
                    obj = {
                        HomeTeam: val?.HomeTeam,
                        AwayTeam: val?.AwayTeam,
                        FTR: val?.FTR,
                    }
                    // console.log('else if', obj)
                    newArr.push(obj)
                }
            }
        })
        // console.log('rows', rows)

        setData(newArr)
    }

    return (
        <div className='Sports_main_section'>
            <div className="Sports_haeding">
                <h1>Sports</h1>
            </div>
            <div className="team_name_section">
                <input onChange={onchange} type="text" className='Sport_input' name="" id="" placeholder='Input Team Name' />
            </div>

            <div className="teams">
                <ul>
                    These teams You won against:
                </ul>
                <ul>
                    {
                        data?.length ?
                            data?.map((v, i) => {
                                return <li>{i + 1}:{value == v?.AwayTeam ? v?.HomeTeam : v?.AwayTeam}</li>
                            })
                            : value ?
                                <li>No Team Found Against This Record</li> : null
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sports
