import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import role from "./role"

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/role", role);

export default routes;