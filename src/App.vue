<template>
  <v-app>
    <top-bar />
    <v-main>
      <router-view></router-view>
    </v-main>
      
  </v-app>
</template>

<script setup>
  import TopBar from './components/TopBar.vue';
</script>