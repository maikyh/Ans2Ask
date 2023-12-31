import express from 'express';
import cloudinary from 'cloudinary';

const router = express.Router();

cloudinary.config({
    cloud_name: 'dwbpcm5wg',
    api_key: '157256983181354',
    api_secret: "7nVNoz4EBMCH1YUzGem-BlGEkFI"
})

router.post('/upload/:user', async (req, res) => {
    try {
        const { user } = req.params;
        const fileStr = req.body.data
        const uploadResponse = await cloudinary.v2.uploader
            .upload(fileStr,
                { public_id: user });
        let secureURL = uploadResponse.secure_url
        res.json(secureURL);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

router.get('/images', async (req, res) => {
    try {
        const images = await cloudinary.api.resources({ type: 'upload', max_results: 30 });
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching images from Cloudinary' });
    }
});

router.get('/images/:public_id', async (req, res) => {
    try {
        const { public_id } = req.params;
        const image = await cloudinary.api.resource(public_id);
        res.json(image);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching image from Cloudinary' });
    }
});

export default router;