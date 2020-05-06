const express = require("express");
const server = express();
const Db = require("../data/db");

const router = express.Router();

router.get("/api/posts", (req, res) => {
    Db.find(req.query)
      .then(db => {
        res.status(200).json(db);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({ error: "The posts information could not be retrieved." });
      });
  });
  
  router.get("/api/users/:id", (req, res) => {
    Db.findById(req.params.id)
      .then(db => {
        if (db) {
          res.status(200).json(db);
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the db",
        });
      });
  });
  
  router.post("/api/posts", (req, res) => {
    Db.insert(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
            error: "There was an error while saving the post to the database" ,
        });
      });
  });

  router.post("/api/posts/:id/comments", (req, res) => {
    Db.insertComment(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(404).json({
            message: "The post with the specified ID does not exist."  ,
        });
      });
  });

  
  router.delete("/api/posts/:id", (req, res) => {
    Db.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The post has been removed" });
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
            error: "The post could not be removed",
        });
      });
  });
  
  router.put("/:id", (req, res) => {
    const changes = req.body;
    Db.update(req.params.id, changes)
      .then(db => {
        if (db) {
          res.status(200).json(db);
        } else {
          res.status(404).json({ message: "The hub could not be found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error updating the hub",
        });
      });
  });
  
 
  router.get("/api/posts/:id/comments", (req, res) => {
    Db.findPostComments(req.params.id)
      .then(messages => {
        res.status(200).json({ data: messages });
      })
      .catch(error => {
        console.log("error", error);
  
        res.status(404).json({
          message: "The post with the specified ID does not exist." ,
          error: error.message,
        });
      });
  });
  
  
  
  module.exports = router;