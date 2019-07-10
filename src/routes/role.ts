import { Router } from 'express';
import RoleController from '../controllers/RoleController';

const router = Router();

//Get all users
router.get("/", RoleController.getRoles);

router.post("/", RoleController.addRole);

export default router;