const express = require('express');
const app =  express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');


const TeamController = require('../controllers/TeamController');
const BoardController = require('../controllers/BoardController');
const ListController = require('../controllers/ListController');
const CardController = require('../controllers/CardController');
const Team = require('../models/Team');
const Board = require('../models/Board');
const List = require('../models/List');
const Card = require('../models/Card');

//Team
app.post('/team', passportConfig.isAuthenticated, TeamController.create);
app.get('/team/:id', passportConfig.isAuthenticated, TeamController.get);
app.get('/team', passportConfig.isAuthenticated, TeamController.getAll);
app.put('/team/:id', passportConfig.isAuthenticated, TeamController.update);
app.delete('/team/:id', passportConfig.isAuthenticated, TeamController.delete);

//Board
app.post('/board', passportConfig.isAuthenticated, BoardController.create);
app.get('/board/:id', passportConfig.isAuthenticated, BoardController.get);
app.get('/board', passportConfig.isAuthenticated, BoardController.getAll);
app.put('/board/:id', passportConfig.isAuthenticated, BoardController.update);
app.delete('/board/:id', passportConfig.isAuthenticated, BoardController.delete);

//Cardslist
app.post('/list', passportConfig.isAuthenticated, ListController.create);
app.get('/list/:id', passportConfig.isAuthenticated, ListController.get);
app.get('/list', passportConfig.isAuthenticated, ListController.getAll);
app.put('/list/:id', passportConfig.isAuthenticated, ListController.update);
app.delete('/list/:id', passportConfig.isAuthenticated, ListController.delete);

//cards
app.post('/card', passportConfig.isAuthenticated, CardController.create);
app.get('/card/:id', passportConfig.isAuthenticated, CardController.get);
app.get('/card', passportConfig.isAuthenticated, CardController.getAll);
app.get('/cardbydate', passportConfig.isAuthenticated, CardController.getAllOrderby);
app.put('/card/:id', passportConfig.isAuthenticated, CardController.update);
app.delete('/card/:id', passportConfig.isAuthenticated, CardController.delete);



module.exports = app;




