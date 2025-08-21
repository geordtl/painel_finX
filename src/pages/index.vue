<template>
  <div class="d-flex flex-column ma-8 ma-sm-16">
    <header>
      <img src="@/assets/logo.svg" alt="" width="72" />
      <p class="text-h5 text-sm-h4 font-weight-medium text-tertiary mt-4">
        Solicitações cirúrgicas
      </p>
      <p class="text-body-2 text-lightGrey mt-1 mb-2">
        Consulte aqui as solicitações cirúrgicas feitas para a Fin-X!
      </p>

      <v-row class="d-flex justify-start align-center my-4">
        <v-col cols="12" sm="2" class="my-0 py-0 px-1">
          <v-text-field
            :hide-details="true"
            v-model="filtroMedico"
            label="Filtrar por médico"
            class="ma-2"
            density="compact"
            color="primary"
          >
            <template #prepend-inner>
              <v-icon size="16" color="primary">mdi-stethoscope</v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="2" class="my-0 py-0 px-1">
          <v-text-field
            :hide-details="true"
            v-model="filtroPaciente"
            label="Filtrar por paciente"
            class="ma-2"
            density="compact"
            color="primary"
          >
            <template #prepend-inner>
              <v-icon size="16" color="primary">mdi-account-outline</v-icon>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
          <v-btn
            variant="outlined"
            rounded="xl"
            class="text-blue font-weight-regular text-none mr-2"
            @click="dadosFiltrados(true)"
            >Pesquisar</v-btn
          >
        </v-col>
      </v-row>

      <!-- <input type="text" class="input" v-model="search"> -->
      <!-- <v-row class="d-flex align-center mx-1 my-2" v-if="filtrando">
         <p class="text-body-2 text-tertiary mr-2">Filtros:</p>
   
         <v-chip v-if="filtroMedico" variant="outlined" color="blue" class="mr-2" >
           <img src="@/assets/estetoscopio.svg" alt="" />
           <span class="text-tertiary font-weight-medium ml-1">Médico:</span>
           <span class="text-lightGrey ml-1">{{ filtroMedico }}</span>
         </v-chip>
   
         <v-chip v-if="filtroPaciente" variant="outlined" color="blue">
           <img src="@/assets/estetoscopio.svg" alt="" />
           <span class="text-tertiary font-weight-medium ml-1">Paciente:</span>
           <span class="text-lightGrey ml-1">{{ filtroPaciente }}</span>
         </v-chip>
       </v-row> -->
    </header>
    <main class="mt-2">
      <TabelaDeSolicitacoesPaginada :data="dadosFiltrados(filtrando)" :paginacao="historico.paginacao" />
    </main>
  </div>
</template>

<script lang="ts" setup>
import TabelaDeSolicitacoes from "@/components/TabelaDeSolicitacoes.vue";
import { onBeforeMount, ref } from "vue";
import api from "@/services/api";

import { shallowRef, computed } from "vue";
import { useDate } from "vuetify";
import { useSolicitacoesStore } from "@/store/useStoreSolicitacoes";
import TabelaDeSolicitacoesPaginada from "@/components/TabelaDeSolicitacoesPaginada.vue";

const storeDeSolicitacoes = useSolicitacoesStore();
const historico = computed(() => storeDeSolicitacoes.getSolicitacoes);
const adapter = useDate();
const model = shallowRef(adapter.parseISO("2025-02-25"));

function format(date) {
  return adapter.toISO(date);
}

const data = ref({});
const search = ref("");
const filtrando = ref(false);
const filtroMedico = ref("");
const filtroPaciente = ref("");

onBeforeMount(async () => {
  await buscarSolicitacoes();
});

async function buscarSolicitacoes() {
  const res = await api("get", "./dados_medicos_hoje.json", "2025-08-21");

  console.log(res);
  
  storeDeSolicitacoes.setSolicitacoes(res);
}

function dadosFiltrados(filtrar: boolean) {
  if (!filtrar) return historico.value;

  historico.value.filter((item) => {
    filtrando.value = true;
    console.log(item);
    
    return (
      item.medico.nome.includes(filtroMedico.value) ||
      item.paciente.nome.includes(filtroPaciente.value)
    );
  });
}
</script>

<style scoped>
.input {
  border: 1px solid #aab4be;
  border-radius: 5px;
}
</style>
