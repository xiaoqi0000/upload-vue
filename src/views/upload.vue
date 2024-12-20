<template>
    <el-upload class="upload-demo" 
    v-model:file-list="fileList" list-type="picture"
    drag action="http://localhost:2222/upload" multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
           拖拽文件或<em>点击上传</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ref,watch } from 'vue'
const fileList = ref<UploadUserFile[]>([
  {
    name: 'element-plus-logo.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
  {
    name: 'element-plus-logo2.svg',
    url: 'https://element-plus.org/images/element-plus-logo.svg',
  },
])

</script>
<style scoped>
.el-upload__tip {
    margin-bottom: 30px;
}
</style>