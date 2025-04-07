import fs from 'fs';
import path from 'path';
import { User } from '../types/userType';

const filePath = path.join(__dirname, 'users.json');

export const readUsersFromFile = (): Record<string, User> => {
  if (!fs.existsSync(filePath)) return {};
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

export const writeUsersToFile = (users: Record<string, User>) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};
