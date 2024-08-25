<template>
    <label class="mb-2 text-left block w-full"
           :for="props.fieldName">{{ label }}:</label>
    <InputMask :id="props.fieldName"
               class="w-full"
               :ref="fieldName + '-ref'"
               :name="props.fieldName"
               v-model="value"
               :mask="telefoneMask"
               :class="{ 'p-invalid': errorMessage }"
               @change="telefoneMaskChange" />
    <small class="p-error">{{ errorMessage || '&nbsp;' }}</small>
</template>
<script setup>
import { reactive } from 'vue'
import { useField } from 'vee-validate';

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

let { value, errorMessage } = useField(props.fieldName);

let telefoneMask = reactive('(99) 9999-9999?9')

const telefoneMaskChange = (event) => {
    const valorAlterrado = event.target.value.split("").filter(element => element !== " ");
    if (valorAlterrado.length == 13) {
        telefoneMask = '(99) 9999-9999?9'
    }
    if (valorAlterrado.length == 14) {
        telefoneMask = '(99) 9 9999-999?9'
    }
}
</script>
<style scoped></style>