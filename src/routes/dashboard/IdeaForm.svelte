<script lang="ts">
    import PocketBase from 'pocketbase';
    import { page } from '$app/stores';

    const pb = new PocketBase('https://ideate.pockethost.io');
  
    let title = '';
    let notes = '';
    let tags = '';
    let pinned = false;
    let error = '';
    let success = '';
  
    async function handleSubmit() {
        try {
            const data = {
                title,
                notes,
                tags: JSON.stringify(tags.split(',').map(tag => tag.trim())),
                user: $page.data.user.id,
                pinned
            };
            await pb.collection('ideas').create(data);
            success = 'Idea created successfully!';
            error = '';
            // Reset form
            title = notes = tags = '';
            pinned = false;
        } catch (err) {
            error = err.message;
            success = '';
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit} class="space-y-6 max-w-2xl mx-auto">
    <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-6">Create New Idea</h2>
        
        <div class="space-y-4">
            <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1 text-left">Title</label>
                <input type="text" id="title" bind:value={title} required
                       class="block w-full px-3 py-2 border border-[#DDD] text-gray-900 rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </div>

            <div>
                <label for="notes" class="block text-sm font-medium text-gray-700 mb-1 text-left">Notes</label>
                <textarea id="notes" bind:value={notes} rows="3"
                          class="block w-full px-3 py-2 border border-[#DDD] text-gray-900 rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>

            <div>
                <label for="tags" class="block text-sm font-medium text-gray-700 mb-1 text-left">Tags</label>
                <input type="text" id="tags" bind:value={tags}
                       class="block w-full px-3 py-2 border border-[#DDD] text-gray-900 rounded-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       placeholder="Enter comma-separated tags">
            </div>

            <div class="flex items-center">
                <input id="pinned" bind:checked={pinned} type="checkbox"
                       class="h-4 w-4 border-[#DDD] text-indigo-600 focus:ring-indigo-500">
                <label for="pinned" class="ml-2 block text-sm text-gray-900 text-left">Pin this idea</label>
            </div>
        </div>
    </div>

    <div class="flex justify-end">
        <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Idea
        </button>
    </div>

    {#if error}
        <p class="mt-2 text-sm text-red-600">{error}</p>
    {/if}

    {#if success}
        <p class="mt-2 text-sm text-green-600">{success}</p>
    {/if}
</form>