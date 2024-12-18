<script setup lang="ts">
import Header from './components/header.vue'

</script>

<template>
  <Header />
  <div class="content list">
    <router-view v-slot="{ Component }">
  <transition name="el-fade-in-linear" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
  </div>
</template>

<style scoped>
.content {
  margin: 0 auto;
  max-width: 900px;
}

.list {
  margin-top: 50px;
  margin-bottom: 100px;
}

</style>
