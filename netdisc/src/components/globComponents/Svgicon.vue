<template>
  <svg class="svgicon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: ''
  },
  isPercent:{
    type: Boolean,
    default: false
  },
})

const iconName = computed(()=>{
  return `#${ props.icon }`;
})

</script>

<style lang="scss" scoped>
.svgicon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>