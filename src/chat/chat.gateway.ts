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
    {
      senderId,
      receiverId,
      message,
      sessionId,
    }: {
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

  @SubscribeMessage('offer')
  async handleOffer(@ConnectedSocket() client: Socket, @MessageBody() data: { offer: RTCSessionDescriptionInit; target: string; senderId: number }): Promise<void> {
    console.log(`Received offer from ${data.senderId}, forwarding to ${data.target}`);
    this.server.to(data.target).emit('offer', { from: data.senderId, offer: data.offer });
  }

  @SubscribeMessage('answer')
  async handleAnswer(@ConnectedSocket() client: Socket, @MessageBody() data: { answer: RTCSessionDescriptionInit; target: string; senderId: number }): Promise<void> {
    console.log(`Sending answer from ${data.senderId} to: ${data.target}`);
    this.server.to(`user-${data.target}`).emit('answer', { from: data.senderId, answer: data.answer });
    console.log(`Answer emitted to user-${data.target}`);
  }

  @SubscribeMessage('ice-candidate')
  async handleIceCandidate(@ConnectedSocket() client: Socket, @MessageBody() data: { candidate: RTCIceCandidate; target: string; senderId: number }): Promise<void> {
    console.log(`Sending ICE candidate from ${data.senderId} to: ${data.target}`);
    this.server.to(data.target).emit('ice-candidate', { from: data.senderId, candidate: data.candidate });
    console.log(`ICE candidate emitted to user-${data.target}`);
  }

  @SubscribeMessage('call-user')
  async handleCallUser(@ConnectedSocket() client: Socket, @MessageBody() data: { target: string; senderId: number }): Promise<void> {
    console.log(`Call User button clicked by ${data.senderId}, calling user-${data.target}`);
    this.server.to(`user-${data.target}`).emit('incomingCall', { from: data.senderId });
    console.log(`Incoming call emitted to user-${data.target}`);
  }
}
