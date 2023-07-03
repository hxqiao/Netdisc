<template>
  <div class="AnalysisTable">
    <el-radio-group v-model="gachaType" style="margin: 20px 0" >
      <el-radio-button v-for="gacha of gachaTypeList" :label="gacha" @change="changeCardType">
        {{ drawcardTypeList[gacha] }}
      </el-radio-button>
    </el-radio-group>
    <el-table :data="tableData" style="width: 100%;height: 450px;">
      <el-table-column prop="name" label="名称" min-width="120">
        <template #="scoped">
          <span v-if="scoped.row.rank_type==='5'" class="star5">{{ scoped.row.name }}</span>
          <span v-if="scoped.row.rank_type==='4'" class="star4">{{ scoped.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="item_type" label="类型" min-width="80">
        <template #="scoped">
          <span v-if="scoped.row.rank_type==='5'" class="star5">{{ scoped.row.item_type }}</span>
          <span v-if="scoped.row.rank_type==='4'" class="star4">{{ scoped.row.item_type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="rank_type" label="星级" min-width="80">
        <template #="scoped">
          <span v-if="scoped.row.rank_type==='5'" class="star5">{{ scoped.row.rank_type }}</span>
          <span v-if="scoped.row.rank_type==='4'" class="star4">{{ scoped.row.rank_type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" min-width="180">
        <template #="scoped">
          <span style="color: #999;">{{ scoped.row.time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="sumtotal"
        class="mt-4"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getDrawcardlistApi } from '@/api/drawcard';
 
const tableData = ref([])

const sumtotal = ref<number>(0)

const currentPage = ref<number>(1)

// 抽卡类型
const drawcardTypeList = {
  '2': '新手卡池', // 新手卡池
  '1': '常驻卡池', // 常驻卡池
  '11': 'UP卡池', // UP 卡池
  '12': '光锥卡池' // 光锥卡池
}

const gachaTypeList = ['1', '2', '11', '12']

const gachaType = ref<API.GachaType>('1')

// 获取抽卡列表
const getDrawcardlist = async () => {
  const { list, total } = await getDrawcardlistApi({
    size: 10, 
    page: currentPage.value, 
    gacha_type: gachaType.value
  })
  tableData.value = list
  sumtotal.value = total
}

// 切换卡池
const changeCardType = (val: string) => {
  currentPage.value =  1
  getDrawcardlist()
}

// 换页
const handleCurrentChange = (val: number) => {
  currentPage.value =  val
  getDrawcardlist()
}

onMounted(() => {
  getDrawcardlist()
})
</script>

<style lang="scss" scoped>
.AnalysisTable {
  .pagination {
    width: 100%;
    margin: 10px;
    height: 30px;
    display: flex;
    justify-content: center;
  }
  .star4 {
    color: #c0a7ff;
    font-weight: bold;
  }
  .star5 {
    color: #ffcc33;
    font-weight: bold;
  }
}
</style>