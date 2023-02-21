import { Button, Spin, Upload } from 'antd'
import { useEffect, useState } from 'react'
import plus from '../../assets/Images/Plus_button.png'
import { errorMessage, getBase64, successMessage, warningMessage } from '../../utils/helpers'
import { POST } from '../../utils/apis'
import { useSelector } from 'react-redux'
import axios from 'axios'

const PhotoUpl = ({ fileList, getPhotos }) => {
    const user = useSelector(state => state?.authReducer?.user)
    const [photosData, setPhotosData] = useState(false)
    const [loadingDelete, setLoadingDelete] = useState(false)
    const [spin, setSpin] = useState({})

    const onChange = ({ fileList: newFileList }) => {
        const formData = new FormData()
        setPhotosData(true)

        for (let files of newFileList) {
            formData.append('file', files?.originFileObj)
        }

        formData.append('userId', user?._id)

        axios.post(POST?.ADD_PHOTOS, formData)
            .then((res) => {
                const { data } = res
                if (data?.success) {
                    successMessage(data?.message)
                    getPhotos()
                } else {
                    errorMessage(data?.message)
                }
                setPhotosData(false)
            }).catch((e) => {
                setPhotosData(false)
                console.log('e', e)
            })
    }
    const Uploader = (
        <div className='uploader_main'>
            <div className='upload_main_div'>
            </div>
            <div className='upload_plus_div'>
                <img src={plus} draggable={false} className='upload_plus_icon' />
            </div>
        </div>
    )
    const deletePhoto = (id) => {
        setSpin({ [id]: true })
        axios.post(POST?.DELETE_PHOTOS, { _id: id })
            .then((res) => {
                const { data } = res
                if (data.success) {
                    successMessage(data?.message)
                    setSpin({})
                    getPhotos()
                }
            }).catch((e) => {
                console.log('e', e)
                setSpin({})
                errorMessage(e)
            })
    }
    console.log(fileList)
    return (
        <div className='upload_div'>
            <Upload
                fileList={fileList}
                onChange={onChange}
                onPreview={null}
                beforeUpload={() => false}
                multiple={false}
                accept='image/png, image/jpeg'
                showUploadList={false}
            >

                {
                    photosData ?
                        <>
                            <div className='uploader_main'>
                                <div className='upload_main_div'>
                                </div>
                                <div className='upload_plus_div'>
                                    <i className="fa fa-spinner fa-spin fa-3x icon-style"></i>
                                </div>
                            </div>
                        </>
                        :
                        Uploader
                }
            </Upload>
            {fileList?.length >= 1 ?
                <>
                    {
                        fileList?.map((v, i) => {
                            return (
                                <div className='uploader_main'>
                                    <div className=' upload_main_div2'>
                                        <span className='check_icon' >
                                            {spin[v?._id] ?
                                                <i class="fa fa-spinner fa-spin">&nbsp;</i>
                                                :
                                                <Button onClick={() => deletePhoto(v?._id)}>X</Button>
                                            }
                                        </span>
                                        <div>
                                            <img src={v?.imageUrl} className='upload_img' />
                                        </div>
                                    </div>
                                    </div>
                            )
                        })
                    }
                </>
                :
                null
            }
        </div>
    )
}
export default PhotoUpl