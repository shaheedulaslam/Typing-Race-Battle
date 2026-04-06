export interface Player {
  id: string;
  name: string;
  avatar?: string;
  isReady: boolean;
  progress: number; // 0 to 1
  wpm: number;
  accuracy: number;
  isFinished: boolean;
  rank?: number;
}

export type RaceStatus = 'waiting' | 'countdown' | 'racing' | 'finished';

export interface Room {
  id: string;
  players: Player[];
  status: RaceStatus;
  text: string;
  startTime?: number;
  countdown: number;
}
