<script>
    import { onMount } from 'svelte';
    import { postsStore } from '../../lib/stores/postsStore';
    import { browser } from '$app/environment';

    /** @type {HTMLInputElement} */
    let fileInput;
    let title = '';
    let showForm = false;
    let isLoading = false;

    function handleFileSelect(event) {
        if (event.target.files && event.target.files.length > 0) {
            console.log('Selected file:', event.target.files[0]);
        }
    }

    async function handleSubmit() {
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            isLoading = true;
            const formData = new FormData();
            formData.append('title', title);
            formData.append('file', fileInput.files[0]);
            
            try {
                const newPost = await postsStore.createPost(formData);
                console.log('Post created:', newPost);
                title = '';
                fileInput.value = '';
                closeForm();
            } catch (error) {
                console.error('Error creating post:', error);
            } finally {
                isLoading = false;
            }
        } else {
            console.error('No file selected');
        }
    }

    function openForm() {
        showForm = true;
    }

    function closeForm() {
        showForm = false;
        title = '';
        if (fileInput) {
            fileInput.value = '';
        }
    }

    onMount(() => {
        if (browser) {
            postsStore.fetchPosts();
            postsStore.subscribeToChanges();

            return () => {
                postsStore.unsubscribeFromChanges();
            };
        }
    });
</script>

<style>
    .loader {
        border-top-color: #3498db;
        -webkit-animation: spinner 1.5s linear infinite;
        animation: spinner 1.5s linear infinite;
    }

    @-webkit-keyframes spinner {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>

<div class="container mx-auto px-4">
    <h1 class="text-3xl font-bold my-8">PhotoBoard</h1>
  
    <!-- Add Photo Button (Centered and slightly smaller) -->
    <button 
        on:click={openForm}
        class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-6 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
    </button>

    <!-- Link to Feed Page -->
    <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <a href="/feed" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Go to Feed
        </a>
    </div>

    <!-- Upload Form Modal -->
    {#if showForm}
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-8 rounded-lg shadow-xl relative">
                <form on:submit|preventDefault={handleSubmit} class="space-y-4">
                    <div>
                        <label for="title" class="block mb-2">Title</label>
                        <input
                            id="title"
                            type="text"
                            bind:value={title}
                            placeholder="Enter post title"
                            class="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label for="file" class="block mb-2">Photo</label>
                        <input
                            id="file"
                            bind:this={fileInput}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            on:change={handleFileSelect}
                            class="w-full border p-2 rounded"
                        />
                    </div>
                    <div class="flex justify-end space-x-2">
                        <button
                            type="button"
                            on:click={closeForm}
                            class="bg-gray-300 text-black p-2 rounded"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="bg-blue-500 text-white p-2 rounded flex items-center justify-center"
                            disabled={isLoading}
                        >
                            {#if isLoading}
                                <span uk-spinner="ratio: 0.8" class="mr-2"></span>
                                Uploading...
                            {:else}
                                Post
                            {/if}
                        </button>
                    </div>
                </form>
                {#if isLoading}
                    <div class="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center">
                        <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</div>
