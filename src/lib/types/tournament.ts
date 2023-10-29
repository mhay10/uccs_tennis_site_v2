import type { Bracket } from "./bracket";
import type { Pool } from "./pool";
import type { Team } from "./teams";

export type Tournament = {
  _id: string;
  name: string;
  teams: Team[];
  pools: Pool[];
  brackets: Bracket[];
};
