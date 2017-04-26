var express = require('express');
const app =  express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');

const homeController = require('../controllers/home');
const userController = require('../controllers/user');

//homeController
app.get('/', homeController.index);

//userController
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);


app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.get('/accountDetails', passportConfig.isAuthenticated, userController.getAccountDetails);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);


module.exports = app;
