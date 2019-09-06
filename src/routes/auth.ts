import { WellKnownRoles } from './../entity/business/WellKnownRoles';
import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from '../middlewares/checkRole';

const router = Router();
//Login route
router.post("/login", AuthController.login);

//Change my password
router.post("/change-password", [checkJwt], AuthController.changePassword);

// Только email и пароль
router.post("/basic-registration", AuthController.basicRegistration);

router.post("/registration", [checkJwt, checkRole([WellKnownRoles.basic])], AuthController.registration);

export default router;