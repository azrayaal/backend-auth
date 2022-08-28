import express from 'express';
import db from './config/Database.js';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import Users from './models/userModel.js';

dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log('database is connected...');

  //   buat bikin table data kalo ga ada data di database
  //   await Users.sync();
} catch (error) {
  console.log(error);
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('server is running at port 5000'));
