// const { verify } = require("jsonwebtoken");
// require("dotenv").config();

// module.exports = {
//   checkToken: (req, res, next) => {
//     let token = req.get("authorization");

//     if (token) {
//       token = token.slice(7);
//       verify(token, process.env.JWTSECRET, (err, decoded) => {
//         if (err) {
//           res.json({
//             message: "invalid Token",
//           });
//         } else {
//           req.userId = decoded.result.id;
//           next();
//         }
//       });
//     } else {
//       res.json({
//         message: "Use Token!",
//       });
//     }
//   },
// };