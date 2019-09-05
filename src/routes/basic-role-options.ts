import { WellKnownRoles } from '../entity/business/WellKnownRoles';
import { Weight } from '../entity/database/weight';
import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';
import BasicRoleOptionsController from '../controllers/BasicRoleOptionsController';

const router = Router();

router.get('/', [/*checkJwt, checkRole([WellKnownRoles.basic])*/], BasicRoleOptionsController.getRegistrationOptions);
router.get('/:role([a-z]+)', [], BasicRoleOptionsController.getOptions);

export default router;