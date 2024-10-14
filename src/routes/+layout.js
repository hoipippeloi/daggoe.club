import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import PocketBase from 'pocketbase';

export const prerender = true;

export function load({ data, url }) {
  if (browser) {
    const pb = new PocketBase('https://photoboard.pockethost.io/');
    const isAuthenticated = pb.authStore.isValid;

    // Redirect unauthenticated users to login page
    if (!isAuthenticated && url.pathname !== '/login') {
      goto('/login');
    }

    // Redirect authenticated users away from login page
    if (isAuthenticated && url.pathname === '/login') {
      goto('/dashboard');
    }

    return {
      ...data,
      user: pb.authStore.model
    };
  }

  return data;
}