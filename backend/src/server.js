import * as dotenv from 'dotenv';

import express from 'express';
import { fileURLToPath } from 'url';
import imageRouter from './routers/file.js';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import productRouter from './routers/products.js';
import userRouter from './routers/users.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

/* config */
dotenv.config();
const app = express();
app.use(morgan('combined'));
app.use(express.json());

/* port */
const port = process.env.PORT || 3000;

/* router */
app.use(express.static('src/images'));
app.use('/api/file', imageRouter);
app.use('/api', productRouter);
app.use('/api', userRouter);

/* database */
const database = process.env.MONGODB_URL;
mongoose
	.connect(database)
	.then(() => console.log('Connected to MongoDB...'))
	.catch(() => console.error('Could not connect to MongoDB...'));

/* connect port */
app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
