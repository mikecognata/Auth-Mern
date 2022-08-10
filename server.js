require('dotenv').config({path: "./config.env"});
const express = require ("express");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');


// Connect DB
connectDB();


// Middleware
const app = express();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

// Error Handler (Should be last piece of Middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 4400;

const server = app.listen(PORT, () => console.log(`The matrix is connected to port ${PORT}`));

process.on("unhandledRejection", (err, promise) =>{
    
    console.log(`Logged Error: ${err}`);

    server.close(() => process.exit(1));
});