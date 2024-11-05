import axios from "axios";

export const handleUploadProfilePicture = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'du4wrvo5j';
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'ai mind map';
    console.log(cloudName, uploadPreset);

    if (!cloudName || !uploadPreset) {
      throw new Error("Cloudinary environment variables are not set");
    }

    formData.append("cloud_name", cloudName);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    console.log(response, response.data.secure_url);
    return response.data.secure_url;
  };
