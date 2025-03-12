<template>
  <router-view />
</template>

<script setup>
import cache from '@/cache/cache';
import { onMounted } from 'vue';

onMounted(async () => {
  const user = await fetch('http://localhost:3030/users/me', { credentials: 'include' });
  const userdata = await user.json();
  cache.set('currentUser', JSON.stringify(userdata));

  console.log(cache.has('currentUser'));
});

</script>