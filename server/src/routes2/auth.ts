/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const authRouter = express.Router();
import authController from '../controllers/authController';

//REGISTER
authRouter.post("/register/doctor", authController.registerDoctor);
authRouter.post("/register/patient", authController.registerPatient);

// //REFRESH TOKEN
// router.post("/refresh", authController.requestRefreshToken);
//LOG IN
authRouter.post("/login/doctor", authController.loginDoctor);
authRouter.post("/login/patient", authController.loginPatient);
// //LOG OUT
// router.post("/logout", middlewareController.verifyToken, authController.logOut);

export default authRouter;