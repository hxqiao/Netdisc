<template>
     <el-menu
        :default-active="activeTab"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
        <el-menu-item>
            <img
                style="width: 60px;"
                src="https://th.bing.com/th/id/OIP.TjFUTquZC7evY7CbupMa3QHaHa?rs=1&pid=ImgDetMain"
                alt="hanxi music logo"
            />
        </el-menu-item>
        <div style="flex-grow: 1;" />
        <el-menu-item v-for="item in tabList" :index="item.value">
            {{ item.name }}
        </el-menu-item>
    </el-menu>
    <div v-if="activeTab === 'musicList'" class="SearchMusic">
        <el-button type="danger" @click="searchLove">我的歌单</el-button>

        <div class="search_id">
            <el-input v-model="musicListId" size="default" placeholder="请输入歌单id"></el-input>
            <el-button @click="searchMusicList">查询</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getMusicListApi, getLoveListApi } from "@/api/music.js";
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const emit = defineEmits(['getTableDataCb', 'getMusicListCb', 'getCloudInfoCb'])

const tabList = [
    {
        name: '我的歌单',
        value: 'musicList',
        path: '/music'
    },
    {
        name: '我的云盘',
        value: 'cloud',
        path: '/cloud'
    },
]
const activeTab = ref('musicList');
function handleSelect(value: string) {
    router.push({
        path: tabList.find(e => e.value === value).path
    })
}

const tableData = ref([]);
async function searchLove() {
    const { playlist } = await getLoveListApi({
        uid: 325892764,
    })
    tableData.value = playlist;
    emit('getTableDataCb', playlist);
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
onMounted(() => {
    console.log(route.path);
    activeTab.value = tabList.find(e => e.path === route.path).value;
})
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