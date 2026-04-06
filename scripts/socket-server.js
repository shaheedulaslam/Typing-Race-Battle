const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const rooms = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("create_room", ({ playerName }) => {
    const roomId = Math.random().toString(36).substring(7);
    const room = {
      id: roomId,
      players: [{
        id: socket.id,
        name: playerName,
        isReady: false,
        progress: 0,
        wpm: 0,
        accuracy: 100,
        isFinished: false
      }],
      status: 'waiting',
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts."
    };
    rooms.set(roomId, room);
    socket.join(roomId);
    socket.emit("room_created", room);
  });

  socket.on("join_room", ({ roomId, playerName }) => {
    const room = rooms.get(roomId);
    if (room) {
      const newPlayer = {
        id: socket.id,
        name: playerName,
        isReady: false,
        progress: 0,
        wpm: 0,
        accuracy: 100,
        isFinished: false
      };
      room.players.push(newPlayer);
      socket.join(roomId);
      io.to(roomId).emit("room_updated", room);
    } else {
      socket.emit("error", "Room not found");
    }
  });

  socket.on("player_ready", ({ roomId, isReady }) => {
    const room = rooms.get(roomId);
    if (room) {
      const player = room.players.find(p => p.id === socket.id);
      if (player) player.isReady = isReady;

      const allReady = room.players.every(p => p.isReady);
      if (allReady && room.players.length > 1) {
        room.status = 'countdown';
        io.to(roomId).emit("room_updated", room);
        
        let count = 3;
        const interval = setInterval(() => {
          count--;
          if (count === 0) {
            clearInterval(interval);
            room.status = 'racing';
            io.to(roomId).emit("room_updated", room);
          } else {
            io.to(roomId).emit("countdown", count);
          }
        }, 1000);
      } else {
        io.to(roomId).emit("room_updated", room);
      }
    }
  });

  socket.on("typing_update", ({ roomId, progress, wpm, accuracy }) => {
    const room = rooms.get(roomId);
    if (room) {
      const player = room.players.find(p => p.id === socket.id);
      if (player) {
        player.progress = progress;
        player.wpm = wpm;
        player.accuracy = accuracy;
      }
      socket.to(roomId).emit("player_progress", { playerId: socket.id, progress, wpm, accuracy });
    }
  });

  socket.on("finish_race", ({ roomId, wpm, accuracy }) => {
    const room = rooms.get(roomId);
    if (room) {
      const player = room.players.find(p => p.id === socket.id);
      if (player) {
        player.isFinished = true;
        player.wpm = wpm;
        player.accuracy = accuracy;
      }
      
      const allFinished = room.players.every(p => p.isFinished);
      if (allFinished) {
        room.status = 'finished';
      }
      io.to(roomId).emit("room_updated", room);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    rooms.forEach((room, roomId) => {
        const playerIndex = room.players.findIndex(p => p.id === socket.id);
        if (playerIndex !== -1) {
            room.players.splice(playerIndex, 1);
            if (room.players.length === 0) {
                rooms.delete(roomId);
            } else {
                io.to(roomId).emit("room_updated", room);
            }
        }
    });
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
