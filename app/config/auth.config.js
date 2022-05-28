/* 
    jsonwebtoken functions such as verify() or sign() use algorithm that needs a secret key (as String) to encode and decode token.
*/

module.exports = {
    secret: "jhessy-secret-key",
    // jwtExpiration: 3600,           // 1 hour
    // jwtRefreshExpiration: 86400,   // 24 hours
    /* for test */
    jwtExpiration: 60,          // 1 minute
    jwtRefreshExpiration: 120,  // 2 minutes
};