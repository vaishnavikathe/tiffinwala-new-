import express from "express";
import {
  createContact,
  getContacts
} from "../controllers/contactController.js";

const router = express.Router();

//User sends message
router.post("/", createContact);

//Admin/Vendor view messages 
router.get("/", getContacts);

export default router;