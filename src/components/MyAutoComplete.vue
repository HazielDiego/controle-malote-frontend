<template>
    <div class="w-full">
        <label class="mb-1"
               :for="props.fieldName">{{ label }}:</label>
        <AutoComplete :inputId="props.fieldName + '-id'"
                      :optionLabel="myOptionLabel"
                      :suggestions="filteredItems"
                      @complete="search"
                      :inputStyle="{ width: '100%' }"
                      class="w-full"
                      :class="{ 'p-invalid': errorMessage }"
                      v-model="value"
                      :delay="600"
                      :aria-describedby="props.fieldName + '-ac-error'"
                      :placeholder="placeHolder"
                      :inputClass="{ 'p-invalid': errorMessage }" />
        <small :id="props.fieldName + '-ac-error'"
               class="p-error">{{ errorMessage || '&nbsp;' }}</small>
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
    filteredItems: {
        required: true
    },
    myOptionLabel: {
        required: true
    },
    placeHolder: {
        type: String,
        required: false,
        default: ''
    }
})

const emit = defineEmits(['onSearch'])

function search(event) {
    emit('onSearch', event)
}

let { value, errorMessage } = useField(props.fieldName);
</script>
<style scoped></style>