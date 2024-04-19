// chat.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatSession } from './chat-session.entity';
import { ChatMessage } from './chat-message.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatSession)
    private readonly chatSessionRepository: Repository<ChatSession>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async startChat(user1Id: number, user2Id: number): Promise<ChatSession> {
    // Retrieve the users from the database
    const user1 = await this.userRepository.findOne({ where: { userid: user1Id }});
    const user2 = await this.userRepository.findOne({ where: {userid: user2Id} });

    // Ensure that both users exist
    if (!user1 || !user2) {
      throw new NotFoundException('One or both users do not exist');
    }

    // Create a new chat session
    const chatSession = new ChatSession();
    chatSession.user1 = user1;
    chatSession.user2 = user2;

    // Save the chat session in the database
    return this.chatSessionRepository.save(chatSession);
  }
  
  async sendMessage(senderId: number, receiverId: number, message: string, sessionId: number): Promise<ChatMessage> {
    // Retrieve sender, receiver, and session entities from the database
    const sender = await this.userRepository.findOne({ where: { userid: senderId } });
    const receiver = await this.userRepository.findOne({ where: { userid: receiverId } });
    const session = await this.chatSessionRepository.findOne({where:{sessionId: sessionId}});
  
    // Ensure that sender, receiver, and session exist
    if (!sender || !receiver || !session) {
      throw new NotFoundException('Sender, receiver, or session not found');
    }
  
    // Create a new chat message and associate it with the session
    const chatMessage = new ChatMessage();
    chatMessage.sender = sender;
    chatMessage.receiver = receiver;
    chatMessage.messageContent = message;
    chatMessage.session = session; // Associate the message with the session
  
    // Save the chat message in the database
    return this.chatMessageRepository.save(chatMessage);
  }
  
  // Method to find an existing chat session between two users
  async findSessionByParticipants(user1Id: number, user2Id: number): Promise<ChatSession | undefined> {
    try {
        // Check both combinations to handle the relationship in any order
        const existingSession = await this.chatSessionRepository
            .createQueryBuilder('chat_session')
            .where('chat_session.user1Id = :user1Id AND chat_session.user2Id = :user2Id', { user1Id, user2Id })
            .orWhere('chat_session.user1Id = :user2Id AND chat_session.user2Id = :user1Id', { user1Id, user2Id })
            .getOne();

        return existingSession;
    } catch (error) {
        console.error('Error finding chat session:', error);
        throw new Error('Error retrieving chat session');
    }
}
// ChatService method to find or create a session
// Assume user1 and user2 are fully loaded User entities or just their IDs
async findOrCreateSession(user1Id: number, user2Id: number): Promise<ChatSession> {
  let session = await this.chatSessionRepository.findOne({
      where: [
          { user1: { userid: user1Id }, user2: { userid: user2Id } },
          { user1: { userid: user2Id }, user2: { userid: user1Id } }
      ],
      relations: ["user1", "user2", "messages"]
  });

  if (!session) {
      // Create new session
      const user1 = await this.userRepository.findOneBy({ userid: user1Id });
      const user2 = await this.userRepository.findOneBy({ userid: user2Id });

      if (!user1 || !user2) {
          throw new Error("One or both users not found");
      }

      session = this.chatSessionRepository.create({ user1: user1, user2: user2 });
      await this.chatSessionRepository.save(session);
  }

  return session;
}


  // async getChatHistory(userId: number): Promise<ChatMessage[]> {
  //   // Retrieve all chat messages where the user is either the sender or the receiver
  //   const chatMessages = await this.chatMessageRepository.find({
  //     where: [
  //       { sender: { userid: userId } },
  //       { receiver: { userid: userId } },
  //     ],
  //   });
    
  //   return chatMessages
  // }

  async getChatHistory(sessionId: number): Promise<ChatMessage[]> {
    // Retrieve all chat messages for the specified session ID
    return this.chatMessageRepository.find({ where: { session: { sessionId: sessionId } } });
  }

  async getChatHistoryBySessionId(sessionId: number): Promise<ChatMessage[]> {
    return this.chatMessageRepository.find({
      where: { session: { sessionId } },
    });
  }
}
