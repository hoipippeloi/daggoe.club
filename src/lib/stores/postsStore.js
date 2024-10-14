import { writable } from 'svelte/store';
import PocketBase from 'pocketbase';

// Initialize PocketBase
const pb = new PocketBase('https://photoboard.pockethost.io');

// Create a writable store
function createPostsStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        
        // Fetch all posts
        fetchPosts: async () => {
            try {
                const records = await pb.collection('posts').getFullList({
                    sort: '-created',
                });
                set(records);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },

        // Create a new post with file upload
        createPost: async (data) => {
            try {
                const record = await pb.collection('posts').create(data);
                update(posts => [...posts, record]);
                return record;
            } catch (error) {
                console.error('Error creating post:', error);
                throw error;
            }
        },

        // Update an existing post
        updatePost: async (id, data) => {
            try {
                const record = await pb.collection('posts').update(id, data);
                update(posts => posts.map(post => post.id === id ? record : post));
                return record;
            } catch (error) {
                console.error('Error updating post:', error);
                throw error;
            }
        },

        // Delete a post
        deletePost: async (id) => {
            try {
                await pb.collection('posts').delete(id);
                update(posts => posts.filter(post => post.id !== id));
            } catch (error) {
                console.error('Error deleting post:', error);
                throw error;
            }
        },

        // Get a single post
        getPost: async (id) => {
            try {
                const record = await pb.collection('posts').getOne(id);
                return record;
            } catch (error) {
                console.error('Error fetching post:', error);
                throw error;
            }
        },

        // Subscribe to real-time updates
        subscribeToChanges: () => {
            pb.collection('posts').subscribe('*', function (e) {
                update(posts => {
                    if (e.action === 'create') {
                        return [...posts, e.record];
                    } else if (e.action === 'update') {
                        return posts.map(post => post.id === e.record.id ? e.record : post);
                    } else if (e.action === 'delete') {
                        return posts.filter(post => post.id !== e.record.id);
                    }
                    return posts;
                });
            });
        },

        // Unsubscribe from real-time updates
        unsubscribeFromChanges: () => {
            pb.collection('posts').unsubscribe();
        }
    };
}

export const postsStore = createPostsStore();