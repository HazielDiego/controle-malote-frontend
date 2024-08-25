<template>
    <MyDropdown :fieldName="fieldName" :label="label" :items="items" :myOptionLabel="(item) => item" />
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

// ARMAZENA OS TIPOS DE USO FILTRADOS
const items = computed(() => store.getters['moduloCarregamentoAnual/getAnosCarregados'])

onMounted(() => {
    store.dispatch('moduloCarregamentoAnual/buscaAnosCarregados');
})

</script>
<style></style>