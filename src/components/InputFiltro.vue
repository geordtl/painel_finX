<template>
     <div class="d-flex flex-row align-center input pa-1 px-3 my-2 mr-2" style="width: fit-content;">
          <v-icon size="20">{{ props.icon}}</v-icon>
          <span class="text-tertiary font-weight-regular mx-2">{{props.nome}}:</span>
          <input type="text" v-model="filtro" @keyup.enter="emit('filtrar', filtro)"></input>
          <button @click="filtro = ''; emit('clear')">
            <v-icon size="20">mdi-close</v-icon>
          </button>
        </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['filtrar', 'clear'])
const props = defineProps<{
    nome: string;
    icon: string;
}>();

const filtro = ref('');
</script>

<style scoped>
input {
  color: #00A5EA;
}

input:focus {
  outline: none;
}
</style>