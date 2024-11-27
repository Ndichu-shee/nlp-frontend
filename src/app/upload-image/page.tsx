
'use client';
import ImageUpload from "./components/ImageUpload";

const UploadImage = () => {
  return (
    <div className="p-10 ">
      <div className="mb-1 ">
        <span className="border border-[#000000] rounded-lg text-[#EE61BD] text-[40px] p-2 font-extrabold">
          PinkCheck AI
        </span>
      </div>
      <h1 className="text-[40px] font-normal text-[#EE61BD] text-center ">
        Upload Your Medical Images
      </h1>
     
        <ImageUpload />
      
    </div>
  );
};

export default UploadImage;
