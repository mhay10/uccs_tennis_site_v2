import type { Team } from "$lib/types/teams";
import { writable } from "svelte/store";

export const teams = writable([] as Team[]);
