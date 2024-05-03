import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js  ";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  // Read the jwt from cookie
  token = req.cookies.jwt;
  console.log("token", token);
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }
    next();
  } catch (error) {
    console.log("ERROR in PROTECT MIDDLEWARE", error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

// Admin middleware
const admin = asyncHandler(async (req, res, next) => {
  if (!(req.user && req.user.isAdmin)) {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
  next();
});
export { protect, admin };
