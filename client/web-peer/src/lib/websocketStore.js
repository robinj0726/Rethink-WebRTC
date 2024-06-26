import { writable } from 'svelte/store';

function createWebSocketStore() {
	const { subscribe, set, update } = writable({
		socket: null,
		isConnected: false
	});

	return {
		subscribe,
		connect: (url, { onOpen, onMessage, onClose, onError } = {}) => {
			const socket = new WebSocket(url);
			set({ socket, isConnected: false });

			socket.addEventListener('open', () => {
				update((state) => ({ ...state, isConnected: true }));
				if (typeof onOpen === 'function') {
					onOpen();
				}
			});

			socket.addEventListener('message', (event) => {
				if (typeof onMessage === 'function') {
					onMessage(event.data);
				}
				// Handle message
			});

			socket.addEventListener('close', () => {
				set({ socket: null, isConnected: false });
				if (typeof onClose === 'function') {
					onClose();
				}
			});

			socket.addEventListener('error', (event) => {
				if (typeof onError === 'function') {
					onError(event);
				}
			});
		},
		sendMessage: (message) => {
			update((state) => {
				if (state.socket && state.isConnected) {
					state.socket.send(message);
				}
				return state;
			});
		},
		close: () => {
			update((state) => {
				if (state.socket) {
					state.socket.close();
				}
				return { socket: null, isConnected: false };
			});
		}
	};
}

export const websocketStore = createWebSocketStore();
