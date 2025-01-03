<template>
    <layoutNav />
    <FEditor :key="1" :init-id="ref1"></FEditor>
    <FEditor :key="2" :init-id="ref2"></FEditor>
</template>

<script setup>
import { ref } from 'vue';
import layoutNav from '../Layout/components/layoutNav.vue';
import FEditor from '@/components/FEditor.vue';
import TEditor from '@/components/TEditor.vue';

const ref1 = ref('aa')
const ref2 = ref('ab')
const editors = ['name', 'description', ''];
</script>