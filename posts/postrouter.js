const express = require("express");
const server = express();
const Db = require("../data/db");

const router = express.Router();

router.get("/", (req, res) => {
    Db.find(req.query)
      .then(db => {
        res.status(200).json(db);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the hubs",
        });
      });
  });
  
  router.get("/:id", (req, res) => {
    Db.findById(req.params.id)
      .then(db => {
        if (db) {
          res.status(200).json(db);
        } else {
          res.status(404).json({ message: "Hub not found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the hub",
        });
      });
  });
  
  router.post("/", (req, res) => {
    Db.add(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error adding the hub",
        });
      });
  });
  
  router.delete("/:id", (req, res) => {
    Db.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The hub has been nuked" });
        } else {
          res.status(404).json({ message: "The hub could not be found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error removing the hub",
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
  
  // add an endpoint that returns all the messages for a hub
  router.get("/:id/messages", (req, res) => {
    Db.findDbMessages(req.params.id)
      .then(messages => {
        res.status(200).json({ data: messages });
      })
      .catch(error => {
        console.log("error", error);
  
        res.status(500).json({
          message: "we ran into an issue retrieving the messages",
          error: error.message,
        });
      });
  });
  
  // add an endpoint for adding new message to a hub
  // POST /api/messages --> hub_id is part of the request.body
  // POST /api/hubs/:id/messages --> have the hub_id on the URL
  
  module.exports = router;