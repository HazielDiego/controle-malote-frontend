<template>
    <div class="w-full">
        <label class="lbDescricao mb-2" :for="props.fieldName">{{ props.label }}</label>
        <div class="grCodigoRetorno">
            <IconField iconPosition="left" class="edCodigo" >
                <InputIcon class="pi pi-search" @click="onSearchClick" ></InputIcon>
                <InputText class="w-full" @blur="onEditBlur" @keydown="onEditKeydown" v-model="edPesquisa" :disabled="isLoading"/>
            </IconField>
            <label class="lbRetorno">{{ value ? getNestedValue(value, props.campoLabel) : '' }}</label>
            
        </div>
    </div>

    

    <Dialog modal :header="`Pesquisar ${label}`" :style="{ width: '70rem' }" :breakpoints="dlgBreakPointsDefault()" 
         :visible="dlgBuscaVisivel" @update:visible="dlgBuscaVisivel=false"  @show="onShow">
         <div class="col-12 p-fluid formgrid grid">            
            <div class="field col-12">
                <div class="flex">
                    <InputText v-model="edPesquisaDlg" class="mr-2" id="edPesquisaDlg" @keydown="onEdPesquisaKeydown"/>
                    <Button label="Pesquisar" icon="pi pi-search" @click="onPesquisar()" class="btnPesquisar" :loading="isLoading" />
                </div>
            </div>

            <div class="field col-12">

            <div :class="{'hide-table-header': hideColumnHeader}">
                <DataTable selectionMode="single" 
                    id="tblBusca"
                    :dataKey="campoChave" 
                    :value="items" 
                    :loading="isLoading" 
                    v-model:selection="itemselecionado"
                    showGridlines
                    tableStyle="min-width: 50rem" 
                    :rows="pageSize" 
                    :totalRecords="totalItems" 
                    :lazy="true" 
                    :paginator="true" 
                    :rowsPerPageOptions="[6]" 
                    @sort="onSort"
                    @page="onPage" 
                    @keydown="onTblBuscaKeydown"
                    >
                    <slot/>
                </DataTable>
            </div>
        </div>

        </div>

         <template #footer>
            <div class="flex flex-wrap justify-content-center gap-2">
                <Button label="Confirmar" severity="success" icon="pi pi-save" @click="onDlgBuscaConfirmar()" />
                <Button label="Cancelar" severity="secondary" icon="pi pi-times" @click="onDlgBuscaCancelar()" />
            </div>
        </template>   
    </Dialog>

</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
import { isNumericOnly, dlgBreakPointsDefault, setFocus } from '@/utils/util';
import { useField } from 'vee-validate';
// import ComponenteBuscaDlgPesquisa from '@/components/inputs/gen/ComponenteBuscaDlgPesquisa.vue';

const isLoading = ref(false);
const edPesquisa = ref(null);
const edPesquisaDlg = ref(null);
const dlgBuscaVisivel = ref(false);
const currentPage = ref(0);
const pageSize = ref(6);
const sortField = ref('');
const sortOrder = ref('');
const filters = ref([]);
const totalItems = ref(0);
const items = ref([]);
const itemselecionado = ref();

const props = defineProps({
    fieldName: {
        type: String,
        required: true,
    },
    campoChave: {
        type: String,
        required: true
    },
    campoLabel:{
        type: String,
        required: true
    },
    campoFiltro: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    getByIdFunction: {
        type: Function,
        required: true
    },
    getPaginationFunction: {
        type: Function,
        required: true
    },
    hideColumnHeader: {
        type: Boolean,
        default: true
    }, defaultFilter: {
        type: Object,
        required: false,
        default: null
    }
});

let { value } = useField(props.fieldName);

watch(() => value.value, (newVal) => {
    if (!edPesquisa.value && newVal) {
        edPesquisa.value = newVal[props.campoChave];
    }
});

const onEditBlur = async () => {
    if (!edPesquisa.value) {
        value.value = null;
    } else if (isNumericOnly(edPesquisa.value)) {
        // Se ele ja tem um valor setado ?
        if (!value.value || value.value[props.campoChave] != edPesquisa.value) {
            try {
                const ret = await props.getByIdFunction(edPesquisa.value);
                //console.log(ret);
                value.value = ret;
            } catch (error) {                
                if (error.response) {
                    if (error.response.status == 404) {
                        value.value = {};
                        edPesquisa.value = null;            
                    } else { 
                        console.log(error);
                    }
                } else {
                    console.log(error);
                }
            }
        }
    } else {        
        // Pesquisa por texto
        value.value = null;
        dlgBuscaVisivel.value = true;
    }
}

