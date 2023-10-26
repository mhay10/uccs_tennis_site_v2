import mongoose from "mongoose";
import { DB_URL, DB_USERNAME, DB_PASSWORD } from "$env/static/private";

mongoose.set("debug", true);

mongoose.connect(DB_URL, { user: DB_USERNAME, pass: DB_PASSWORD });
export const db = mongoose.connection;
db.useDb("tournaments");

db.once("open", () => console.log("DB connection open"));
