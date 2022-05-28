const db = require("../models/");
const Logement = db.logement;

// Create and Save a new Logement
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Logement
    const logement = new Logement({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        characteristic: req.body.characteristic,
        published: req.body.published ? req.body.published : false,
        userId: req.body.userId
    });

    // Save Logement in the database
    logement
        .save(logement)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Logement."
            });
        });
};

// Retrieve all Logements find by title from the database.
exports.findAll = (req, res) => {

    const title = req.query.title;

    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Logement.find(condition)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving logements."
            });
        });
};

// Find a single Logement with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Logement.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Logement with id " + id });
            else res.status(200).send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Logement with id=" + id });
        });

};

// Update a Logement by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Logement.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Logement with id=${id}. Maybe Logement was not found!`
                });
            } else res.status(200).send({ message: "Logement was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Logement with id=" + id
            });
        });

};

// Delete a Logement with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Logement.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Logement with id=${id}. Maybe Logement was not found!`
                });
            } else {
                res.status(200).send({
                    message: "Logement was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Logement with id=" + id
            });
        });

};

// Delete all Logements from the database.
exports.deleteAll = (req, res) => {

    Logement.deleteMany({})
        .then(data => {
            res.status(200).send({
                message: `${data.deletedCount} Logements were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all logements."
            });
        });

};

// Find all published Logements
exports.findAllPublished = (req, res) => {

    Logement.find({ published: true })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving logements."
            });
        });

};