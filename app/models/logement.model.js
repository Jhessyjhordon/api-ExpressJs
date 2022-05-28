const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");


/* --------- Ici nous avons un schema qui nous enregistrer les données sous cette forme : ----------
    {
        "_id": "5e363b135036a835ac1a7da8",
        "title": "title for the tuto",
        "description": "Description for the tuto",
        "price": 99.99,
        "characteristic": "characteristic for the tuto"
        "published": true,
        "createdAt": "2022-04-02T02:59:31.198Z",
        "updatedAt": "2022-04-02T02:59:31.198Z",
        "__v": 0
    }
*/

var schema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        characteristic: String,
        published: Boolean,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

//  Comme nous utiliserons un front-end qui comprend mieux "id" au lieu de "_id"
//  on l'override en Json grace a cette methode :

// schema.method("toJSON", () => {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });

//schema.plugin(mongoosePaginate);

const Logement = mongoose.model("Logement", schema);


module.exports = Logement;