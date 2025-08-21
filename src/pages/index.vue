<template>
  <div class="d-flex flex-column ma-8 ma-sm-16">

    <header>
      <img src="@/assets/logo.svg" alt="" width="72">
      <p class="text-h5 text-sm-h4 font-weight-medium text-tertiary mt-4">Solicitações</p>
      <p class="text-body-2 text-lightGrey mt-1 mb-2">Consulte aqui as solicitações cirúrgicas feitas para a Fin-X!</p>

      <v-btn variant="outlined" size="small" rounded="xl" class="text-blue mr-2" @click="dadosFiltrados(true)">Filtrar</v-btn>
      <input type="text" class="input" v-model="search">

      <!-- <v-chip variant="outlined" color="blue" class="mr-2">
        <img src="@/assets/estetoscopio.svg" alt="">
        <span class="text-tertiary font-weight-medium ml-1">Médico:</span>
        <span class="text-lightGrey ml-1">Angelo S...</span>
      </v-chip>

      <v-chip variant="outlined" color="blue">
        <img src="@/assets/estetoscopio.svg" alt="">
        <span class="text-tertiary font-weight-medium ml-1">Paciente:</span>
        <span class="text-lightGrey ml-1">Angelo S...</span>
      </v-chip> -->

    </header>
    <main class="mt-2">
        <TabelaDeSolicitacoes :data="dadosFiltrados(filtrando)" :paginacao="paginacao" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TabelaDeSolicitacoes from '@/components/TabelaDeSolicitacoes.vue';
import { onBeforeMount, ref } from 'vue';
import api from '@/services/api';

const data = ref({});
const paginacao = ref({});
const search = ref('');
const filtrando = ref(false);

onBeforeMount(async () => {
  await buscarSolicitacoes();
})

async function buscarSolicitacoes(){
  const res = await api('get', './db.json', '2024-09-20');
  
  data.value = res;
}

function dadosFiltrados(filtrar: boolean) {
  if(!filtrar || search.value.trim() == '') return data.value;

  filtrando.value = true;
  return data.value.filter(item => item.medico.nome.includes(search.value) || item.paciente.nome.includes(search.value));
}
</script>

<style scoped>
.input {
  border: 1px solid #AAB4BE;
  border-radius: 5px;
}

</style>
