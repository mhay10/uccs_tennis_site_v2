import mongoose from "mongoose";
import { DB_URL, DB_USERNAME, DB_PASSWORD } from "$env/static/private";

export const db = await mongoose.connect(DB_URL, { user: DB_USERNAME, pass: DB_PASSWORD });
