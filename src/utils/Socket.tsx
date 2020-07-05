import io from 'socket.io-client';

import Config from '../utils/Config';

class MySocket {
  socket: SocketIOClient.Socket | undefined;

  init = () => {
    try {
      this.socket = io(Config.Debug ? Config.LocalIP : Config.ServerIP);
    } catch (err) {
      console.log('Socket Error', err);
    }
  };
  getIO = (): SocketIOClient.Socket | undefined | Error => {
    if (!this.socket) {
      return new Error('Socket not initialized');
    }
    console.log(this.socket.connected);
    return this.socket;
  };
}

let Socket = new MySocket();

export default Socket;
