import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { promisify } from "util";
import dotenv from "dotenv";
dotenv.config({});

const unlinkAsync = promisify(fs.unlink);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadMedia = async (filePath) => {
  try {
    if (!filePath) return null;

    const uploadResponse = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // ✅ File uploaded successfully, now delete it from local disk
    await unlinkAsync(filePath);

    return uploadResponse;
  } catch (error) {
    console.log("Cloudinary Upload Error:", error);
    return null;
  }
};

export const deleteMediaFormCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.log(error);
  }
};

export const deleteVedioFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
  } catch (error) {
    console.log(error);
  }
};
