<template>
  <div class="d-flex flex-column ma-8 ma-sm-16">
    <header>
      <section class="d-flex flex-row flex-wrap justify-space-between">
        <div>
          <img src="@/assets/logo.svg" alt="Logo Fin-X" class="logo" />
          <p class="text-h5 text-sm-h4 font-weight-medium text-tertiary mt-4">
            Solicitações cirúrgicas
          </p>
          <p class="text-body-2 text-lightGrey mt-1 mb-2">
            Consulte aqui as solicitações feitas para a Fin-X!
          </p>
        </div>

        <div class="d-flex flex-row flex-wrap">
          <CardSolicitacoes :quantidade="qtdSolicitacoesHoje" class="mr-2 mb-2" />
          <CardCirurgias :quantidade="8" class="mr-2 mb-2" />
        </div>
      </section>

      <div class="d-flex justify-start align-center flex-wrap mt-2">
        <p class="mr-2">Filtros:</p>

        <v-menu :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <button v-bind="props" class="d-flex flex-row align-center justify-center data-button mr-2">
              <v-icon size="16" color="darkGrey" class="mr-2">mdi-calendar-blank-outline</v-icon>
              <p class="text-body-2">{{ filtroData ? format.date(filtroData) : 'dd/mm/yyyy' }}</p>
              <v-icon size="16" class="ml-1">mdi-chevron-down</v-icon>
            </button>
          </template>

          <v-list class="overflow-hidden" style="height: 380px; width: 260px;">
            <v-date-picker color="blue" v-model="filtroData" @click="buscarSolicitacoes()" header="Selecione uma data"
              class="date-picker-small"></v-date-picker>
          </v-list>
        </v-menu>

        <div class="d-flex flex-row align-center input pa-1 px-3 my-2 mr-2" style="width: fit-content;">
          <v-icon size="20">mdi-stethoscope</v-icon>
          <span class="text-tertiary font-weight-regular mx-2">Médico:</span>
          <input type="text" v-model="filtroMedico" @keyup.enter="filtrar"></input>
          <button v-if="filtroMedico" @click="filtroMedico = ''; filtrar()">
            <v-icon size="20">mdi-close</v-icon>
          </button>
        </div>

        <div class="d-flex flex-row align-center input pa-1 px-3 mr-2" style="width: fit-content;">
          <v-icon size="20">mdi-account-outline</v-icon>
          <span class="text-tertiary font-weight-regular mx-2">Paciente:</span>
          <input type="text" v-model="filtroPaciente" @keyup.enter="filtrar"></input>
          <button v-if="filtroPaciente" @click="filtroPaciente = ''; filtrar()">
            <v-icon size="20">mdi-close</v-icon>
          </button>
        </div>

        <v-btn rounded="xl" flat class="bg-primary text-white font-weight-regular text-none mt-2" @click="filtrar()">
          Pesquisar
        </v-btn>
      </div>

      <v-container> </v-container>
    </header>
    <main>
      <TabelaDeSolicitacoesVirtual :data="historico" :paginacao="historico.paginacao" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import { useSolicitacoesStore } from "@/store/useStoreSolicitacoes";
import { onBeforeMount, ref, computed } from "vue";
import api from "@/services/api";
import format from "@/utils/format";

const storeDeSolicitacoes = useSolicitacoesStore();
const historico = computed(() => storeDeSolicitacoes.getSolicitacoes);
const qtdSolicitacoesHoje = computed(() => {
  const hojeStr = new Date().toDateString();

  return historico.value.data.filter(item =>
    new Date(item.dataCriacao).toDateString() === hojeStr
  ).length;
});

const filtrando = ref(false);
const filtroMedico = ref("");
const filtroPaciente = ref("");
const filtroData = ref();

onBeforeMount(async () => {
  await buscarSolicitacoes();
});

async function buscarSolicitacoes() {
  const dataISO = filtroData?.value?.toISOString().split("T")[0];

  const res = await api("get", "./dados_medicos.json", `${dataISO ?? ''}`);

  storeDeSolicitacoes.setSolicitacoes(res);
}

async function filtrar() {
  await buscarSolicitacoes();

  filtrando.value = true;

  const dadosFiltrados = historico.value.data.filter((item) => {
    const encontrouMedico =
      filtroMedico &&
      item.medico.nome.toLowerCase().includes(filtroMedico.value.toLowerCase());
    const encontrouPaciente =
      filtroPaciente &&
      item.paciente.nome.toLowerCase().includes(filtroPaciente.value.toLowerCase());

    if (filtroMedico.value && filtroPaciente.value) {
      return encontrouMedico && encontrouPaciente;
    }

    if (filtroMedico.value) return encontrouMedico;
    if (filtroPaciente.value) return encontrouPaciente;

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
  height: 33px;
  border: 1px solid #90DBFA;
  color: rgb(77, 77, 77);
  border-radius: 25px;
  caret-color: #00A5EA;
}

input {
  color: #00A5EA;
}

input:focus {
  outline: none;
}

.date-picker-small {
  transform: scale(0.8);
  /* 80% do tamanho original */
  transform-origin: top left;
  /* garante que encolha a partir do canto */
}

.data-button {
  height: 33px;
  min-width: 145px;
  border-radius: 25px;
  color: #525252;
  background-color: #F0F1F3;
}
</style>
