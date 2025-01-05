const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

const app = express();
const port = 3000;


app.use(cors());


app.use(express.static('public'));


app.get('/news', async (req, res) => {
    const category = req.query.category;
    const searchQuery = req.query.q || ''; 

 
    const apiKey = process.env.NEWS_API_KEY;


    const url = `https://newsapi.org/v2/top-headlines?category=${category}&q=${searchQuery}&apiKey=${apiKey}`;

    try {
   
        const response = await axios.get(url);
        res.json(response.data); 
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ message: 'Failed to fetch news articles.' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
