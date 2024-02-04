<template>
    <div class="music">
        <SearchMusic @getCloudInfoCb="getCloudInfoCb" />
        <div class="table_list">
            <el-table v-if="tableType === 'cloud'" :data="tableData" height="100%" style="width: 100%">
                <el-table-column prop="id" label="id" width="120" />
                <el-table-column prop="name" label="名称" min-width="180" />
                <el-table-column prop="ar" label="作者" min-width="180">
                    <template #default="{ row }">
                        {{ row.ar && row.ar.map((e) => e.name || '').join('，') }}
                    </template>
                </el-table-column>
                <el-table-column prop="al" label="专辑" min-width="180">
                    <template #default="scoped">
                        {{ scoped.row.al?.name }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="时长" min-width="80">
                    <template #default="scoped">
                        {{ getTime(scoped.row.dt) }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="播放" width="74">
                    <template #default="scoped">
                        <MusicPlayButton
                            :is-playing="playIndex !== scoped.$index + 1"
                            :playingTime="currentPlayTime"
                            :playingPercentage="currentPlayPercentage"
                            @click="playMusic(scoped)"
                        />
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <MyAudio ref="MyAudioRef" v-model="playIndex" :playList="tableData" @timeupdate="onTimeUpdate" />
    </div>
</template>

<script lang="ts" setup>
import MyAudio from '../components/MyAudio.vue'
import MusicPlayButton from '../components/MusicPlayButton.vue'
import SearchMusic from '../music/SearchMusic.vue'
import { onMounted, ref, watch } from "vue";
import { getMyCloudApi } from "@/api/music.js";

const tableType = ref('cloud');
const tableData = ref([]);
function getCloudInfoCb() {
    getMyCloudApi({}).then(({ data }) => {
        tableData.value = data.map(e => e.simpleSong);
        console.log(tableData.value);
    })
}
const getTime = (dt: number) => {
    const s = Number((dt / 1000).toFixed(0))
    return `${(s / 60).toFixed(0)}:${s % 60 < 10 ? '0' : ''}${s % 60}`
};
const playIndex = ref(0);
const MyAudioRef = ref(null)
const playMusic = ({ $index }) => {
    playIndex.value = $index + 1
}

const currentPlayTime = ref('');
const currentPlayPercentage = ref(0)
function onTimeUpdate(e: any) {
    currentPlayTime.value = e.playingTime
    currentPlayPercentage.value = e.playingPercentage
}

onMounted(() => {
    getCloudInfoCb()
})
</script>

<style lang="scss" scoped>
.music {
    position: relative;
    width: 100%;
    height: 100%;

    .table_list {
        border-top: 1px solid #eee;
        height: calc(100vh - 70px);
        overflow: hidden;
    }
}
</style>