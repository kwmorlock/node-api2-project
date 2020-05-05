const express = require("express"); 
const postRouter = require('./posts/postrouter');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json({ api: 'Wow'})
} )