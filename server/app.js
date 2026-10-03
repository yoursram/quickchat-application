const express = require('express')
const app = express();
const authRouter  = require('./controllers/authControllers');
const userRouter  = require('./controllers/userController');
const chatRouter  = require('./controllers/chatControllers');
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/chat',chatRouter);


module.exports = app;
