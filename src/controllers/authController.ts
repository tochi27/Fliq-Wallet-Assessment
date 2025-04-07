import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/authService";
import { responseHandler } from "../utils/responseHandler";


// User Registration
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password)
      throw new Error("Username and password required");
    
    const data = await registerUser(username, password);
    return responseHandler(res, 200, "User registered", data);
  } catch (err) {
    next(err);
  }
};

// User Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new Error("Username and password required");

    const data = await loginUser(username, password);
    return responseHandler(res, 200, "Login successful", data);
  } catch (err) {
    next(err);
  }
};

// User Logout
export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
      // Clear the JWT token stored in an HTTP-only cookie
      res.clearCookie("token");
  
      // Send a success response
      return responseHandler(res, 200, "Logout successful", null);
    } catch (err) {
      next(err);  // Pass the error to the global error handler
    }
  };
