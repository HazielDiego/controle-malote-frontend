<template>
    <Card>
        <template #title>{{ props.title }}</template>
        <template #content>
            <slot></slot>
        </template>
    </Card>
</template>
<script setup>

const props = defineProps({
    title: String
})

</script>
<style scoped></style>