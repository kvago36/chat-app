import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


// string | ArrayBuffer | null
function getBase64(img: Blob, callback: (d: string | ArrayBuffer | null) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: File) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  
  return isJpgOrPng && isLt2M;
}

interface Params {
  userId: string
}

const Page = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  let { userId } = useParams<Params>()

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImageUrl(imageUrl)
        setLoading(false)
      });
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  console.log(imageUrl, loading)

  return (
    <div>
      <Upload
        name="avatar"
        accept="image/png, image/jpeg"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  )
}

export default Page