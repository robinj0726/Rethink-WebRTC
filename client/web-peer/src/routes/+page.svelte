<script>
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';
    
    const myUuid = uuidv4();

    let socket;
    onMount(() => {
        initializeWebSocket();
    });

    const sendWsMessage = (type, body) => {
        const json = {
            type,
            body,
        }; 
        console.log('[client]Sent message: ', json);
        socket.send(JSON.stringify(json));
    };

    function initializeWebSocket() {
        socket = new WebSocket("ws://localhost:3000/ws");

        socket.addEventListener("open", () => {
            console.log("WebSocket connection opened.");
            // Example: Send a message when the connection is open
            sendWsMessage("join", myUuid);
        });

        socket.addEventListener("message", (event) => {
            console.log("[client]Message from server ", event.data);
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