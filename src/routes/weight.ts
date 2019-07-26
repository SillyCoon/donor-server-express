import { WellKnownRoles } from './../entity/business/WellKnownRoles';
import { Weight } from './../entity/database/weight';
import { Router } from 'express';
import { BasicRoleOptionsController } from '../controllers/WeightController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();
const weightController = new BasicRoleOptionsController('Weight');

router.get('/', [/*checkJwt, checkRole([WellKnownRoles.basic])*/], weightController.getOptions);

export default router;