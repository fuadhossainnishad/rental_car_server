import express from "express";
import validationRequest from "../../middleware/validationRequest";
import AuthValidationSchema from "./auth.validation";
import AuthController from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  // validationRequest(AuthValidationSchema.userSignInValidation),
  AuthController.signUp
);

router.post(
  "/login",
  // validationRequest(AuthValidationSchema.userSignInValidation),
  AuthController.login
);

router.post(
  "/forgot_password",
  validationRequest(AuthValidationSchema.forgotPasswordValidation),
  AuthController.requestForgotPassword
);

router.post(
  "/verify_forgot_password",
  validationRequest(AuthValidationSchema.verifyForgotPasswordValidation),
  AuthController.verifyForgotPassword
);
router.patch(
  "/update-password",
  validationRequest(AuthValidationSchema.updateUserPasswordValidation),
  AuthController.updateUserPassword
);

const AuthRouter = router;

export default AuthRouter;
