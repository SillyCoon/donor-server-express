import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import role from "./role";
import roleOption from './basic-role-options'

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/role", role);
routes.use("/role-option", roleOption);

export default routes;