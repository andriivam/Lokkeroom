
import express from "express";
const router = express.Router();
import * as dotenv from "dotenv";
dotenv.config();
import { signupUser, logUser, logOut, createLobby } from '../authentication/controllers.mjs'
import verifyToken from '../middleware/verifyToken.mjs'

// register user
router.post("/auth/signup", signupUser);

// log in user
router.post("/auth/sign", logUser);

// log out user
router.get("/auth/logout",verifyToken, logOut)

//creating new lobbies
router.post("/lobby",verifyToken, createLobby)

export default router;