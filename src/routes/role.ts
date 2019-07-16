import { Router } from 'express';
import RoleController from '../controllers/RoleController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import { WellKnownRoles } from '../entity/business/WellKnownRoles';

const router = Router();

//Get all roles
router.get("/", [checkJwt, checkRole([WellKnownRoles.admin])], RoleController.getRoles);

//Add new role
router.post("/", RoleController.addRole);

export default router;