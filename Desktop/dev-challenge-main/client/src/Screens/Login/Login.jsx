import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ImageUploader } from '../../Components/index'
import { Button, Form, Input } from 'antd';
import { requiredMessage, inputPlace, successNotification, errorMessage } from '../../utils/helpers'
import { allPaths } from '../../utils/constants'
import { AUTH } from '../../utils/apis'
import axios from 'axios';
import { loginUser, removeUser } from '../../Redux/actions/authActions'

const Login = (props) => {
    const { history, getPhotos, getNews, getTaskData } = props
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        setLoading(true)
        axios.post(AUTH.LOGIN, values)
            .then((res) => {
                const { data } = res
                setLoading(false)
                if (data?.success) {
                    successNotification('Successfully Logged In!')
                    dispatch(loginUser(data?.user))
                    return setTimeout(() => {
                        history?.replace(allPaths?.HOME)
                        getPhotos(data?.user?._id)
                        getTaskData(data?.user?._id)
                        getNews()
                    }, 300)
                } else {
                    errorMessage(data?.message)
                }
            })
            .catch((e) => {
                setLoading(false)
                errorMessage()
            })
    }

    return (
        <div className='form_container'>
            <div className='form_heading_div'><h1>Hackathon</h1></div>
            <Form className='form'
                name="basic"
                // labelCol={{
                //     span: 8,
                // }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            // autoComplete="off"
            >
                <div className='inputs_container'>
                    <div className='inputs_div login_inputs'>
                        <Form.Item
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your User Username!',
                                },
                            ]}
                        >
                            <Input placeholder='Username' className='inp' />
                        </Form.Item>
                    </div>
                    <div className='inputs_div login_inputs'>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input placeholder='Password' className='inp' type='password' />
                        </Form.Item>
                    </div>
                </div>
                <div className='btn_div'>
                    <Button loading={loading} className='btn login_btn' type="primary" htmlType="submit">
                        Login
                    </Button>
                </div>
                <div className="new_sign_up">
                    <span className='new'>New to the hackathon? </span>
                    <span className='sign_up cursor-pointer' onClick={() => history.push(allPaths?.SIGNUP)}>Sign up</span>
                </div>
            </Form>
        </div>
    )
};
export default Login;