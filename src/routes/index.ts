import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import role from "./role";
import weight from "./weight";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/role", role);
routes.use("/weight", weight);

export default routes;