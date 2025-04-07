import fs from 'fs';
import path from 'path';
import { Wallet } from '../types/walletType';

// Define the path to the wallets.json file
const walletFilePath = path.join(__dirname, 'wallets.json');

// Read wallets from the file
export const readWalletsFromFile = (): Record<string, Wallet> => {
  try {
    const data = fs.readFileSync(walletFilePath, 'utf-8');
    return JSON.parse(data); // Return parsed wallet data
  } catch (error) {
    console.error("Error reading wallets from file:", error);
    return {};  // Return an empty object if reading fails
  }
};

// Write wallets to the file
export const writeWalletsToFile = (wallets: Record<string, Wallet>) => {
  try {
    const data = JSON.stringify(wallets, null, 2); // Pretty format the data
    fs.writeFileSync(walletFilePath, data, 'utf-8');  // Write to the JSON file
  } catch (error) {
    console.error("Error writing wallets to file:", error);
  }
};

// Create a wallet for a user
export const createWallet = (userId: string, username: string): Wallet => {
  const wallets = readWalletsFromFile();  // Load wallets from the file

  // Check if user already has a wallet
  const existingWallet = Object.values(wallets).find(wallet => wallet.userId === userId);
  if (existingWallet) {
    throw new Error("User already has a wallet");
  }

  // Create new wallet ID (using timestamp as an example for simplicity)
  const walletId = Date.now().toString();
  
  const newWallet: Wallet = {
    username,
    walletId,
    userId,
    balance: 0,  // Initial balance is 0
  };

  wallets[walletId] = newWallet;  // Add new wallet to the in-memory object

  writeWalletsToFile(wallets);  // Save the updated wallets to the file
  return newWallet;
};

// Fund a wallet (adding funds)
export const fundWallet = (userId: string, walletId: string, amount: number): Wallet => {
  const wallets = readWalletsFromFile();  // Load wallets from the file

  const wallet = wallets[walletId];
  if (!wallet || wallet.userId !== userId) {
    throw new Error("Wallet not found or user not authorized");
  }

  wallet.balance += amount;  // Update the balance

  writeWalletsToFile(wallets);  // Save the updated wallets to the file

  return wallet;
};

// Transfer funds between two wallets
export const transferFunds = (userId: string, fromWalletId: string, toWalletId: string, amount: number): { fromWallet: Wallet, toWallet: Wallet } => {
  const wallets = readWalletsFromFile();  // Load wallets from the file

  const fromWallet = wallets[fromWalletId];
  const toWallet = wallets[toWalletId];

  if (!fromWallet || fromWallet.userId !== userId) {
    throw new Error("From wallet not found or user not authorized");
  }

  if (!toWallet) {
    throw new Error("To wallet not found");
  }

  if (fromWallet.balance < amount) {
    throw new Error("Insufficient funds");
  }

  // Perform the transfer
  fromWallet.balance -= amount;
  toWallet.balance += amount;

  writeWalletsToFile(wallets);  // Save the updated wallets to the file

  return {
    fromWallet,
    toWallet,
  };
};