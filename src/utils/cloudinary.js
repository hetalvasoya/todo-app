// files coming from file FileSystem
import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: '', 
  api_key: '', 
  api_secret: '' 
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log('File is uploaded on cloudinary', response.url);
        return response;
    } catch(err) {
        fs.unlinkSync(localFilePath); //remove the locally saved rempory file as the uloade operation got failed
        return null;
    }
}

export { uploadOnCloudinary };

// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });