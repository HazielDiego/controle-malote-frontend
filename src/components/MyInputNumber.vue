<template>
    <div class="w-full">
        <label class="mb-2 text-left block w-full"
               :for="props.fieldName">{{ label }}:</label>
        <InputNumber v-model="value"
                     :inputId="props.fieldName"
                     :minFractionDigits="fractionDigits"
                     inputClass="w-full"
                     class="w-full"
                     :maxFractionDigits="fractionDigits"
                     locale="de-DE"
                     :aria-describedby="`${props.fieldName}-help`"
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
    },
    fractionDigits: {
        type: Number,
        required: false,
        default: 2
    }
})

let { value, errorMessage } = useField(props.fieldName);

</script>
<style></style>