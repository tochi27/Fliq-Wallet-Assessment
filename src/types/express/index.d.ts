// src/types/express/index.d.ts
import { User } from "../userType"; // Path to your User interface

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add user property to the Request type
    }
  }
}
