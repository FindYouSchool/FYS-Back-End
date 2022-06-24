import { Request, Router } from "express";
import { restrictionMiddleware } from "../../middewares/restrictionMiddleware";
import { UserProfile } from "../../common/UserProfile";
import { ForbiddenError } from "../../errors";
import users from "./users";
import profiles from "./profiles";
import roles from "./roles";
import notices from "./notices";

const routes = Router();

routes.use("/users", users);

routes.use("/roles", roles);

routes.use("/profiles", profiles);

// Restriction USer Profile
routes.use(
  restrictionMiddleware(
    (req: Request) => {
      const user = req.getUserAuth<UserProfile>();
      return !!user.profile?.id;
    },
    () => new ForbiddenError("the user must already have a completed profile")
  )
);

routes.use("/notices", notices);

export default routes;
