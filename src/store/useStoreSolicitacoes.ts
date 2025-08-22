import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSolicitacoesStore = defineStore('solicitacoes', () => {
  const config = ref({
    solicitacoes: []
  })

  const getSolicitacoes = computed(() => config.value.solicitacoes);

  function setSolicitacoes(data: any) {
    config.value.solicitacoes = data;
  }

  return { getSolicitacoes, setSolicitacoes }
})