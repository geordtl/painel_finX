<template>
  <v-table class="border-table">
    <thead>
      <tr style="background-color: #E6F6FD;" class="text-left text-tertiary text-caption">
        <th>#ID</th>
        <th>Médico</th>
        <th>Paciente</th>
        <th>Data Nasc.</th>
        <th>Data solicitação</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!props.data || props.data.length === 0">
        <td colspan="5" class="text-center py-6 font-weight-medium text-tertiary">
          Nenhum registro encontrado!
        </td>
      </tr>

      <tr v-else v-for="item in props.data" class="text-caption text-darkGrey">
        <td>{{ item.id }}</td>
        <td>{{ item.medico.nome }}</td>
        <td>{{ item.paciente.nome }}</td>
        <td>{{ formatarData(item.paciente.dataNascimento) }}</td>
        <td>{{ formatarData(item.dataCriacao) }}</td>
      </tr>
    </tbody>

     <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination
          v-model="props.paginacao.paginaAtual"
          :length="props.paginacao.totalDePaginas"
        ></v-pagination>
      </div>
    </template>
  </v-table>
</template>

<script setup lang="ts">
import type { ResponseSolicitacoes } from "@/types/solicitacoes";

const props = defineProps<ResponseSolicitacoes>();

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
</script>

<style scoped>
.border-table {
    border: 1px solid #aab4be55;
    border-radius: 8px;
}
</style>
