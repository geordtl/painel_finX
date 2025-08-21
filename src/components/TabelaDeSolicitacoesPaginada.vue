<template>
  <v-data-table class="border-table" style="max-height: 400px;" :fixed-header="true" :items-length="props.paginacao?.totalDeItens" :items-per-page="props.paginacao?.itensPorPagina"> 
    <thead>
      <tr class="text-left text-blue text-caption">
        <th>#ID</th>
        <th>Médico</th>
        <th>Paciente</th>
        <th class="text-truncate" style="max-width: 50px;">Data nascimento</th>
        <th class="text-truncate cursor-pointer" style="max-width: 50px;" @click="ordenarData()">
          <v-icon size="16" color="lightGrey">
            {{ ordenando ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
          </v-icon>
          Data solicitação
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!itensVisiveis || itensVisiveis.length === 0">
        <td colspan="5" class="text-center py-6 font-weight-medium text-tertiary">
          Nenhum registro encontrado!
        </td>
      </tr>

      <tr v-else v-for="item in itensVisiveis" class="text-caption text-darkGrey">
        <td>{{ item.id }}</td>
        <td>{{ item.medico.nome }}</td>
        <td>{{ item.paciente.nome }}</td>
        <td>{{ formatarData(item.paciente.dataNascimento) }}</td>
        <td>{{ formatarData(item.dataCriacao) }}</td>
      </tr>
    </tbody>

     <template v-slot:bottom>
      <div class="text-center py-2 my-2">
        <v-pagination
          density="compact"
          v-model="paginacao.paginaAtual"
          :length="paginacao?.totalDePaginas"
          :total-visible="5"
          color="secondary"
        ></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import type { ResponseSolicitacoes, Paginacao } from "@/types/solicitacoes";
import { computed, ref, watch } from "vue";

const props = defineProps<ResponseSolicitacoes>();

const paginacao = computed<Paginacao>(() => props.paginacao ?? {
  paginaAtual: 1,
  itensPorPagina: 10,
  totalDePaginas: 1,
  totalDeItens: 0,
  next_page_url: '',
  prev_page_url: null
});

const dadosOrdenados = ref(props.data?.data ? [...props.data.data] : []);

const itensVisiveis = computed(() => {
    const inicio = (paginacao.value?.paginaAtual - 1) * paginacao.value?.itensPorPagina;
    return dadosOrdenados.value.slice(inicio, inicio + paginacao.value?.itensPorPagina);
})

const ordenando = ref(false);

function formatarData(date: string){
  const data = new Date(date);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  if(date.includes('T')){
    const hora = String(data.getHours()).padStart(2, "0");
    const minuto = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
  }else {
    return `${dia}/${mes}/${ano}`
  }
}

function ordenarData(){
  ordenando.value = !ordenando.value;

   dadosOrdenados.value.sort((a, b) => {
    const dataA = new Date(a.dataCriacao).getTime();
    const dataB = new Date(b.dataCriacao).getTime();
    return ordenando.value ? dataA - dataB : dataB - dataA;
  });
}

watch(props, (value) => {
  if(value?.data?.data) dadosOrdenados.value = [...value.data.data]
})
</script>

<style scoped>
.border-table {
    border: 1px solid #aab4be55;
    border-radius: 8px;
}
</style>