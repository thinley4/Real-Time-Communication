import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  socket.on('chat message', async (msg) => {
    let result;
    try{
      result = await db.run('INSERT INTO messages (content) VALUES (?)', msg);
    } catch (e) {
      return;
    }
    io.emit('chat message', msg, result.lastID);
  })
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
