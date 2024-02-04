<template>
    <div id="audio_context" v-loading="audioLoading">
        <audio
            v-show="isplay"
            ref='audio'
            :src="musicUrl"
            controls
            autoplay 
            class="myaudio"
            @error="playError"
            @play='playing'
            @ended='ended'
            @timeupdate="onTimeUpdate"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { getSongUrlApi } from "@/api/music.js";

const props = defineProps({
    modelValue: {
        default: 0,
        type: Number
    },
    playList: {
        default: () => [],
        type: Array
    }
})

watch(() => props.modelValue, () => {
    console.log(props.modelValue);
    
    playMusic();
})

const emit = defineEmits(['update:modelValue', 'timeupdate'])

const audioLoading = ref(false);
const isplay = ref(false);

function playError(params: any) {
    console.log(params);
}

function ended() {
    isplay.value = false;
    emit('update:modelValue', props.modelValue + 1)
    nextTick(() => {
        playMusic();
    })
}

function playing() {
    isplay.value = true;
}

const musicUrl = ref('');
const playMusic = async () => {
    console.log(props.playList);
    
    musicUrl.value = await getSongUrlApi({
        id: props.playList[props.modelValue - 1].id,
        realIP: '211.161.244.70',
        br: 320000
    })
}

function onTimeUpdate(e: any) {
    e.playingTime = s_to_hs(parseInt(e.target.currentTime))
    e.playingPercentage = (e.target.currentTime / e.target.duration * 100) || 0
    emit('timeupdate', e)
}

// 秒数转换分+秒
function s_to_hs(s: any): any {
    var h: any;
    h = Math.floor(s / 60);
    s = s % 60;
    h += '';
    s += '';
    h = (h.length == 1) ? '0' + h : h;
    s = (s.length == 1) ? '0' + s : s;
    if (isNaN(h)) {
    return "&infin;"
    }
    return h + ':' + s;
}

defineExpose({
    playMusic
})
</script>

<style scoped>
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
</style>