<script lang="ts">
    import { onMount } from 'svelte';
    import { postsStore } from '../../lib/stores/postsStore';

    let fileInput: HTMLInputElement;
    let title: string = '';

    function handleFileSelect(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            console.log('Selected file:', target.files[0]);
        }
    }

    async function handleSubmit() {
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', fileInput.files[0]);
            
            try {
                const newPost = await postsStore.createPost(formData);
                console.log('Post created:', newPost);
                title = '';
                fileInput.value = '';
            } catch (error) {
                console.error('Error creating post:', error);
            }
        } else {
            console.error('No file selected');
        }
    }

    function openFileInput() {
        if (fileInput) {
            fileInput.click();
        }
    }

    onMount(() => {
        postsStore.fetchPosts();
        postsStore.subscribeToChanges();

        return () => {
            postsStore.unsubscribeFromChanges();
        };
    });
</script>

<main>
  <!-- Your HTML structure here -->
</main>

<style>
  /* Your styles here */
</style>

<div class="container mx-auto px-4">
  <h1 class="text-3xl font-bold my-8">PhotoBoard</h1>
  
  <!-- Add Photo Button (Centered and 4x larger) -->
  <button 
    on:click={openFileInput}
    class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-8 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </button>

  <!-- Hidden file input -->
  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    capture="environment"
    on:change={handleFileSelect}
    class="hidden"
  />

  <!-- Form for title input and submission -->
  <form on:submit|preventDefault={handleSubmit} class="mt-4">
    <input
      type="text"
      bind:value={title}
      placeholder="Enter post title"
      class="border p-2 rounded"
    />
    <button
      type="submit"
      class="bg-blue-500 text-white p-2 rounded ml-2"
    >
      Upload Post
    </button>
  </form>
</div>