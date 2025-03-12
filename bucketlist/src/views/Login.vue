<template>
    <!-- Full-page container -->
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
        <!-- Card container -->
        <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <!-- Title -->
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
                Sign in to your account
            </h2>

            <!-- Social Login Buttons -->
            <div class="flex flex-col space-y-4">
                <!-- Google Login Button -->
                <button type="button"
                    class="flex items-center justify-center w-full bg-gray-200 border border-gray-300 text-gray-700 font-medium py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Sign in with Google">
                    <!-- Google logo (SVG) -->
                    <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span class="text-sm sm:text-base">Sign in with Google</span>
                </button>

                <!-- Apple Login Button -->
                <button type="button"
                    class="flex items-center justify-center w-full bg-black text-white font-medium py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    aria-label="Sign in with Apple">
                    <!-- Apple logo (SVG) -->
                    <svg class="w-5 h-5 mr-2" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
                        <path
                            d="M349.13 136.86c-40.32 0-57.36 19.24-85.44 19.24-28.79 0-50.75-19.86-85.9-19.86-34.2 0-70.67 20.88-93.83 56.45-32.52 50.16-27 144.63 25.67 225.11 18.84 28.81 44 61.12 77 61.47h0.6c28.68 0 37.2-18.78 76.67-19h0.6c38.88 0 46.68 18.89 75.24 18.89h0.6c33-0.35 59.51-36.15 78.35-64.85 13.56-20.64 18.6-31 29-54.35-76.19-28.92-88.43-136.93-13.08-178.34-23-28.8-55.32-45.48-85.79-45.48z" />
                        <path
                            d="M340.25 32c-24 1.63-52 16.91-68.4 36.86-14.88 18.08-27.12 44.9-22.32 70.91h1.92c25.56 0 51.72-15.39 67-35.11 15.4-19.37 26.56-45.97 22.48-73.66z" />
                    </svg>
                    <span class="text-sm sm:text-base">Sign in with Apple</span>
                </button>
            </div>

            <!-- Divider with "OR" text -->
            <div class="flex items-center my-6">
                <hr class="flex-grow border-t border-gray-300" />
                <span class="mx-4 text-gray-500 text-sm">OR</span>
                <hr class="flex-grow border-t border-gray-300" />
            </div>

            <!-- Email/Username and Password Login Form -->
            <form @submit.prevent="submitLogin">
                <!-- Email/Username Field -->
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-medium mb-1">
                        Email or Username
                    </label>
                    <input id="email" autocomplete="username" v-model="email" type="text"
                        placeholder="Enter your email or username"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <!-- Password Field -->
                <div class="mb-6">
                    <label for="password" class="block text-gray-700 text-sm font-medium mb-1">
                        Password
                    </label>
                    <input id="password" autocomplete="current-password" v-model="password" type="password"
                        placeholder="Enter your password"
                        class="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <!-- Sign In Button for email/password -->
                <button type="submit"
                    class="w-full bg-blue-600 text-center text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Sign In
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
// Using Vue 3 <script setup> syntax
import { ref } from 'vue';
import router from '@/router';

// Reactive state for form inputs
const email = ref('');
const password = ref('');

// Dummy submit handler (replace with real logic or emits as needed)
const submitLogin = async () => {
    // Here you would normally handle form submission, e.g., call an API or use a store
    const res = await fetch('http://localhost:3030/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email.value, password: password.value }),
        credentials: 'include'
    });

    if (res.status === 200) {
        return router.push('/chats')
    }
};
</script>

<!-- Optional: Scoped styles or additional CSS (Tailwind is primarily used here) -->
<style scoped>
/* No additional custom styles needed since Tailwind classes cover the design */
</style>