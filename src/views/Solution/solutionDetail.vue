<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div>
        我是详细题解
        {{ route.params.id }}
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
</script>