import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './src/routers/users.mjs';
import cookie from 'cookie-parser';



const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use('/api', userRouter);
app.use(cookie());

app.listen(PORT, () => console.log(`Server started: localhost ${PORT}/`))

