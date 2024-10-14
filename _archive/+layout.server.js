import { redirect } from '@sveltejs/kit';

export async function load({ url, locals }) {
  if (!locals.pb) {
    console.error('PocketBase instance not found in locals');
    return {
      user: null
    };
  }

  // Check if the user is authenticated
  if (!locals.pb.authStore.isValid) {
    // If not on the login page, redirect to login
    if (url.pathname !== '/login') {
      throw redirect(303, '/login');
    }
  } else {
    // If authenticated and on the login page, redirect to dashboard
    if (url.pathname === '/login') {
      throw redirect(303, '/dashboard');
    }
  }

  return {
    user: locals.pb.authStore.model
  };
}