import express from 'express';
import mongoose from 'mongoose';
import ShortUrl from './models/shortUrl.js';


const PORT = process.env.PORT || 5000;
mongoose.connect(`mongodb://localhost/urlShortner`)

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', {shortUrls: shortUrls})
 
});

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ fullUrl: req.body.fullUrl });
  res.redirect('/');
});

app.get('/:shortUrls', async (req,res)=>{
  const shortUrl = await ShortUrl.findOne({short: req.params.shortUrls})
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.click++
  shortUrl.save()

  res.redirect(shortUrl.fullUrl)
})


app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});