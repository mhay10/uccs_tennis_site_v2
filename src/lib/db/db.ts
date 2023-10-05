import mongoose from "mongoose";
import { DB_URL } from "$env/static/private";

export const db = await mongoose.connect(DB_URL, { user: "admin", pass: "pass" });
