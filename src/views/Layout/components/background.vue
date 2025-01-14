<template>
    <div class="background-container">
        <div class="background-text">
            <span v-for="(line, lineIndex) in lines" :key="lineIndex">
                <span v-for="(char, charIndex) in line" :key="charIndex" :style="{ color: colors[1] }" style="font-weight: bold;">{{ char }}</span>
                <br v-if="lineIndex < lines.length - 1" />
            </span>
            <span :class="cursor"
                :style="cursorStyle"></span>
        </div>
        
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const fullText = 'Welcome to SSEOJ\nCoding Start From Here!';
const lines = ref([]);
const displayText = ref('');

const cursorPosition = ref(2);
const cursorTopPosition = ref(4);
const cursorAnimation = ref('')
const cursor = ref('cursor1')
const colors = ['#ffffff', '#000']

const cursorStyle = computed(() => {
  return {
    left: cursorPosition.value + 'px', 
    top: cursorTopPosition.value + 'px',
    animation: cursorAnimation.value,
  };
});

onMounted(() => {
    let index = 0;
    const interval = setInterval(() => {
        const char = fullText[index];
        displayText.value += char;
        updateLines();
        updateCursorPosition(char);
        index++;
        if (index >= fullText.length) {
            cursor.value = 'cursor2'
            clearInterval(interval); 
        }
    }, 200);
});

function updateLines() {
    const linesArr = displayText.value.split('\n');
    lines.value = linesArr.map(line => line.split('|'));
}

function updateCursorPosition(char) {
    const fontSize = 17; 
    const lineHeight = fontSize * 2.5; 

    if (char === '\n') {
        cursorPosition.value = 0;
        cursorTopPosition.value += lineHeight;
    } else {
        cursorPosition.value += fontSize;
    }
}
</script>

<style scoped>
.background-container {
    height: 300px;
    display: flex;
    /* justify-content: center;
    align-items: center; */
    position: relative;
    overflow: hidden;
    background-size: 200% 200%;
}

.background-text {
    font-size: 28px;
    color: rgba(255, 255, 255, 0.8);
    font-family: "Courier New", monospace;
    display: inline-block;
    line-height: 1.5;
    max-width: 90%;
    position: relative;
}

.cursor1 {
    display: inline-block;
    width: 2px;
    height: 1em;
    background-color: black;
    position: absolute;
    top: 0;
    /*animation: blink 0.8s step-start infinite;/* /* 光标闪烁效果 */
}

.cursor2 {
    display: inline-block;
    width: 2px;
    height: 1em;
    background-color: black;
    position: absolute;
    animation: blink 0.8s step-start infinite; /* 光标闪烁效果 */
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>