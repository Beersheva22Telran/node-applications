import bodyParser from 'body-parser';
import express from 'express'
import { users } from './routes/users.mjs';
import morgan from 'morgan';
import config from 'config';
import errorHandler from './middleware/errorHandler.mjs';
import auth from './middleware/auth.mjs';
const app = express();

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(auth);

app.use('/users',users);
const port = process.env.PORT || config.get('server.port')
const server = app.listen(port);
server.on("listening", () => console.log(`server is listening on port ${server.address().port}`))
app.use(errorHandler);