const express   = require("express");
const cors      = require("cors");
const dbConfig  = require("./app/config/db.config");
const app       = express();
const db        = require("./app/models");
const Role      = db.role;

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Jhessy's application." });
});

// all other routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/movies.routes')(app);
require("./app/routes/logement.routes")(app);

// set port, lisent for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});


db.mongoose
    .connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PSW}@${dbConfig.HOST}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        //initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
    
// initialize our 3 roles manually : user, moderator and admin
function initial() {
    Role.estimatedDocumentCount((err, count) => {

        if (!err && count === 0) {

            // add the user's role
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'user' to roles collection");
            });

            // add the moderator's role
            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'moderator' to roles collection");
            });

            // add the admin's role
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("added 'admin' to roles collection");
            });
        }
    });
}