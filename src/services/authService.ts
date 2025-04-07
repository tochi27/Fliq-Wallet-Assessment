import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../types/userType";
import { v4 as uuidv4 } from 'uuid';
import { readUsersFromFile, writeUsersToFile } from '../utils/userStore';

// User Registration Service
export const registerUser = async (username: string, password: string) => {
  const users = readUsersFromFile();

  // Check if user exists
  const userExists = Object.values(users).find(u => u.username === username);
  if (userExists) throw new Error("User already exists");

  const userId = uuidv4(); // Generate unique ID
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: userId,
    username,
    password: hashedPassword,
  };

  users[userId] = newUser;
  writeUsersToFile(users);

  // Create JWT token immediately after registration
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return {
    user: {
      id: newUser.id,
      username: newUser.username
    }
  };
};

// User Login Service
export const loginUser = async (username: string, password: string) => {
  const users = readUsersFromFile();

  const user = Object.values(users).find(u => u.username === username);
  if (!user || !user.password) {
    throw new Error("Invalid user or missing password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid username or password");

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return {
    user: {
      id: user.id,
      username: user.username
    },
    token
  };
};

// Get User-ID Service
export const getUserById = (id: string) => {
  const users = readUsersFromFile();
  return users[id];
};
