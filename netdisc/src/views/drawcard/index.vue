<template>
  <div class="drawcard_analysis">
    <Analysis v-if="!tableData.length" />

    <div v-else>
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

      <AnalysisCharts />
    </div>
  </div>
</template>

<script setup lang="ts">
import Analysis from "./Analysis.vue";
import AnalysisCharts from "./AnalysisCharts.vue";
import { onMounted, ref } from 'vue';
import { getDrawcardlistApi } from '@/api/drawcard';

const tableData = ref([])

const sumtotal = ref<number>(0)

const currentPage = ref<number>(1)

const getDrawcardlist = async () => {
  const { list, total } = await getDrawcardlistApi({
    size: 10, 
    page: currentPage.value, 
  })
  tableData.value = list
  sumtotal.value = total
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
.drawcard_analysis {
  display: block;
  width: 100%;
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