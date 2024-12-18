<script setup lang="ts">
import Header from './components/header.vue'

</script>

<template>
  <Header />
  <div class="content list">
    <transition name="el-fade-in-linear">
      <router-view></router-view>
    </transition>

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
