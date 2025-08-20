<template>
  <div class="d-flex flex-column w-100 ma-16">
    <header>
      <img src="@/assets/logo.svg" alt="">
      <p class="text-h4 font-weight-medium mt-8">Solicitações</p>
      <p class="text-subtitle-1 text-grey mt-1">Consulte aqui as solicitações cirúrgicas feitas para a Fin-X!</p>
    </header>
    <main class="mt-2">
        <TabelaDeSolicitacoes :data="data" :paginacao="paginacao" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TabelaDeSolicitacoes from '@/components/TabelaDeSolicitacoes.vue';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

const data = ref({});
const paginacao = ref({});

onBeforeMount(() => {
  axios.get("/db.json").then(res => {
    data.value = res.data.data;
  }).catch(error => {
    console.log(error);
    
  })
})
  //
</script>
