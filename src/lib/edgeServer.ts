import { io, Socket } from 'socket.io-client';

export const startSocket = () => {
	console.debug('Connecting to the edge socket server');
	const socket = io('http://localhost:3080');

	// socket.on('eventFromServer', (message) => {
	// 	console.debug(message);
	// });

	return socket;
};

export const endSocket = (socket: Socket) => {
	console.debug('Socket is disconnecting');
	socket.disconnect();
};
