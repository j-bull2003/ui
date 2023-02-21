import React, { useState, useEffect, useRef } from 'react'
import { ImageUploader } from '../../Components/index'
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { requiredMessage, inputPlace, successNotification, errorMessage, warningMessage } from '../../utils/helpers'
import { AUTH } from '../../utils/apis'
import { allPaths, provincie } from '../../utils/constants'
import axios from 'axios'
import { removeUser } from '../../Redux/actions/authActions'

const Signup = (props) => {
    const { history } = props
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState([])

    const onFinish = (values) => {
        values.file = fileList[0]
        console.log('Success:', values)

        if (!values?.file) {
            return warningMessage('Please Upload Logo!')
        }

        let formData = new FormData()

        if (values?.file) {
            formData.append('file', values?.file?.originFileObj)
        }

        for (var [k, v] of Object.entries(values)) {
            if (k && v) {
                console.log(k, v)
                formData.append(k, v)
            }
        }
        console.log('formData',formData)
        setLoading(true)
        axios.post(AUTH?.SIGNUP, formData)
            .then((res) => {
                const { data } = res
                setLoading(false)
                if (data?.success) {
                    successNotification(
                        'Successfully Signup'
                    )
                    return setTimeout(() => {
                        history.push(allPaths?.LOGIN)
                    }, 300)
                }
                errorMessage(data?.message)
            })
            .catch((e) => {
                setLoading(false)
                errorMessage()
            })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
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
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className='inputs_container'>
                    <div className='inputs_div'>
                        <div>
                            <Form.Item
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder='Username' className='inp' />
                            </Form.Item>
                        </div>
                        <div className="password_inputs">
                            {/* <Form.Item className='password_inputs'
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input placeholder='Password' className='inp' />
                            </Form.Item></div> */}
                            <Form.Item
                                name='password'
                                // label='Password'
                                // hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: requiredMessage('Password')
                                    },
                                    {
                                        min: 6
                                    }
                                ]}
                            >
                                <Input
                                    className='inp'
                                    placeholder={'password'}
                                    type='password'
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='inputs_div'>
                        <div>
                            <Form.Item
                                name='email'
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input placeholder='Email' className='inp' />
                            </Form.Item>
                        </div>
                        <div className="password_inputs">
                            {/* <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Confirm your password!',
                                    },
                                ]}
                            >
                                <Input placeholder='Confirm Password' className='inp' />
                            </Form.Item> */}
                            <Form.Item
                                name='confirm'
                                rules={[
                                    {
                                        required: true,
                                        message: requiredMessage('confirm password'),
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(
                                                'The two passwords that you entered do not match!'
                                            )
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder={'confirm password'}
                                    className='inp'
                                    type='password'
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className='upload_image_div'>
                    <ImageUploader fileList={fileList} setFileList={setFileList} />
                </div>
                <div className='btn_div'>
                    <Button loading={loading} className='btn' type="primary" htmlType="submit">
                        Register
                    </Button>
                </div>
            </Form>
        </div>
    )
}
export default Signup