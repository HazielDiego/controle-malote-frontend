<template>
    <div></div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
    store.dispatch('userModule/logout')
})
</script>