const onEditKeydown = async (e) => {
    if (e.keyCode == 113) {
        // if (value.value) {
        //     edPesquisaDlg.value = value.value[props.campoFiltro];
        // }
        dlgBuscaVisivel.value = true;
    }
}

const onSearchClick = () => {
    // console.log('onSearchClick', edPesquisa);
    // if (!edPesquisa.value) {
    //     console.log('onSearchClick', edPesquisa.value);
    //     value.value = null;
    // }
    dlgBuscaVisivel.value = true;
}

function getNestedValue(obj, path) {
  if (!path.includes('.')) {
    return obj[path]; // Retorna o valor diretamente se for uma chave simples
  }
  // Se for composto, usa a lógica de caminho aninhado
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

const onDlgBuscaConfirmar = () => {
    //console.log('onDlgBuscaConfirmar', itemselecionado.value);
    edPesquisa.value = null;
    value.value = itemselecionado.value;
    if (itemselecionado.value != null) {
        edPesquisa.value = itemselecionado.value[props.campoChave];
    }
    dlgBuscaVisivel.value = false;
}

const onDlgBuscaCancelar = () => {
    //console.log('onDlgBuscaCancelar');
    value.value = null;
    edPesquisa.value = null;
    dlgBuscaVisivel.value = false;
}

const loadData = async () => {
    isLoading.value = true;
    filters.value = [];    
    if (props.defaultFilter != null) {
        filters.value.push(props.defaultFilter);
        // console.log('props.defaultFilter', filters.value);
    }
    filters.value.push({ filter: props.campoFiltro, value: edPesquisaDlg.value });
    const ret = await props.getPaginationFunction(currentPage.value, pageSize.value, sortField.value, sortOrder.value, filters.value);
    totalItems.value = ret.totalElements;
    items.value = ret.content;
    isLoading.value = false;
    nextTick(() => {
        const element = document.getElementById("tblBusca");
        const elTable = element.querySelector('table');
        const elBody = elTable.querySelector('tbody');
        const elTr = elBody.querySelector('tr');
        if (elTr) {
            elTr.focus();
        }
    });
};

const onShow = async () => {

    items.value = [];
    totalItems.value = 0;
    currentPage.value = 0;  
    edPesquisaDlg.value = "";  

    //console.log('value.value', value.value);
    if (value.value == null) {
        if (edPesquisa.value) {
            if (isNumericOnly(edPesquisa.value)) {
                // Ja faz no blur ??
            } else {
                edPesquisaDlg.value = edPesquisa.value;
                loadData();
            }
        } else {
            // Tudo em branco
            value.value = null;
            itemselecionado.value = null;
            loadData();
        }

    } else {
        // Forçar uma busca no dataset e selecionar o item caso exista
        edPesquisaDlg.value = value.value[props.campoFiltro];
        await loadData();
        if (items.value.some(item => item[props.campoChave] == value.value[props.campoChave])) {
            itemselecionado.value = items.value.find(item => item[props.campoChave] == value.value[props.campoChave]);
        }
    }
    isLoading.value = false;  
    setFocus("edPesquisaDlg");
}

const onEdPesquisaKeydown = (e) => {
    if (e.keyCode == 13) {
        loadData();
    }
}

const onTblBuscaKeydown = (e) => {
    if (e.keyCode == 13) {
        //onConfirmar();
        onDlgBuscaConfirmar();
    }
}

const onPage = (e) => {
    currentPage.value = e.page;
    pageSize.value = e.rows;
    loadData();
}

const onSort = (e) => {
    sortField.value = e.sortField;
    sortOrder.value = e.sortOrder == 1 ? 'asc' : 'desc';
    currentPage.value = e.page || 0;
    loadData();
}

const onPesquisar = () => {
    loadData();
}

</script>
<style>
.lbDescricao {
    display: block; 
}
.grCodigoRetorno {
    display: flex; 
    align-items: stretch;
    width: 100%; /* Adiciona uma largura definida ao contêiner pai */
}
.edCodigo {
    width: 30% !important; 
    max-width: 120px !important;
    margin-right: 1px; 
}
.lbRetorno {
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
    flex: 1; /* Adiciona flex para ocupar o restante do espaço disponível */
    padding-left: 3px;
    border: 1px dotted rgba(134, 132, 132, 0.5); 
    border-radius: 5px; 
    display: flex; 
    align-items: center; 
}
.hide-table-header .p-datatable-thead > tr > th {
    display: none;
}
.btnPesquisar {
    max-width: 140px;
}
</style>