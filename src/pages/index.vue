<template>
  <div class="d-flex flex-column ma-8 ma-sm-16">
    <header>
      <img src="@/assets/logo.svg" alt="Logo Fin-X" class="logo" />
      <p class="text-h5 text-sm-h4 font-weight-medium text-tertiary mt-4">
        Solicitações cirúrgicas
      </p>
      <p class="text-body-2 text-lightGrey mt-1 mb-2">
        Consulte aqui as solicitações feitas para a Fin-X!
      </p>

      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-col sm="4" md="2" class="mt-6 py-0 px-1">
            <v-text-field
              :hide-details="true"
              v-model="filtroData"
              :value="dataFormatada"
              label="Filtrar por data"
              class=""
              v-bind="props"
              density="compact"
              color="primary"
              variant="outlined"
              @click="abrirCalendario = true"
              :loading="filtrando"
            >
              <template #prepend-inner>
                <v-icon size="16" color="primary"
                  >mdi-calendar-blank-outline</v-icon
                >
              </template>
            </v-text-field>
          </v-col>
        </template>

        <v-list class="overflow-hidden" style="height: 380px; width: 260px;">
          <v-date-picker
            v-if="abrirCalendario"
            color="blue"
            v-model="filtroData"
            @click="buscarSolicitacoes()"
            header="Selecione uma data"
            class="date-picker-small"
          ></v-date-picker>
        </v-list>
      </v-menu>

      <v-row class="d-flex justify-start align-center mt-4">
        <v-col cols="12" sm="4" class="my-0 py-0 px-1">
          <v-text-field
            :hide-details="true"
            v-model="filtroMedico"
            label="Filtrar por médico"
            class="ma-2"
            density="compact"
            color="primary"
            clearable
            clear-icon="mdi-close-circle"
            @keyup.enter="filtrar(true)"
            @click:clear="filtrar(false)"
            :loading="filtrando"
          >
            <template #prepend-inner>
              <v-icon size="16" color="primary">mdi-stethoscope</v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4" class="my-0 py-0 px-1">
          <v-text-field
            :hide-details="true"
            v-model="filtroPaciente"
            label="Filtrar por paciente"
            class="ma-2"
            density="compact"
            color="primary"
            clearable
            clear-icon="mdi-close-circle"
            @click:clear="filtrar(false)"
            @keyup.enter="filtrar(true)"
            :loading="filtrando"
          >
            <template #prepend-inner>
              <v-icon size="16" color="primary">mdi-account-outline</v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn
            rounded="xl"
            flat
            class="bg-blue text-white font-weight-regular text-none mr-2"
            @click="filtrar(true)"
            >Pesquisar</v-btn
          >
        </v-col>
      </v-row>
      <v-container> </v-container>
    </header>
    <main>
      <TabelaDeSolicitacoesPaginada
        :data="historico"
        :paginacao="historico.paginacao"
      />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useSolicitacoesStore } from "@/store/useStoreSolicitacoes";
import { onBeforeMount, ref, computed } from "vue";
import { useDate } from "vuetify";
import api from "@/services/api";

import TabelaDeSolicitacoes from "@/components/TabelaDeSolicitacoes.vue";
import TabelaDeSolicitacoesPaginada from "@/components/TabelaDeSolicitacoesPaginada.vue";

const storeDeSolicitacoes = useSolicitacoesStore();
const historico = computed(() => storeDeSolicitacoes.getSolicitacoes);

const filtrando = ref(false);
const filtroMedico = ref("");
const filtroPaciente = ref("");
const filtroData = ref(new Date());
const abrirCalendario = ref(false);

onBeforeMount(async () => {
  await buscarSolicitacoes();
});

async function buscarSolicitacoes() {
  const dataISO = filtroData.value.toISOString().split("T")[0];

  const res = await api("get", "./dados_medicos_hoje.json", `${dataISO}`);
  if (abrirCalendario.value) abrirCalendario.value = false;

  storeDeSolicitacoes.setSolicitacoes(res);
}

function filtrar(aplicarFiltro: boolean) {
  if (!aplicarFiltro) return buscarSolicitacoes();

  filtrando.value = true;

  const dadosFiltrados = historico.value.data.filter((item) => {
    const encontrouMedico =
      filtroMedico &&
      item.medico.nome.toLowerCase().includes(filtroMedico.value);
    const encontrouPaciente =
      filtroPaciente &&
      item.paciente.nome.toLowerCase().includes(filtroPaciente.value);

    if (filtroMedico.value && filtroPaciente.value) {
      return encontrouMedico && encontrouPaciente;
    }

    if (filtroMedico) return encontrouMedico;
    if (filtroPaciente) return encontrouPaciente;

    return true;
  });

  storeDeSolicitacoes.setSolicitacoes({
    data: dadosFiltrados,
    paginacao: {
      paginaAtual: 1,
      itensPorPagina: dadosFiltrados.length,
      totalDePaginas: 1,
      totalDeItens: 10,
      next_page_url: "",
      prev_page_url: null,
    },
  });

  setTimeout(() => {
    filtrando.value = false;
  }, 300);
}
const dataFormatada = computed(() => {
  const dia = String(filtroData.value.getDate()).padStart(2, "0");
  const mes = String(filtroData.value.getMonth() + 1).padStart(2, "0");
  const ano = filtroData.value.getFullYear();

  return `${dia}/${mes}/${ano}`;
});
</script>

<style scoped>
@media screen and (max-width: 665px) {
  .logo {
    width: 70px;
  }
}
@media screen and (min-width: 666px) {
  .logo {
    width: 120px;
  }
}

.input {
  border: 1px solid #aab4be;
  border-radius: 5px;
}

.date-picker-small {
  transform: scale(0.8); /* 80% do tamanho original */
  transform-origin: top left; /* garante que encolha a partir do canto */
}
</style>
