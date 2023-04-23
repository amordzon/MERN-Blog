import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (path, folder) => {
    try {
        const data = await cloudinary.v2.uploader.upload(path, {
            folder,
        });
        return { url: data.url, public_id: data.public_id };
    } catch (error) {
        console.log(error);
    }
};

async function removeFromCloudinary(public_id) {
    try {
        await cloudinary.v2.uploader.destroy(public_id);
        return { message: 'Image deleted successfully' };
    } catch (error) {
        console.log(error);
    }
}

export { uploadToCloudinary, removeFromCloudinary };
