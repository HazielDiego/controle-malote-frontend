<template>
    <MyDropdown :fieldName="fieldName" :label="label" :items="items" :myOptionLabel="(item) => item.classificacao" />
</template>
<script setup>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex';
import MyDropdown from '@/components/MyDropdown.vue';

const store = useStore();

const props = defineProps({
    fieldName: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
})

const items = computed(() => store.getters['tabelasPadrao/getPortes'])

onMounted(() => {
    store.dispatch('tabelasPadrao/buscaPortes');
})

</script>
<style></style>