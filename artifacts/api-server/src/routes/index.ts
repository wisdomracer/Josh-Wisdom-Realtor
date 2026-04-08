import { Router, type IRouter } from "express";
import healthRouter from "./health";
import propertiesRouter from "./properties";
import membershipsRouter from "./memberships";
import usersRouter from "./users";

const router: IRouter = Router();

router.use(healthRouter);
router.use(propertiesRouter);
router.use(membershipsRouter);
router.use(usersRouter);

export default router;
