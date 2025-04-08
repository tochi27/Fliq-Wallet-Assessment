// src/types/express/index.d.ts
import { User } from "../userType";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
