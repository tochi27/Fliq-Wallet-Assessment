import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../types/userType";


// Middleware to verify JWT and extract user data
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & User;

    // Now cast the decoded token as a User and attach it to the request
    req.user = {
      id: decoded.id, // Assuming the JWT contains these fields
      username: decoded.username,
    } = decoded as User;
    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
