import { websocketStore } from '$lib/websocketStore';

export class Client {
	constructor() {
		this.username = 'web';
		this.websocket = websocketStore;
	}

	join(url) {
		this.websocket.connect(url, {
			onOpen: () => {
				if (this.onOpen) {
					this.sendMessage({ type: 'join', body: this.username });
					this.onOpen();
				}
			},
			onMessage: (message) => {
				if (this.onMessage) {
					this.onMessage(message);
				}
			},
			onClose: () => {
				console.log('WebSocket connection closed.');
				if (this.onClose) {
					this.onClose();
				}
			},
			onError: (event) => {
				console.error(event);
				if (this.onError) {
					this.onError(event);
				}
			}
		});
	}

	leave() {}

	sendMessage(obj) {
		const message = JSON.stringify(obj);
		console.log('[client]message sent:', message);
		this.websocket.sendMessage(message);
	}
}
