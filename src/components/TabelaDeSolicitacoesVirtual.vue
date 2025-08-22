<template>
  <v-table class="border-table" :fixed-header="true" style="width:100%; max-height: 480px; border:1px solid #aab4be55; border-radius:8px;">
      <div
        style="background-color: #e6f6fd"
        class="d-flex text-left text-tertiary text-caption pa-4"
      >
        <div style="width:100px;">#ID</div>
        <div style="width:250px;">Médico</div>
        <div style="width:250px;">Paciente</div>
        <div class="text-truncate" style="width: 370px;">Data Nascimento</div>
        <div class="text-truncate cursor-pointer" style="width: 250px;" @click="ordenarData()">
          <v-icon size="16" color="lightGrey">
            {{ ordenando ? 'mdi-arrow-down' : 'mdi-arrow-up' }}
          </v-icon>
          Data solicitação
        </div>
      </div>
    <tbody>
      <tr v-if="!list|| list.length === 0">
        <td
          colspan="5"
          class="text-center py-6 font-weight-medium text-tertiary"
        >
          Nenhum registro encontrado!
        </td>
      </tr>
  
      <div 
      v-bind="containerProps" style="max-height:400px; overflow-y:auto;">
        <div v-bind="wrapperProps">
          <div
            v-for="{ index, data } in list"
            :key="index"
            style="height: 40px;  margin-bottom: 16px"
            class="text-caption text-darkGrey pa-4"
          >
            <td style="min-width: 100px;" class="text-lightGrey">{{ data.id }}</td>
            <td style="width:250px;">{{ data.medico.nome }}</td>
            <td style="width:250px;">{{ data.paciente.nome }}</td>
            <td style="width:370px;">{{ format.date(data.paciente.dataNascimento) }} - {{ calculateAge(data.paciente.dataNascimento) }} anos</td>
            <td style="width:250px;">{{ format.date(data.dataCriacao) }}</td>
          </div>
        </div>
      </div>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import type { ResponseSolicitacoes } from "@/types/solicitacoes";
import format from "@/utils/format";
import { calculateAge } from "@/utils/functions/calculateAge";

import { useVirtualList } from "@vueuse/core";
import { onMounted, ref, computed, watch } from "vue";

const props = defineProps<ResponseSolicitacoes>();
const historico = ref([]);
const ordenando = ref(false);

const { list, containerProps, wrapperProps } = useVirtualList(historico, {
  itemHeight: 96,
});

watch(props, (value) => {
  if(value.data.data) historico.value = value.data.data
})

async function ordenarData(){
  ordenando.value = !ordenando.value;

   historico.value = [...historico.value].sort((a, b) => {
    const dataA = new Date(a.dataCriacao).getTime();
    const dataB = new Date(b.dataCriacao).getTime();
    return ordenando.value ? dataA - dataB : dataB - dataA;
  });
}

</script>

<style scoped>
.border-table {
  border: 1px solid #aab4be55;
  border-radius: 8px;
}
</style>
