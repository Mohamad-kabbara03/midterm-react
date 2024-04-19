import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface CallUserPayload {
  userToCall: string;
  signalData: any;
  from: string;
  name: string;
}

interface AnswerCallPayload {
  to: string;
  signal: any;
}

@WebSocketGateway({ cors: true })
export class VideoCallGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(`A client connected. Socket ID: ${client.id}`);
    client.emit('me', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(`Call ended. A client disconnected. Socket ID: ${client.id}`);
    client.broadcast.emit('callEnded');
  }

  @SubscribeMessage('callUser')
  handleCallUser(client: Socket, payload: CallUserPayload) {
    this.server.to(payload.userToCall).emit('callUser', {
      signal: payload.signalData,
      from: payload.from,
      name: payload.name,
    });
  }

  @SubscribeMessage('answerCall')
  handleAnswerCall(client: Socket, payload: AnswerCallPayload) {
    this.server.to(payload.to).emit('callAccepted', payload.signal);
  }
}
