<template>
    <div class="mb-2 text-left block w-full"><strong>{{ props.label }}:</strong></div>
    <span>{{ props.value }}</span>
</template>
<script setup>
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});
</script>
<style scoped></style>