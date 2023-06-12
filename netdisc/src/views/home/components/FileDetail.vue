<template>
  <div v-show="info.name" class="pan__body-detail">
    <div class="detail-title">
      {{ info.type === 'folder' ? '文件夹详情' : '文件详情' }}
    </div>
    <div class="detail-content">
      <div class="detail-content__title">
        {{ info.name }}
      </div>
      <div class="detail-content__ctime">
        创建时间: {{ info.date }}
      </div>
      <div class="detail-content__modified">
        最后修改: {{ info.date }}
      </div>
      <div v-if="info.type !== 'folder'" class="detail-content__format">
        文件格式: {{ info.type }}
      </div>
      <div v-if="info.type !== 'folder'" class="detail-content__size">
        文件大小: {{ info.size + 'B' }}
      </div>
      <div v-if="info.type !== 'folder'" class="detail-content__dir">
        所在目录: {{ info.dir }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, nextTick, onMounted, watch } from 'vue';
import { FilesDetail } from '../props';

const props = defineProps({
  info: {
    type: Object as PropType<FilesDetail>,
    default: () => ({
      originalname: '',
      date: '',
      name: '',
      size: '',
      dir: '',
      type: '',
      url: '',
    })
  }
})

watch(
  () => props.info,
  () => {
    nextTick(() => {
      console.log(props.info);
    });
  },
);

onMounted(() => {
})
</script>

<style lang="scss" scoped>
.pan__body-detail {
  width: 300px;
  height: 100%;
  padding: 24px;
  .detail-title {
    font-size: 12px;
    font-weight: bold;
    line-height: 40px;
  }
  .detail-content {
    font-size: 12px;
    color: #878c9c;
    div {
      margin-top: 10px;
    }
    .detail-content__title {
      font-size: 14px;
      color: #454d5a;
      font-weight: 600;
      word-break: break-all;
    }
  }
}
</style>