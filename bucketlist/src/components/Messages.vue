<template>
    <div :class="['flex', isSender ? 'justify-end' : 'justify-start']">
        <div class="flex flex-col">
            <div :class="['max-w-xs p-3 py-2 rounded-lg shadow-md relative', isSender ? 'bg-blue-100' : 'bg-gray-100']">
                <p class="text-gray-800 mb-1 select-none">{{ message.content }}</p>
            </div>
            <div class="text-xs text-gray-500 text-right select-none">
                {{ formatTimestamp(message.timestamp) }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import cache from '@/cache/cache'

const props = defineProps({
    message: {
        type: Object,
        required: true,
    },
    chatid: {
        type: String,
        required: true,
    }
});

const currentUser = cache.has('currentUser') ? JSON.parse(cache.get('currentUser'))._id : null;
const isSender = computed(() => props.message.sender === currentUser);

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const deleteMessage = async () => {
    await fetch(`http://localhost:3030/chat/${props.chatid}/message/${props.message._id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    })

    hideContextMenu();
};

</script>

<style scoped>
.flex {
    margin-bottom: 0.5rem;
}

.rounded-lg {
    border-radius: 1rem;
}

.shadow-md {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bg-white {
    background-color: #ffffff;
}

.bg-green-100 {
    background-color: #dcf8c6;
}

.context-menu {
    position: absolute;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    padding: 8px;
    display: none;
}

.context-menu-item {
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.context-menu-item:hover {
    background-color: #f1f1f1;
}
</style>
