import express from "express";
import { contactRecieveMail } from "../controllers/email.controller.js";
const router=express.Router()
router.post("/send-email",contactRecieveMail)
export {router}