import { allCards } from "@/modules/private/user/book/list/content/practiceBook/practiceByGame/gameFlipCard/fakedata";
import { create } from "zustand";

const GRID_SIZE = 15;

export interface GameState {
  started: boolean;
  isRunning: boolean;
  isChecking: boolean;
  seconds: number;
  visibleCards: Card[];
  cardQueue: Card[];
  selected: Card[];
  matched: number[];
  mismatched: number[];
  initGame: () => void;
  startGame: () => void;
  tick: () => void;
  selectCard: (card: Card) => void;
  matchSuccess: (pairId: number, visibleCards: Card[], cardQueue: Card[]) => void;
  matchFail: (ids: number[]) => void;
  clearMismatch: () => void;
}

export const gameFlipCardStore = create<GameState>((set) => ({
  started: false,
  isRunning: false,
  isChecking: false,
  seconds: 0,
  visibleCards: [],
  cardQueue: [],
  selected: [],
  matched: [],
  mismatched: [],

  initGame: () => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    set({
      visibleCards: shuffled.slice(0, GRID_SIZE),
      cardQueue: shuffled.slice(GRID_SIZE),
    });
  },

  startGame: () => set({ started: true, isRunning: true }),

  tick: () => set((s) => ({ seconds: s.seconds + 1 })),

  selectCard: (card) =>
    set((s) => ({
      selected: [...s.selected, card],
    })),

  matchSuccess: (pairId, visibleCards, cardQueue) =>
    set((s) => ({
      matched: [...s.matched, pairId],
      visibleCards,
      cardQueue,
      selected: [],
      isChecking: false,
    })),

  matchFail: (ids) =>
    set({
      mismatched: ids,
      isChecking: false,
    }),

  clearMismatch: () =>
    set({
      mismatched: [],
      selected: [],
    }),
}));
