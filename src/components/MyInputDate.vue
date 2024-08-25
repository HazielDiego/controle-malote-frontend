<template>
    <div class="w-full">
        <label class="mb-2 text-left block w-full"
               :for="props.fieldName">{{ label }}:</label>
        <Calendar :id="props.fieldName"
                  v-model="value"
                  dateFormat="dd/mm/yy"
                  class="w-full"
                  :class="{ 'p-invalid': errorMessage }" />
        <small class="p-error">{{ errorMessage || '&nbsp;' }}</small>

    </div>
</template>
<script setup>
import { useField } from 'vee-validate';
const props = defineProps({
    fieldName: {
        required: true
    },
    label: {
        type: String,
        required: true
    }
})

let { value, errorMessage } = useField(props.fieldName);
</script>
<style></style>