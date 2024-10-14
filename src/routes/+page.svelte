<script>
  import { page } from '$app/stores';
</script>

<div class="flex items-center justify-center min-h-screen">
  {#if $page.data.user}
    <a href="/feed" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      Go to Feed
    </a>
  {:else}
    <p class="text-center">Please log in to access this page.</p>
  {/if}
</div>
