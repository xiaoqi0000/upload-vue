<template>

<div v-loading="isData">

  <div class="mt-4">
    <el-input
      v-model="input3"
      style="max-width: 600px"
      placeholder="请输入"
      class="input-with-select"
    >
      <template #prepend>
        <el-select v-model="select" placeholder="全部" style="width: 115px">
          <el-option label="全部" value="99" />
          <el-option label="周日" value="0" />
          <el-option label="周一" value="1" />
          <el-option label="周二" value="2" />
          <el-option label="周三" value="3" />
          <el-option label="周四" value="4" />
          <el-option label="周五" value="5" />
          <el-option label="周六" value="6" />
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>

  <div class="trunk" v-for="date,index in data.allDate" :key="index">
    <el-divider content-position="left" border-style="dashed">{{ date.date }}</el-divider>
    <el-row :gutter="20">
      <el-col :span="6" v-for="name,index in date.allFileName" :key="index">
        <div class="item dashed">
          <img src="../assets/icon/apk.png">
          <el-text class="mx-1" truncated tag="b">{{name.title}}</el-text>
          <transition name="el-fade-in-linear">
            <div class="button"><el-button round type="info">下载</el-button></div>
          </transition>
          
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios';
const input3 = ref('')
const select = ref('99')
interface IData {
  name: string
  allDate: Array<{
    date: string
    allFileName: Array<{
      title: string
    }>
  }>
}
let url = 'http://127.0.0.1:3000/data';




let isData = ref(true);
axios.get(url).then(res => {
  Object.assign(data,res.data)
  isData.value = false;
}) 


let data = reactive<IData>({
  name: "无",
  allDate: []}
)


</script>

<style>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.mt-4 {
  display: flex;
  justify-content: center;
}
.trunk {
  margin-top: 30px;
}
/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: 'iconfont';  /* Project id 4786717 */
  src: url('//at.alicdn.com/t/c/font_4786717_mxq07jfq3le.woff2?t=1734522419043') format('woff2'),
       url('//at.alicdn.com/t/c/font_4786717_mxq07jfq3le.woff?t=1734522419043') format('woff'),
       url('//at.alicdn.com/t/c/font_4786717_mxq07jfq3le.ttf?t=1734522419043') format('truetype');
}
.item {
   margin-top: 20px;
  position: relative;
}
.item img {
  margin-top: 5px;
  width: 40px;
}
.mx-1 {
  transform: translateX(12px) translateY(-16px);
}
.item .button {
  display: none;
  position: absolute;
  left: 50px;
  bottom: -10px;
  transform: scale(0.8);
}
.item:hover .button {
  display: block;
}
</style>
