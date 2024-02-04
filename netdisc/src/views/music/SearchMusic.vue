<template>
    <div class="SearchMusic">
        <el-button type="danger" @click="searchLove">我的歌单</el-button>

        <el-button v-if="route.path!=='/cloud'" type="danger" @click="toMyCloud">前往我的云盘</el-button>

        <el-button v-else type="danger" @click="searchMyCloud">我的云盘</el-button>

        <div class="search_id">
            <el-input v-model="musicListId" size="default" placeholder="请输入歌单id"></el-input>
            <el-button @click="searchMusicList">查询</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getMusicListApi, getLoveListApi } from "@/api/music.js";
import { useRouter, useRoute } from 'vue-router';

const emit = defineEmits(['getTableDataCb', 'getMusicListCb', 'getCloudInfoCb'])
const tableData = ref([]);
async function searchLove() {
    const { playlist } = await getLoveListApi({
        uid: 325892764,
    })
    tableData.value = playlist;
    emit('getTableDataCb', playlist);
}

function toMyCloud() {
    router.push({
        path: '/cloud'
    })
}

const router = useRouter();
const route = useRoute();
function searchMyCloud() {
    emit('getCloudInfoCb');
}

const musicListId = ref('');

const getMusicList = async () => {
    const { playlist: { tracks } } = await getMusicListApi({
        id: musicListId.value,
        // timestamp: 1704350979167,
        // realIP: '211.161.244.70'
    });
    emit('getMusicListCb', tracks);
    console.log(tracks);
    // const seachList = privileges.map((e: { id: any; }) => e.id);
    // const { songs } = await getMusicListDetailApi({
    //     ids: seachList.join(','),
    // })
    // tableData.value = songs;
}
function searchMusicList() {
    getMusicList();
}
</script>

<style lang="scss" scoped>
.SearchMusic {
    height: 50px;
    border: 1px solid #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search_id {
        height: 32px;
        display: flex;
    }
}
</style>