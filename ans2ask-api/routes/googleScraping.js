import unirest from "unirest";
import cheerio from "cheerio";
import express from 'express';

const router = express.Router();

const getDataFromGoogleSearchResults = (query) => {
    return unirest
        .get(`https://www.google.com/search?q=${query}+youtube+courses&tbm=vid`)
        .headers({
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36, Custom-Agent/1.0"
        })
        .then((response) => {
            let $ = cheerio.load(response.body);

            let titles = [];
            let links = [];

            $(".DhN8Cf > a > h3").each((i, el) => {
                titles[i] = $(el).text();
            });
            $(".DhN8Cf > a").each((i, el) => {
                links[i] = $(el).attr("href");
            });

            const dataFromGoogleSearchResults = [];

            for (let i = 0; i < titles.length; i++) {
                dataFromGoogleSearchResults[i] = {
                    title: titles[i],
                    link: links[i],
                };
            }
            return dataFromGoogleSearchResults;
        });
};

// Route to get Best Youtube Courses depending on query (Subject)
router.get('/google/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const data = await getDataFromGoogleSearchResults(query);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
