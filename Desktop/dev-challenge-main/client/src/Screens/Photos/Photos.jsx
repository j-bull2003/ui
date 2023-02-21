import { PhotoUpl } from "../../Components"

export const UploadPhoto = ({ fileList ,getPhotos}) => {
  return (
    <>
      <div className="photo_main_div">
        <div>
          <h1 className="photo_h1">Photos</h1>
        </div>
        <div>
          <PhotoUpl fileList={fileList} getPhotos={getPhotos} />
        </div>
      </div>
    </>
  )
}