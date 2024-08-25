<template>
    <div class="w-full mb-2">
        <label class="mb-2 text-left block w-full"
               :for="props.fieldName">{{ label }}:</label>
        <span class="p-input-icon-right w-full">
            <i v-if="icon"
               :class="icon" />
            <InputText :id="props.fieldName"
                       :type="inputType"
                       class="w-full p-2"
                       v-model="value"
                       :disabled="props.disabled"
                       :placeholder="props.placeHolder"
                       :aria-describedby="`${props.fieldName}-help`"
                       :class="{ 'p-invalid': errorMessage }" />
        </span>
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
    icon: {
        type: String,
        required: false,
        default: ''
    },
    label: {
        type: String,
        required: true
    },
    inputType: {
        type: String,
        required: false,
        default: 'text'
    },
    placeHolder: {
        type: String,
        required: false,
        default: ''
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
