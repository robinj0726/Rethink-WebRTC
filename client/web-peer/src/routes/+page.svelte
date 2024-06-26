<script>
    import { onMount, onDestroy } from 'svelte';
    import { Client } from '$lib/client';
    
    let client = new Client();
    client.onOpen = onOpen;
    client.onClose = onClose;
    client.onMessage = (message) => {
        console.log('Received message:', message);
    };

    onMount(() => {
        client.join('ws://localhost:3000/ws');
    });

    onDestroy(() => {
        if (client) {
            client.leave();
        }
    });

    function onOpen() {
        console.log('Connected to server');
    }
    
    function onClose() {
        console.log('Disconnected from server');
        client.leave();
        client = null;
    }

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>