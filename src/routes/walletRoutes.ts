import { Router } from "express";
import { createWalletController, fund, transfer } from "../controllers/walletController";
import { authenticateUser } from "../utils/authMiddleware";

const router = Router();


router.post("/createWallet", authenticateUser, createWalletController)

// Here’s the core Wallet API with the key endpoints that are essential for this project:
router.post("/fund", authenticateUser, fund); // Fund a user’s wallet
router.post("/transfer", authenticateUser, transfer); // Transfer from one user to another

export default router;
