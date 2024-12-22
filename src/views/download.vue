<template>

<div v-loading="isData">

  <div class="mt-4">
    <el-input
      @change="fuzzySearch"
      v-model="input3"
      style="max-width: 600px"
      placeholder="请输入"
      class="input-with-select"
    >
      <template #prepend>
        <el-select v-model="select" placeholder="全部" style="width: 115px">
          <el-option label="全部" value="all" />
          <el-option label="图片" value="img" />
          <el-option label="文档" value="office" />
          <el-option label="其他" value="other" />
        </el-select>
      </template>
      <template #append>
        <el-button @click = fuzzySearch(input3) :icon="Search" />
      </template>
    </el-input>
  </div>

  <div class="trunk" v-for="date,index in data.allDate" :key="index">
    <el-divider content-position="left" border-style="dashed">{{ date.date }}</el-divider>
    <el-row :gutter="20">
      <el-col :span="6" v-for="name,index in date.allFileName" :key="index">
        <div class="item dashed">
          <img :src="imgUrl(name)">
          <el-text class="mx-1" line-clamp="1" truncated tag="b">{{name.title}}</el-text>
          <transition name="el-fade-in-linear">
            <div class="button"> <a :href="`/uploads/${name.filename}`" :download="name.title"><el-button round type="info">下载</el-button></a></div>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref,reactive,watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios';

//定义返回接口数据类型接口
interface IData {
  name: string
  allDate: Array<{
    date: string
    allFileName: Array<{
      title: string,
      filename: string
    }>
  }>
}

let url = '/downloadFile';

const input3 = ref('')


let isData = ref(true);
let originalData:IData
axios.get(url).then(res => {
  originalData = res.data.data;
  console.log(res.data.data,'获取数据');
  Object.assign(data,originalData)
  isData.value = false;
}) 


let data = reactive<IData>({
  name: "无",
  allDate: []}
)

//图片显示
function imgUrl(val: { title: string }): string {
    let ext = val.title.split('.').pop();
    let finalUrl = `/icon/${ext}.png`;
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext || '')) {
      finalUrl = `/icon/image.png`;
    }
    let img = new Image();
    img.src = finalUrl;
    img.onerror = function () {
      //遍历所有img标签
      let imgs = document.getElementsByTagName('img');
      for (let i = 0; i < imgs.length; i++) {
        if (imgs[i].src.includes(`/icon/${ext}.png`)) {
          imgs[i].src = `/icon/1.png`;
        }
      }

    };
    return finalUrl;
}

//筛选功能
const select = ref('all')

const stopWatch = watch(select,(newValue,oldValue)=>{
  // console.log('sum变化了',newValue,oldValue)
  input3.value = ''
  let newDate:IData =  JSON.parse(JSON.stringify(originalData))
  newDate.allDate.forEach((item,index)=>{
    item.allFileName = item.allFileName.filter((item)=>{
      if(newValue == 'all'){
        return true
      }else if(newValue == 'img'){
        let ext = item.title.split('.').pop();
        if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext || '')) {
          return true
        }else{
          return false
        }
      }else if(newValue == 'office'){
        let ext = item.title.split('.').pop();
        if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext || '')) {
          return true
        }else{
          return false
        }
      }else if(newValue == 'other'){
        let ext = item.title.split('.').pop();
        if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx','jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext || '')) {
          return false
        }else{
          return true
        }
      }else{
        return true
      }
    })
    if(item.allFileName.length == 0){
      newDate.allDate.splice(index,1)
    }

  })
  newDate = JSON.parse(JSON.stringify(newDate))
  Object.assign(data,newDate)
})

// 搜索功能
function fuzzySearch(val:any) {
  // console.log('模糊搜索',val);
  let newData:IData =  JSON.parse(JSON.stringify(data))
  newData.allDate.forEach((item,index)=>{
    item.allFileName = item.allFileName.filter((item)=>{
      if(item.title.includes(val)){
        return true
      }else{
        return false
      }
    })
  })
  console.log('3',newData);
  newData.allDate = newData.allDate.filter((item)=>{
    if(item.allFileName.length == 0){
      return false
    }else{
      return true
    }
  })
  
  newData = JSON.parse(JSON.stringify(newData))
  Object.assign(data,newData)
  
}


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
  height: 40px;
}
.mx-1 {
  width: 126px;
  position: absolute;
  top: 12px;
  left: 50px;
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
