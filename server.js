import express from 'express';
import helmet from 'helmet';
import {databaseConnect} from './database/mongoConnect.js';
import router from './routes/index.js';
import cors from 'cors';
import { PORT } from './config/config.js';
import morgan from 'morgan';

const app = express();

const port = PORT || 5000;
databaseConnect();
console.log("connected to mongo successfully");
app.use(morgan('combined'))
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"]
    }
  })
)
app.use(express.json());
app.use('/api/v1',router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});