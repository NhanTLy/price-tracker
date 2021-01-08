const express = require("express");
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const authController = require("../controllers/authControllers.js");

//Auth Routers:

//SignUp Route:
//POST Request

authRouter.post(
  "/signup",
  authController.createUser,
  (req, res) => {
    jwt.verify(res.locals.token, 'price tracker', (err, authData) => {
      if(err){
        res.status(403).json({message: 'Session token authorization failed'})
      } else {
        res.status(200).json({ message: "Signed In", token: res.locals.token, email: res.locals.email, id: res.locals.id });
      }
    })
  }
);

//Login Route:
//POST Request

authRouter.post(
  "/login",
  authController.verifyUser,
  (req, res) => {
    jwt.verify(res.locals.token, 'price tracker', (err, authData) => {
      if(err){
        res.status(403).json({message: 'Session token authorization failed'})
      } else {
        res.status(200).json({ message: "Signed In", token: res.locals.token, id: res.locals.id, email: res.locals.email });
      }
    })
  }
);

authRouter.get("/logout", authController.logout, (res, req) => {
  res.status(200).json({message: res.locals.message})
})

module.exports = authRouter;
