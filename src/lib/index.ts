import mongoose from "mongoose";
import { DB_PASSWORD, DB_URL, DB_USERNAME } from "$env/static/private";
import { getActiveTournament } from "./handlers/admin";
import { ActiveTournament } from "./models";

// Enable debugging
mongoose.set("debug", true);

// Connect to database
await mongoose.connect(DB_URL, { user: DB_USERNAME, pass: DB_PASSWORD });
const db = mongoose.connection;
db.useDb("tournaments");

// Get current tournament
export const currentTournament = (await getActiveTournament())!;
export const activeTournament = (await ActiveTournament.findById("ballin"))!;

// Log database connection status
db.once("open", () => console.log("DB connection open"));

// Serialize object to JSON and back to remove mongoose metadata
export function serialize(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}