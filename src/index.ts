import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import walletRoutes from "./routes/walletRoutes";
import { errorHandler } from "./utils/errorHandler";
import logger from "./utils/logger";
import winston from "winston";
import expressWinston from "express-winston";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Log every incoming request
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`); // Log request method and URL
  next();
});

// Add express-winston middleware for request logging
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(), // Add colors for better readability
      winston.format.simple() // Simplify the output
    ),
    meta: false, // Disable detailed metadata (headers, etc.)
    msg: "[{{req.method}}-REQUEST] {{req.url}}  [STATUS-CODE-{{res.statusCode}}] {{res.responseTime}}ms", // Custom message format
    expressFormat: false, // Use the default Express format
    colorize: true, // Enable colorization
  })
);

// App routes
app.use("/api/test/auth", authRoutes);
app.use("/api/test/wallet", walletRoutes);

// Basic home route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
