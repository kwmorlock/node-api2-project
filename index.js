const express = require("express"); 
const postRouter = require('./posts/postrouter');
const server = express();

server.use(express.json());


server.get("/", (req, res) => {
    res.json({ query: req.query, params: req.params, headers: req.headers });
  });
  
  server.use("/api/posts", postRouter);
  
  server.listen(4000, () => {
    console.log("\n*** Server Running on http://localhost:4000 ***\n");
  });