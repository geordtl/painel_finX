<template>
    <div class="d-flex flex-row w-100" style="height: 100vh;" >
        <section class="d-flex flex-column justify-center align-center" :class="isDesktop ? 'w-50' : 'w-100'">
            <img v-if="!isDesktop" src="@/assets/darkLogo.svg" width="100" alt="Logo da fin-X no modo dark" class="mb-12" />

            <div class="d-flex flex-column">
                <p class="text-tertiary font-weight-bold text-h5 text-md-h4 mb-4">Faça o login</p>
        
                <p>Usuário</p>
                <input type="text" class="mb-3">
        
                <p>Senha</p>
                <input type="text">
    
                <v-btn color="primary" flat class="rounded-lg w-100 mt-6" style="height: 45px;" @click="router.replace('/')">Entrar</v-btn>
            </div>
        </section>
        <section v-if="isDesktop" class="bg-primary w-50">
            <div class="position-absolute"  style="top: 25%; right: 15%; width: 20%;">
                <p class="text-h4 font-weight-medium mb-6">Bem-vindo(a) ao painel da</p>
                <v-img src="@/assets/darkLogo.svg" height="100px" alt="Logo da fin-X no modo dark"></v-img>
            </div>
            <v-img src="@/assets/doctor.jpg" alt="Imagem de um doutor analisando uma ficha" height="100%" cover class="opacity-20 w-100"></v-img>
        </section>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { computed } from 'vue';

const isDesktop = computed(() => window.innerWidth > 400);

</script>

<style scoped>
input {
    border: 1px solid rgb(153, 153, 153);
    border-radius: 5px;
    height: 32px;
    width: 250px;
}

</style>