import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

class SocketClient {
  socket: Socket | null = null;

  connect() {
    this.socket = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Helper methods to emit events
  createRoom(playerName: string) {
    this.socket?.emit('create_room', { playerName });
  }

  joinRoom(roomId: string, playerName: string) {
    this.socket?.emit('join_room', { roomId, playerName });
  }

  setReady(roomId: string, isReady: boolean) {
    this.socket?.emit('player_ready', { roomId, isReady });
  }

  updateProgress(roomId: string, progress: number, wpm: number, accuracy: number) {
    this.socket?.emit('typing_update', { roomId, progress, wpm, accuracy });
  }

  finishRace(roomId: string, wpm: number, accuracy: number) {
    this.socket?.emit('finish_race', { roomId, wpm, accuracy });
  }
}

export const socketClient = new SocketClient();
