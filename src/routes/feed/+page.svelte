<script lang="ts">
    import { onMount } from 'svelte';
    import { postsStore } from '../../lib/stores/postsStore';

    let posts = [];
    let selectedImage = null;

    // Updated function to construct the full image URL
    function getImageUrl(postId: string, filename: string) {
        const baseUrl = 'https://photoboard.pockethost.io/api/files/';
        return `${baseUrl}/lfe7h9sizskhc2a/${postId}/${filename}`;
    }

    function openFullscreen(post) {
        selectedImage = post;
    }

    function closeFullscreen() {
        selectedImage = null;
    }

    onMount(() => {
        const unsubscribe = postsStore.subscribe(value => {
            posts = value;
            console.log('Posts updated:', posts);
        });

        postsStore.fetchPosts();

        return unsubscribe;
    });
</script>

<style>
    .masonry-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 0.25rem; /* Reduced gap between images */
    }

    @media (max-width: 1200px) {
        .masonry-grid {
            grid-template-columns: repeat(6, 1fr);
        }
    }

    @media (max-width: 992px) {
        .masonry-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media (max-width: 768px) {
        .masonry-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 576px) {
        .masonry-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 480px) {
        .masonry-grid {
            grid-template-columns: 1fr;
        }
    }

    .masonry-item {
        aspect-ratio: 16 / 10;
        overflow: hidden;
    }

    .masonry-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s ease;
    }

    .masonry-item img:hover {
        opacity: 1;
    }

    .fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .fullscreen img {
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        opacity: 1;
    }

    .close-button {
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }
</style>

<div class="mx-auto px-4" style="margin-top: 40px;">

    {#if posts.length === 0}
        <p>Loading posts...</p>
    {:else}
        <div class="masonry-grid">
            {#each posts as post (post.id)}
                <div class="masonry-item">
                    <img 
                        src={getImageUrl(post.id, post.file)} 
                        alt={post.title} 
                        on:click={() => openFullscreen(post)}
                    />
                </div>
            {/each}
        </div>
    {/if}
</div>

{#if selectedImage}
    <div class="fullscreen" on:click={closeFullscreen}>
        <img src={getImageUrl(selectedImage.id, selectedImage.file)} alt={selectedImage.title} />
        <div class="close-button" on:click={closeFullscreen}>×</div>
    </div>
{/if}