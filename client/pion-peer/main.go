package main

import (
	"bufio"
	"fmt"
	"os"
	"github.com/gorilla/websocket"
)

func main() {
	// URL of the WebSocket server
	url := "ws://localhost:3000/hello-ws"
	// Dialer creates a new client connection to the URL.
	conn, _, err := websocket.DefaultDialer.Dial(url, nil)
	if err != nil {
		fmt.Println("Error connecting to WebSocket server:", err)
		return
	}
	defer conn.Close()

	fmt.Println("Connected to WebSocket server")

	// Send a message to the server
	message := "Hello from the client!"
	err = conn.WriteMessage(websocket.TextMessage, []byte(message))
	if err != nil {
		fmt.Println("Error sending message:", err)
		return
	}
	fmt.Println("Message sent:", message)

	// Read response from the server
	_, response, err := conn.ReadMessage()
	if err != nil {
		fmt.Println("Error reading response:", err)
		return
	}
	fmt.Println("Received message:", string(response))

	// Keep the connection open until the user decides to exit
	fmt.Println("Press 'Enter' to exit...")
	bufio.NewReader(os.Stdin).ReadBytes('\n')
}