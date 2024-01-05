<template>
    <div class="music">
        <el-table :data="tableData" style="width: 100%">
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
            <el-table-column prop="name" label="时长" min-width="80">
                <template #default="scoped">
                    <el-button @click="play(scoped)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div id="audio_context" v-loading="audioLoading"></div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getMusicListApi, getMusicListDetailApi, getMusicPlayListApi } from "@/api/music.js";
const tableData = ref([]);
const getMusicList = async () => {
    const { privileges } = await getMusicListApi({
        id: 454241668,
        timestamp: 1704350979167,
        // realIP: '211.161.244.70'
    });

    const seachList = privileges.map((e: { id: any; }) => e.id);
    const { songs } = await getMusicListDetailApi({
        ids: seachList.join(','),
    })
    tableData.value = songs;
}
const getTime = (dt: number) => {
    const s = Number((dt / 1000).toFixed(0))
    return `${(s / 60).toFixed(0)}:${s % 60 < 10 ? '0' : ''}${s % 60}`
};
const audioRef = ref(null);
const audioLoading = ref(false);
const mp3 = ref('');
const audio = ref(null);
// 创建一个新的 AudioContext 对象
const audioContext = ref(null);
const playIndex = ref(0);
const play = async ({ row, $index }) => {
    playIndex.value = $index;
    audioLoading.value = true;
    const { audios: {'' : resList} } = await getMusicPlayListApi({
        q: `${row.name}`
    })
    console.log(resList[0]?.url);
    mp3.value = resList[0]?.url;

    // 创建一个新的 Audio 对象
    audio.value.src = mp3.value;
    
    if (document.getElementsByTagName('audio')[0]) {
        audio.value.play();
        return;
    }
    audio.value.crossOrigin = "anonymous";
    audio.value.controls = true;
    if (!audioContext.value) {
        audioContext.value = new AudioContext();
    }
        
    // 创建一个新的 MediaElementAudioSourceNode 对象
    const source = audioContext.value.createMediaElementSource(audio.value);
    source.disconnect();
    // 将源连接到 AudioContext 的 destination
    source.connect(audioContext.value.destination);
    document.getElementById('audio_context').appendChild(audio.value)  //把它添加到页面中
    // 播放音频
    audio.value.play();
    audio.value.addEventListener('play', function() {
        console.log('音频开始播放！');
        audioLoading.value = false;
    });
    audio.value.addEventListener('ended', function() {
        console.log('音频结束播放！');
        play({
            row: tableData.value[playIndex.value + 1],
            $index: playIndex.value + 1,
        });
    });
}
onMounted(() => {
    audio.value = new Audio();
    getMusicList();
});
</script>

<style lang="scss" scoped>
.music {
    position: relative;
    width: 100%;
    height: 100%;
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