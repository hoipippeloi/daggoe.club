<script>
  import { setContext } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import PocketBase from 'pocketbase';
  import '../app.css';  // Import the Tailwind CSS

  const pb = new PocketBase('https://photoboard.pockethost.io/');
  setContext('pb', pb);

  function handleLogout() {
    pb.authStore.clear();
    goto('/login'); // Adjust this to your login page route
  }

  $: isOnDashboard = $page.url.pathname === '/dashboard';
</script>

{#if $page.data.user}
  <div class="relative">
    <nav class="p-4 bg-gray-100">
      <!-- Add your navigation items here -->
    </nav>
    <button 
      on:click={handleLogout}
      class="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full text-sm flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    </button>
    
    <!-- Add Post Button -->
    {#if !isOnDashboard}
      <a 
        href="/dashboard"
        class="absolute top-4 right-20 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-full text-sm flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </a>
    {/if}
  </div>
{/if}

<slot />