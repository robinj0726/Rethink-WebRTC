<script>
    import { onMount } from 'svelte';
    
    let socket;
    onMount(() => {
        initializeWebSocket();
    });

    function initializeWebSocket() {
        socket = new WebSocket("ws://localhost:3000/hello-ws");

        socket.addEventListener("open", () => {
            console.log("WebSocket connection opened.");
            // Example: Send a message when the connection is open
            socket.send("Hello, server!");
        });

        socket.addEventListener("message", (event) => {
            console.log("Message from server ", event.data);
        });

        socket.addEventListener("close", () => {
            console.log("WebSocket connection closed. Attempting to reconnect...");
            // Attempt to reconnect after a delay
            setTimeout(initializeWebSocket, 1000);
        });

        socket.addEventListener("error", (error) => {
            console.error("WebSocket error: ", error);
            socket.close();
        });
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>