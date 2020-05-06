const express = require("express"); 
const postRouter = require('./posts/postrouter');
const server = express();

server.use(express.json());


server.get("/", (req, res) => {
    res.send( "hello" );
  });
  
  server.use("/api/posts", postRouter);
  //.use will send to where the get / is
  
  server.listen(4000, () => {
    console.log("\n*** Server Running on http://localhost:4000 ***\n");
  });