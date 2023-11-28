
import dotenv from 'dotenv';
dotenv.config({path: '../env'});

import { app } from './app.js';

import connectDB from './db/index.js';

// import http from 'http';
// const server = http.createServer(app);
// server.listen(process.env.PORT, () => {
//     console.log(`Server is listening on port ${process.env.PORT}`);
// });

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(` App is listening on port ${process.env.PORT}`);
    })
})