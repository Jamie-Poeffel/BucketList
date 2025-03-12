<template>
    <div class="w-full h-dvh">
        <div class="fixed">
            <button @click="$router.push('/chats')" class="flex flex-row justify-center items-center gap-2">
                <div>
                    <ChevronLeftIcon class="w-4 h-4 text-blue-500" />
                </div>
                <p class="text-center text-blue-500 font-semibold">Chats</p>
            </button>
        </div>
        <div>
            <div id="container" class="flex flex-col pr-8 pb-[6rem] h-[812px] overflow-y-auto">
                <div v-for="message in messages" :key="message._id">
                    <Messages :message="message" :key="message._id" :chatid="$route.params.id" />
                </div>
            </div>
            <div class="bg-gray-600/60 blur-md z-0 -bottom-4 w-full h-[80px] fixed"></div>
            <div class="flex gap-3 items-center justify-center w-full flex-row p-2 py-4 bottom-0 z-10 fixed">
                <input type="text" v-model="postMessage" @keydown="(e) => { if (e.key === 'Enter') sendMessage() }"
                    class="w-4/5 h-4 appearance-none outline-none rounded-3xl border-none py-5 px-3 font-semibold">
                <button @click="sendMessage()"
                    class="flex justify-center items-center p-3 rounded-full bg-blue-500 hover:bg-blue-600 active:scale-95">
                    <SendHorizonal class="w-4 h-4 z-0" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ChevronLeftIcon, SendHorizonal } from 'lucide-vue-next';
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue';
import { useRoute } from 'vue-router'
import Messages from '@/components/Messages.vue'

const route = useRoute();
let container = null;
const messages = ref([]);
const postMessage = ref('');
let eventSource = null;

onMounted(async () => {
    container = document.getElementById('container');

    const res = await fetch(`http://localhost:3030/chat/${route.params.id}/history`, { credentials: 'include' });
    const data = await res.json();
    messages.value = data.messages;

    // Scroll zum unteren Ende des Containers nach dem Laden der Nachrichten
    scrollToBottom();

    // EventSource einrichten, um neue Nachrichten zu empfangen
    eventSource = new EventSource(`http://localhost:3030/chat/${route.params.id}`, { withCredentials: true });

    eventSource.onmessage = (event) => {
        const json = JSON.parse(event.data);
        if (json.length === 1) {
            const newMessage = json[0];
            messages.value.push(newMessage);
        }

        nextTick(() => {
            scrollToBottom();
        });
    };

    eventSource.onopen = () => {
        console.log('Connection opened.');
    };

    eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
    };
});

onBeforeUnmount(() => {
    if (eventSource) {
        eventSource.close();
        console.log('EventSource connection closed.');
    }
});

const sendMessage = async () => {
    if (postMessage.value !== '') {
        await fetch(`http://localhost:3030/chat/${route.params.id}/message`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: postMessage.value }),
            credentials: 'include'
        });
        postMessage.value = '';
    }
};

const scrollToBottom = () => {
    if (container) {
        container.scrollTop = container.scrollHeight; // Scrollen zum unteren Ende des Containers
    }
};
</script>
