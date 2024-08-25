<template>
    <div class="w-full">
        <label class="mb-2 text-left block w-full"
               :for="props.fieldName">{{ label }}:</label>
        <InputMask :id="props.fieldName"
                   class="w-full p-2"
                   :name="props.fieldName"
                   v-model="value"
                   :mask="myMask"
                   :class="{ 'p-invalid': errorMessage }"
                   :disabled="disabled" />
        <small class="p-error">{{ errorMessage || '&nbsp;' }}</small>
    </div>
</template>
<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
    fieldName: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    myMask: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    }
})

let { value, errorMessage } = useField(props.fieldName);
</script>
<style scoped></style>