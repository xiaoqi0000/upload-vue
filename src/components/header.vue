<template>
    <div class="header">
        <el-segmented v-model="value" :options="options" size="large" @change="routeChange"/>
    </div>
    <el-divider>
    </el-divider>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const value = ref('上传')

const options = ['上传', '下载']

function routeChange(val: string) {
    if (val === '上传') {
        router.push('/upload')
    } else {
        router.push('/download')
    }
}

</script>

<style scoped>
.header {
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-segmented {
    --el-border-radius-base: 16px;
    width: 400px;
}
</style>