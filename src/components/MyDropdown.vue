<template>
    <div class="w-full">
        <label class="mb-2 text-left block w-full"
               :for="props.fieldName">{{ label }}:</label>

        <Dropdown :inputId="props.fieldName + '-id'"
                  v-model="value"
                  :options="items"
                  filter
                  :disabled="props.disabled"
                  :optionLabel="myOptionLabel"
                  placeholder="Selecione"
                  :inputStyle="{ width: '100%' }"
                  class="w-full"
                  :class="{ 'p-invalid': errorMessage }"
                  :aria-describedby="props.fieldName + '-ac-error'"
                  :inputClass="{ 'p-invalid': errorMessage }"
                  @change="() => emit('change', value)" />
        <small :id="props.fieldName + '-ac-error'"
               class="p-error">{{ errorMessage || '&nbsp;' }}</small>
    </div>
</template>
<script setup>
import { useField } from 'vee-validate';
import { defineEmits } from 'vue';

const props = defineProps({
    fieldName: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    items: {
        required: true,
    },
    myOptionLabel: {
        required: true,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['change']);

let { value, errorMessage } = useField(props.fieldName);
</script>
<style scoped></style>