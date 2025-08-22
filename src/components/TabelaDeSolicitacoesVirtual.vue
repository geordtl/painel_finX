<template>
  <v-table class="table" :fixed-header="true" >
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
        <div>Urgência</div>
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
      v-bind="containerProps" class="containerProps">
        <div v-bind="wrapperProps">
          <div
            v-for="{ index, data } in list"
            :key="index"
            class="list text-caption text-darkGrey pa-4"
          >
            <td style="min-width: 100px;" class="text-lightGrey">{{ data.id }}</td>
            <td style="width:250px;">{{ data.medico.nome }}</td>
            <td style="width:250px;">{{ data.paciente.nome }}</td>
            <td style="width:370px;">{{ format.date(data.paciente.dataNascimento) }} - {{ calculateAge(data.paciente.dataNascimento) }} anos</td>
            <td style="width:250px;">{{ format.date(data.dataCriacao) }}</td>
            <td>
              <v-chip class="text-center" density="compact" variant="flat" :color="colors[data.urgencia].bg" :style="{ color: colors[data.urgencia].text }">
                  {{ colors[data.urgencia].label }}
              </v-chip>
            </td>
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
import { ref, watch } from "vue";

const props = defineProps<ResponseSolicitacoes>();
const historico = ref<ResponseSolicitacoes | any>([]);
const ordenando = ref(false);

const colors = {
  baixa: {
    label: 'Baixa',
    bg: '#ECF7EC',
    text: '#729870'
  },
  media: {
    label: 'Média',
    bg: '#FFF1DF',
    text: '#B56418'
  },
  alta: {
    label: 'Alta',
    bg: '#FBE9E9',
    text: '#872C29'
  }
}

const { list, containerProps, wrapperProps } = useVirtualList(historico, {
  itemHeight: 96,
});

watch(props, (value) => {
  if(value.data?.data) historico.value = value.data.data
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
.table {
  width: 100%;
  max-height: 480px;
  border: 1px solid #aab4be55;
  border-radius: 8px;
}

.containerProps {
  max-height: 400px; 
  overflow-y: auto;
}

.list {
  height: 40px;  
  margin-bottom: 16px
}
</style>
