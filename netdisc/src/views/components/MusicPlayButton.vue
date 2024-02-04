<template>
    <el-icon 
        v-if="isPlaying" 
        style="cursor: pointer;font-size: 25px;line-height: 56px;height: 56px;text-align: center;width: 100%;"
        @click="playMusic()"
    ><VideoPlay /></el-icon>
    <el-progress
        v-else
        type="circle"
        striped
        striped-flow
        :format="() => playingTime"
        :percentage="playingPercentage"
        :width="50"
        :stroke-width="10"
    />
</template>

<script setup lang="ts">
defineProps({
    isPlaying: {
        default: false,
        type: Boolean
    },
    playingTime: {
        default: '',
        type: String
    },
    playingPercentage: {
        default: 0,
        type: Number
    }
})

const emit = defineEmits(['click'])

function playMusic() {
    emit('click')
}
</script>

<style scoped>

</style>