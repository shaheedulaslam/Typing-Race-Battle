import { create } from 'zustand';
import { Player, RaceStatus, Room } from '@/types';

interface GameStore {
  me: Player | null;
  room: Room | null;
  typedText: string;
  wpm: number;
  accuracy: number;
  progress: number;
  timeRemaining: number;
  raceStatus: RaceStatus;
  
  setMe: (player: Player | null) => void;
  setRoom: (room: Room | null) => void;
  updateTypedText: (text: string) => void;
  setRaceStatus: (status: RaceStatus) => void;
  updatePlayerProgress: (playerId: string, progress: number, wpm: number, accuracy: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  me: null,
  room: null,
  typedText: '',
  wpm: 0,
  accuracy: 100,
  progress: 0,
  timeRemaining: 0,
  raceStatus: 'waiting',

  setMe: (me) => set({ me }),
  setRoom: (room) => set({ room, raceStatus: room?.status || 'waiting' }),
  updateTypedText: (typedText) => set({ typedText }),
  setRaceStatus: (raceStatus) => set({ raceStatus }),
  updatePlayerProgress: (playerId, progress, wpm, accuracy) => 
    set((state) => {
      if (!state.room) return state;
      const updatedPlayers = state.room.players.map(p => 
        p.id === playerId ? { ...p, progress, wpm, accuracy } : p
      );
      return { 
        room: { ...state.room, players: updatedPlayers },
        ...(state.me?.id === playerId ? { progress, wpm, accuracy } : {})
      };
    }),
  resetGame: () => set({ typedText: '', wpm: 0, accuracy: 100, progress: 0, raceStatus: 'waiting' }),
}));
