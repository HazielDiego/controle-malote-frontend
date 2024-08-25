<template>
    <div class="w-full mb-2">
        <label class="mb-2 text-left block w-full"
               :for="props.fieldName">{{ label }}:</label>
        <InputSwitch :id="props.fieldName"
                     class="p-2"
                     v-model="value"
                     :class="{ 'p-invalid': errorMessage }" />
        <small v-if="errorMessage"
               class="p-error">{{ errorMessage || '&nbsp;' }}</small>
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
})

let { value, errorMessage } = useField(props.fieldName);

</script>
<style scoped></style>
