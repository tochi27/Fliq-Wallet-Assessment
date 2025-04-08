import { Request, Response, NextFunction } from "express";
import fs from 'fs';
import path from 'path';
import { responseHandler } from "../utils/responseHandler";
import { createWallet } from "../services/walletService";
import { Wallet } from "../types/walletType";


// Function to read wallets from the JSON file
const readWallets = () => {
  const data = fs.readFileSync(path.join(__dirname, '../services/wallets.json'), 'utf-8');
  return JSON.parse(data);
};

// Function to save wallets to the JSON file
const saveWallets = (wallets: Record<string, Wallet>) => {
  fs.writeFileSync(path.join(__dirname, '../services/wallets.json'), JSON.stringify(wallets, null, 2));
};

// Create a new wallet for the authenticated user
export const createWalletController = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user;
    
    // Check if user is undefined or null
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const userId = user.id;
    const username =user.username
    const newWallet = createWallet(userId, username);

    return responseHandler(res, 200, 'Wallet created', { walletId: newWallet.walletId });
  } catch (err) {
    next(err);
  }
};

// Fund User wallet
export const fund = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { walletId, amount } = req.body;
    const user = req.user;

    // Check if user is undefined or null
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const userId = user.id;

    // Read wallets from the file
    const wallets = readWallets();

    // Ensure the wallet exists
    const wallet = wallets[walletId];
    if (!wallet) {
      throw new Error("Wallet not found");
    }

    // Ensure the user is authorized to fund this wallet
    if (wallet.userId !== userId) {
      throw new Error("User not authorized to fund this wallet");
    }

    // Fund the wallet
    wallet.balance += amount;

    // Save the updated wallets to the JSON file
    saveWallets(wallets);

    return res.status(200).json({ message: 'Wallet funded', wallet });
  } catch (err) {
    next(err);
  }
};

// Transfer from one user wallet to another
export const transfer = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fromWalletId, toWalletId, amount } = req.body;
    const user = req.user;

    // Check if user is undefined or null
    if (!user) {
      throw new Error("User is not authenticated");
    }

    const userId = user.id;

    // Read wallets from the file
    const wallets = readWallets();

    // Ensure the sender wallet exists
    const fromWallet = wallets[fromWalletId];
    if (!fromWallet || fromWallet.userId !== userId) {
      throw new Error("Sender wallet not found or user not authorized");
    }

    // Ensure the receiver wallet exists
    const toWallet = wallets[toWalletId];
    if (!toWallet) {
      throw new Error("Receiver wallet not found");
    }

    // Check if sender has enough balance
    if (fromWallet.balance < amount) {
      throw new Error("Insufficient funds");
    }

    // Perform the transfer
    fromWallet.balance -= amount;
    toWallet.balance += amount;

    // Save the updated wallets to the JSON file
    saveWallets(wallets);

    return res.status(200).json({
      message: 'Transfer successful',
      fromWallet,
      toWallet,
    });
  } catch (err) {
    next(err);
  }
};
