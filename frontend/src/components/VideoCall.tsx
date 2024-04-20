import React, { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface VideoChatProps {
  userId: number;  // Assuming userId is a number
  targetUserId: string;
}

const VideoChat: React.FC<VideoChatProps> = ({ userId, targetUserId }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io('http://localhost:3001'); // Adjust to your server address

    socket.current.on('offer', async (data: { offer: RTCSessionDescriptionInit, fromUserId: number }) => {
      if (!peerConnection.current) initPeerConnection();
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await peerConnection.current?.createAnswer();
      await peerConnection.current?.setLocalDescription(answer!);
      socket.current?.emit('answer', { targetUserId: data.fromUserId, answer });
    });

    socket.current.on('answer', async (data: { answer: RTCSessionDescriptionInit }) => {
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(data.answer));
    });

    socket.current.on('ice-candidate', (data: { candidate: RTCIceCandidateInit }) => {
      if (data.candidate) {
        peerConnection.current?.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      peerConnection.current?.close();
      socket.current?.disconnect();
    };
  }, [userId]);

  const initPeerConnection = () => {
    const config: RTCConfiguration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    };
    peerConnection.current = new RTCPeerConnection(config);
    peerConnection.current.ontrack = (event: RTCTrackEvent) => {
      setRemoteStream(event.streams[0]);
    };
    peerConnection.current.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate) {
        socket.current?.emit('ice-candidate', { targetUserId, candidate: event.candidate.toJSON() });
      }
    };
    localStream?.getTracks().forEach(track => peerConnection.current?.addTrack(track, localStream));
  };

  const startCall = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(mediaStream);
    initPeerConnection();
    const offer = await peerConnection.current?.createOffer();
    await peerConnection.current?.setLocalDescription(offer!);
    socket.current?.emit('offer', { targetUserId, offer });
  };

  return (
    <div>
      <video playsInline muted autoPlay ref={video => video && (video.srcObject = localStream)} />
      <video playsInline autoPlay ref={video => video && (video.srcObject = remoteStream)} />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default VideoChat;
