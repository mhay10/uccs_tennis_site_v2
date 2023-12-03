import mongoose from "mongoose";
import { DB_URL, DB_USERNAME, DB_PASSWORD } from "$env/static/private";
import { getActiveTournament } from "./handlers/admin";
import { ActiveTournament } from "./models";

mongoose.set("debug", true);

mongoose.connect(DB_URL, { user: DB_USERNAME, pass: DB_PASSWORD });
const db = mongoose.connection;
db.useDb("tournaments");

export const currentTournament = (await getActiveTournament())!;
export const activeTournament = (await ActiveTournament.findById("ballin"))!;

db.once("open", () => console.log("DB connection open"));

export function serialize(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}
