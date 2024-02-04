<template>
    <div class="music">
        <SearchMusic @getTableDataCb="getTableDataCb" @getMusicListCb="getMusicListCb"></SearchMusic>
        <div class="table_list">
            <el-table v-if="tableType === 'musiclist'" :data="tableData" height="100%" style="width: 100%">
                <el-table-column prop="id" label="id" width="120" />
                <el-table-column prop="name" label="名称" min-width="180" />
                <el-table-column prop="name" label="操作" width="100">
                    <template #default="scoped">
                        <el-button @click="playMusicList(scoped.row)">播放</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table v-else :data="tableData" height="100%" style="width: 100%">
                <el-table-column prop="id" label="id" width="120" />
                <el-table-column prop="name" label="名称" min-width="180" />
                <el-table-column prop="ar" label="作者" min-width="180">
                    <template #default="scoped">
                        {{ scoped.row.ar.map((e) => e.name).join('，') }}
                    </template>
                </el-table-column>
                <el-table-column prop="al" label="专辑" min-width="180">
                    <template #default="scoped">
                        {{ scoped.row.al.name }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="时长" min-width="80">
                    <template #default="scoped">
                        {{ getTime(scoped.row.dt) }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="时长" width="75">
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
import SearchMusic from './SearchMusic.vue'
import { onMounted, ref } from "vue";
import { getMusicListApi, getMusicListDetailApi, getLoveListApi, getSongUrlApi } from "@/api/music.js";
const tableType = ref('musiclist');
const tableData = ref([]);
function getTableDataCb(data:any) {
    tableType.value = 'musiclist';
    tableData.value = data;
}
function getMusicListCb(data:any) {
    tableType.value = 'music';
    tableData.value = data;
}
const getMusicList = async (params:any) => {
    const { privileges } = await getMusicListApi({
        id: params.id,
        realIP: '211.161.244.70'
    });

    const seachList = privileges.map((e: { id: any; }) => e.id);
    const { songs } = await getMusicListDetailApi({
        ids: seachList.join(','),
    })
    tableData.value = songs;
    tableType.value = 'music';
}
async function searchLove() {
    const { playlist } = await getLoveListApi({
        uid: 325892764,
    })
    tableData.value = playlist;
}
function playMusicList(params:any) {
    console.log(params);
    
    getMusicList({
        id: params.id
    })
}

const currentPlayTime = ref('');
const currentPlayPercentage = ref(0)
function onTimeUpdate(e: any) {
    currentPlayTime.value = e.playingTime
    currentPlayPercentage.value = e.playingPercentage
}

const getTime = (dt: number) => {
    const s = Number((dt / 1000).toFixed(0))
    return `${(s / 60).toFixed(0)}:${s % 60 < 10 ? '0' : ''}${s % 60}`
};
const playIndex = ref(0);
const playMusic = async ({ $index }) => {
    playIndex.value = $index + 1
}
onMounted(() => {
    searchLove();
});
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
    #audio_context {
        z-index: 11111111111;
        width: 300px;
        height: 50px;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
    }
}
</style>