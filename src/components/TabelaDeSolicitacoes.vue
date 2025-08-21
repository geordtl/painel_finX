<template>
  <v-table class="border-table"  style="width:100%; border:1px solid #aab4be55; border-radius:8px;">
      <div
        style="background-color: #e6f6fd"
        class="d-flex text-left text-tertiary text-caption"
      >
        <div style="width:50px;">#ID</div>
        <div style="width:150px;">Médico</div>
        <div style="width:150px;">Paciente</div>
        <div style="width:120px;">Data Nascimento</div>
        <div style="width:150px;">Data solicitação</div>
      </div>
    <tbody>
      <tr v-if="!props.data || props.data.length === 0">
        <td
          colspan="5"
          class="text-center py-6 font-weight-medium text-tertiary"
        >
          Nenhum registro encontrado!
        </td>
      </tr>
      {{ loading }}
 <tr v-if="loading">
    <td colspan="5" class="text-center py-6 font-weight-medium text-tertiary">
      Carregando...
    </td>
  </tr>
      <div v-else v-bind="containerProps" style="height:400px; overflow-y:auto;">
        <div v-bind="wrapperProps">
          <div
            v-for="{ index, data } in list"
            :key="index"
            style="height: 40px;  margin-bottom: 16px"
          >
            <td style="width:50px;" class=" text-lightGrey">{{ data.id }}</td>
            <td style="width:150px;"">{{ data.medico.nome }}</td>
            <td style="width:150px;">{{ data.paciente.nome }}</td>
            <td style="width:120px;">{{ formatarData(data.paciente.dataNascimento) }}</td>
            <td style="width:150px;">{{ formatarData(data.dataCriacao) }}</td>
          </div>
        </div>
      </div>
      <!-- <tr v-else v-for="item in props.data" class="text-caption text-darkGrey">
        <td class="text-lightGrey">{{ item.id }}</td>
        <td>{{ item.medico.nome }}</td>
        <td>{{ item.paciente.nome }}</td>
        <td>{{ formatarData(item.paciente.dataNascimento) }}</td>
        <td>{{ formatarData(item.dataCriacao) }}</td>
      </tr> -->
    </tbody>
    <!-- 
     <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="props.paginacao.paginaAtual"
          :length="props.paginacao.totalDePaginas"
        ></v-pagination>
      </div>
    </template> -->
  </v-table>
</template>

<script setup lang="ts">
import type { ResponseSolicitacoes } from "@/types/solicitacoes";

import { useVirtualList } from "@vueuse/core";
import { onMounted, ref, computed } from "vue";

const props = defineProps<ResponseSolicitacoes>();

const { list, containerProps, wrapperProps } = useVirtualList(props.data, {
  itemHeight: 96,
});

const loading = computed(() => !props.data || props.data.length === 0);

onMounted(() => {
  // console.log(props.data);
});

function formatarData(date: string) {
  const data = new Date(date);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  if (date.includes("T")) {
    const hora = String(data.getHours()).padStart(2, "0");
    const minuto = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
  } else {
    return `${dia}/${mes}/${ano}`;
  }
}
</script>

<style scoped>
.border-table {
  border: 1px solid #aab4be55;
  border-radius: 8px;
}
</style>
