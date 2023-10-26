import { model } from "mongoose";
import { activeTournamentSchema, tournamentSchema } from "./schemas";

export const ActiveTournament = model("ActiveTournament", activeTournamentSchema, );
export const Tournament = model("details", tournamentSchema);
