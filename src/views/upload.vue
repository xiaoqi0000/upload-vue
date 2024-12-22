<template>
    <el-upload class="upload-demo" 
    v-model:file-list="fileList" list-type="picture"
    drag :action="url" multiple>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
           拖拽文件或<em>点击上传</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                <!-- 这里写文件描述 -->
            </div>
        </template>
    </el-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ref ,watch} from 'vue'
const fileList = ref<UploadUserFile[]>([])
let url = "/uploadFile"

let uid = 0
watch(fileList,()=>{
  fileList.value.forEach((item) => {
      // console.log(item.name,item.url,'本次文件');
      //获取文件后缀
      let suffix = item.name.split('.').pop() || ''
      suffix = suffix.toLowerCase()
      //不是图片，更改url
      if(!(['jpg','png'].includes(suffix.toLowerCase()))){
        let newUrl = `/icon/${suffix}.png`
        let img = new Image()
        img.src = newUrl
        img.onerror = function () {
          // console.log(newUrl,'图片加载失败');
          newUrl = `/icon/1.png`;
          item.url = newUrl
        };
        item.url = newUrl
      }
      
    // console.log('加载图片',item.url);

  })
})


</script>



<style scoped>
.el-upload__tip {
    margin-bottom: 30px;
}
</style>