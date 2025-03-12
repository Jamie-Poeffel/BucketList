<template>
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <!-- Suchleiste -->
        <div class="mb-4">
            <input type="text" v-model="searchTerm" placeholder="Chat suchen..."
                class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition" />
        </div>
        <!-- Chat-Liste -->
        <div class="space-y-3 flex justify-center items-center" v-if="loading">
            <Loader2 class="w-4 h-4 animate-spin" />
        </div>
        <ul class="space-y-3" v-else>
            <li v-for="chat in filteredChats" :key="chat.id" @click="$router.push(`/chats/${chat.id}`)"
                class="flex items-center p-3 border border-gray-200 rounded hover:bg-gray-100 hover:cursor-pointer active:scale-95 transition">
                <!-- Profilbild -->
                <img :src="chat.avatar" alt="Avatar" class="w-12 h-12 rounded-full object-cover mr-4" />
                <!-- Chat-Info -->
                <div>
                    <p class="font-medium select-none">{{ chat.name }}</p>
                    <p class="text-sm text-gray-600 select-none">{{ chat.lastMessage }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Loader2 } from 'lucide-vue-next';

const chats = ref([]);
const loading = ref(true);



onMounted(async () => {
    const result = await fetch('http://localhost:3030/chat', { credentials: 'include' });

    const data = await result.json();
    data.chats.forEach(e => {
        chats.value.push(
            { id: e.id, name: e.name, avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50) + 1}.jpg`, lastMessage: e.lastMessage.content }
        )
    });

    loading.value = false;
})

// Suchbegriff
const searchTerm = ref('')

// Filtert die Chatliste basierend auf dem Suchbegriff
const filteredChats = computed(() => {
    if (!searchTerm.value) return chats.value
    return chats.value.filter(chat =>
        chat.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
})
</script>