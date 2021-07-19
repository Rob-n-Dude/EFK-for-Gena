import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categories from './category/router';
import wordCards from './wordCard/router';

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', ['https://rob-n-dude-english-for-kids-admin-panel.netlify.app']);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// if query not starts with '/api/' string - send file from public
// app.use(/^(?!\/api\/)/, express.static('public'));

app.use('/api/categories', categories);
app.use('/api/wordCards', wordCards);
app.use('/static', express.static(`${__dirname}/public`));

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
