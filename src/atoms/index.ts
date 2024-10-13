import { Queue } from "@/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
export const queueAtom = atomWithStorage<Queue>("queue", []);
export const currentSongIndexAtom = atomWithStorage("current_song_index", 0);
export const playerCurrentTimeAtom = atom(0);
export const isPlayerInitAtom = atom(false);
export const isTypingAtom = atom(false);
