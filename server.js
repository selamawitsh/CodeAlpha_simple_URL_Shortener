import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to the URL Shortener API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});