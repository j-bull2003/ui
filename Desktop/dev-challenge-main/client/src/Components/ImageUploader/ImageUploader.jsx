import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useState } from 'react';

const ImageUploader = ({ fileList, setFileList }) => {
    // const [fileList, setFileList] = useState([]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    return (
        <>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                beforeUpload={() => false}
                multiple={false}
                accept='image/png, image/jpeg'
            // onPreview={onPreview}
            >
                {fileList.length < 1 && 'Add picture'}
            </Upload>
        </>

    );
};
export default ImageUploader;