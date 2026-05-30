import express from "express";
import {
  createContact,
  getContacts
} from "../controllers/contactController.js";

const contactRoutes = express.Router();

//User sends message
contactRoutes.post("/", createContact);

//Admin/Vendor view messages 
contactRoutes.get("/", getContacts);

export default contactRoutes;