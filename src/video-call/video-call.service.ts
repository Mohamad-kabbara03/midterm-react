import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoCallService {
    private activeCalls = new Map<number, any>(); // Stores active call sessions

    startCall(callInitiatorId: number, callReceiverId: number) {
        const callSessionId = Date.now(); // Simple session ID generation
        const callSession = {
            sessionId: callSessionId,
            initiatorId: callInitiatorId,
            receiverId: callReceiverId,
            callStartTime: new Date(),
        };
        this.activeCalls.set(callSessionId, callSession);
        console.log(`Call started between ${callInitiatorId} and ${callReceiverId}`);
        return callSession;
    }

    endCall(sessionId: number) {
        if (this.activeCalls.has(sessionId)) {
            this.activeCalls.delete(sessionId);
            console.log(`Call with session ID ${sessionId} ended`);
            return true;
        }
        return false;
    }

    getCallSession(sessionId: number) {
        return this.activeCalls.get(sessionId);
    }
}
