<template>
    <div class="w-full">
        <label class="mb-2 text-left block w-full"
               :for="props.fieldName">{{ label }}:</label>
        <span class="">
            <div v-for="(opt, index) in props.optList"
                 :class="{ 'p-invalid': errorMessage }"
                 style="display: inline-block;">
                <RadioButton v-model="value"
                             :id="props.fieldName + index"
                             :name="props.fieldName + index"
                             :value="opt"
                             @change="$emit('change', $event)" />
                <label :for="props.fieldName + index"
                       class="ml-2 mr-2">{{ opt }}</label>
            </div>

        </span>
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
    optList: {
        type: Array,
        required: true
    }
})

let { value, errorMessage } = useField(props.fieldName);

</script>
<style scoped></style>