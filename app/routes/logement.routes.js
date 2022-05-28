module.exports = app => {

    const logements = require("../controllers/logement.controller");

    var router = require("express").Router();
    
    // Create a new Logement
    router.post("/", logements.create);

    // Retrieve all Logements
    router.get("/", logements.findAll);

    // Retrieve all published Logements
    router.get("/published", logements.findAllPublished);

    // Retrieve a single Logement with id
    router.get("/:id", logements.findOne);

    // Update a Logement with id
    router.put("/:id", logements.update);

    // Delete a Logement with id
    router.delete("/:id", logements.delete);

    // Create a new Logement
    router.delete("/", logements.deleteAll);

    
    app.use('/api/logements', router);
};