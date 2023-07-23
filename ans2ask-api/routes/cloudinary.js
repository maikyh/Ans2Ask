import express from 'express';
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: 'dwbpcm5wg',
    api_key: '157256983181354',
    api_secret: "7nVNoz4EBMCH1YUzGem-BlGEkFI"
})

const router = express.Router();

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

export default router;