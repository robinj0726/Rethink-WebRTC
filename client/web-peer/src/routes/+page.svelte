<script>
    import { onMount, onDestroy } from 'svelte';
    import { websocketStore } from '$lib/websocketStore';
    
    onMount(() => {
        websocketStore.connect('ws://localhost:3000/ws',
            { onOpen, onMessage, onClose, onError }    
        )
    });

    onDestroy(() => {
        websocketStore.close();
    });

    function onOpen() {
        console.log('Connected to server');
    }
    
    function onClose() {
        console.log('Disconnected from server');
    }

    function onError(event) {
        console.error('Error:', event);
    }

    function onMessage(event) {
        console.log('Message received:', event.data);
    }

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>