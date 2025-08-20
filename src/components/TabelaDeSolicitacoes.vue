<template>
  <v-table class="">
    <thead>
      <tr style="background-color: #E6F6FD;">
        <th class="text-left">#ID</th>
        <th class="text-left">Médico</th>
        <th class="text-left">Paciente</th>
        <th class="text-left">Data Nasc.</th>
        <th class="text-left">Data solicitação</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.data">
        <td>{{ item.id }}</td>
        <td>{{ item.medico.nome }}</td>
        <td>{{ item.paciente.nome }}</td>
        <td>{{ item.paciente.dataNascimento }}</td>
        <td>{{ item.dataCriacao }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

interface Dados {
    data: {
        id: number;
        medico: {
            nome: string;
        },
        paciente: {
            nome: string;
            dataNascimento: string;
        },
        dataCriacao: string;
    }[],
    paginacao: {
        paginaAtual: number,
        itensPorPagina: number,
        totalDePaginas: number,
        totalDeItens: number,
        next_page_url: string,
        prev_page_url: null
    }
}

const props = defineProps<Dados>();
</script>
