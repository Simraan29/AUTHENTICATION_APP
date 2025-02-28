const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/authRoute');

const app = express();


// 1) Middlewares
app.use(cors());
app.use(express.json());

// 2) Route

app.use('/api/auth', authRouter);

// 3) Moongo DB Connection
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/authentication')
.then(() => console.log('connected to MongoDB!'))
.catch((error)=>console.error('Failed to connect to MongoDB:',error));

// 4) Global error handler
 
app.use((err,req,res, next) => {
    err.statuCode = err.statuCode || 500;
    err.status = err.status || 'error';

    res.status(err.statuCode).json({
        status: err.status,
        message: err.message,
    });
}); 

// 5) server 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on ${PORT}`); 
});

 
