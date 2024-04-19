import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
  ) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('authenticate')
  async handleAuthentication(client: Socket, token: string) {
    try {
      const userData = await this.authService.validateToken(token);
      client.data.user = userData;
      client.join(`user-${userData.userId}`);
      client.emit('authenticated', { message: 'Authentication successful.' });
      console.log(`Authenticated and joined room: user-${userData.userId}`);
    } catch (error) {
      console.error('Authentication failed:', error.message);
      client.emit('authenticationFailed', { message: error.message });
    }
  }

  @SubscribeMessage('startChat')
  async handleStartChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { user1Id: number; user2Id: number },
  ) {
    try {
      const session = await this.chatService.findOrCreateSession(
        data.user1Id,
        data.user2Id,
      );
      client.join(`session-${session.sessionId}`);
      this.server
        .to(`user-${data.user2Id}`)
        .socketsJoin(`session-${session.sessionId}`);
      client.emit('chatSessionStarted', { session: session });
      console.log(
        `Session ${session.sessionId} started between user ${data.user1Id} and user ${data.user2Id}`,
      );
    } catch (error) {
      console.error('Failed to start or join chat session:', error);
      client.emit('error', { message: error.message });
    }
  }

  @SubscribeMessage('joinSession')
  async handleJoinSession(
    @ConnectedSocket() client: Socket,
    @MessageBody() sessionId: number,
  ) {
    console.log(`Client ${client.id} joining session: ${sessionId}`);
    client.join(`session-${sessionId}`);
    // Emit a confirmation or updated state to the client
    client.emit('sessionJoined', { sessionId });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    { senderId, receiverId, message, sessionId }: {
      senderId: number;
      receiverId: number;
      message: string;
      sessionId: number;
    },
  ) {
    console.log('Received message to send:', {
      senderId,
      receiverId,
      message,
      sessionId,
    });
    try {
      const chatMessage = await this.chatService.sendMessage(
        senderId,
        receiverId,
        message,
        sessionId,
      );
      // Broadcast message to all clients in the same session
      this.server.to(`session-${sessionId}`).emit('newMessage', chatMessage);
    } catch (error) {
      console.error('Failed to send message:', error);
      client.emit('sendMessageError', { error: error.message });
    }
  }

  @SubscribeMessage('callUser')
  async handleCallUser(
    @ConnectedSocket() caller: Socket,
    @MessageBody() data: { userToCall: string, signalData: any, from: string, name: string },
  ) {
    console.log(`Calling user: ${data.userToCall}`);
    caller.broadcast.to(data.userToCall).emit('callUser', data);
  }

  @SubscribeMessage('answerCall')
  async handleAnswerCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { to: string, signal: any },
  ) {
    console.log(`Answering call from: ${data.to}`);
    // Emit the 'answerCall' event to the specific recipient ('to') with the signal data
    client.to(data.to).emit('answerCall', data.signal);
  }

}
