<template>
    <SimplePageWithTitleAndContent title="PERFIL DE USUÁRIO">
        <form @submit.prevent="onSubmit"
              class="w-full">
            <div class="grid">
                <!-- <div class="md:col-6 col-12">
                    <MyInput label="ID" fieldName="id" disabled />
                </div> -->
                <div class="md:col-6 col-12">
                    <MyInput label="Nome"
                             fieldName="nome"
                             disabled />
                </div>
                <div class="md:col-6 col-12">
                    <MyInput label="E-Mail"
                             fieldName="email"
                             disabled />
                </div>
                <div class="md:col-6 col-12">
                    <MyInputMask label="CPF"
                                 fieldName="cpf"
                                 myMask="999.999.999-99"
                                 disabled />
                </div>
                <div class="md:col-6 col-12">
                    <MyInput label="E-Mail Verificado"
                             fieldName="emailVerifiedPtBr"
                             disabled />
                </div>
                <div class="md:col-6 col-12">
                    <MyInput label="Data Nascimento"
                             fieldName="dataNascimentoFormated"
                             disabled />
                </div>
                <div class="md:col-6 col-12">
                    <MyInput label="Ativo"
                             fieldName="ativoPtBr"
                             disabled />
                </div>
                <div class="md:col-6 col-12">
                    <label class="mb-2 text-left block w-full">Papeis:</label>
                    <ul>
                        <li v-for="role in values.roles"
                            :key="role.id">
                            {{ role.nome.replace('ROLE_', '') }}
                        </li>
                    </ul>
                </div>
            </div>
        </form>
    </SimplePageWithTitleAndContent>
</template>
<script setup>
import SimplePageWithTitleAndContent from '@/components/SimplePageWithTitleAndContent.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useForm } from 'vee-validate';
import MyInput from '@/components/MyInput.vue';
import MyInputMask from '@/components/MyInputMask.vue';

const store = useStore();

const initialValues = {
    "id": null,
    "nome": null,
    "email": null,
    "cpf": null,
    "emailVerified": false,
    "dataNascimento": null,
    "ativo": true,
    "roles": [
        // { "id": 1, "nome": "ROLE_USER", "descricao": "Usuário padrao" }
    ]
}

const { setValues, handleSubmit, resetForm, setFieldValue, values } = useForm({
    initialValues: initialValues
})

const onSubmit = handleSubmit(async (values) => {
    console.log(values)

});

onMounted(() => {
    const user = store.state.userModule.user;
    user.ativoPtBr = user.ativo ? 'Sim' : 'Não';
    user.emailVerifiedPtBr = user.emailVerified ? 'Sim' : 'Não';
    user.dataNascimentoFormated = new Date(user.dataNascimento).toLocaleDateString('pt-BR');
    setValues(user);
})
</script>
<style scoped></style>