const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");


/* ---------- We can separate our routes into 2 part (here 1s part): ----------  

    for Authentication and for Authorization (accessing protected resources).

    // Authentication \\ :

        * POST /api/auth/signup
        * POST /api/auth/signin
*/


module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    app.post("/api/auth/signin", controller.signin);

    app.post("/api/auth/refreshtoken", controller.refreshToken);
};