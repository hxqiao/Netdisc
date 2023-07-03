<template>
  <div class="drawcard_analysis">
    <Analysis v-if="false" />
    <div v-else>
      <AnalysisTable />
      <AnalysisCharts />
    </div>
  </div>
</template>

<script setup lang="ts">
import Analysis from "./Analysis.vue";
import AnalysisCharts from "./AnalysisCharts.vue";
import AnalysisTable from "./AnalysisTable.vue";

</script>

<style lang="scss" scoped>
.drawcard_analysis {
  display: block;
  width: 100%;
}
</style>