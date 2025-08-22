<template>
    <v-card class="gradient elevation-0 text-white rounded-xl pa-6" style="height: fit-content; width: 300px;">
        <p class="font-weight-medium">Total de solicitações <br></br>hoje:</p>
        <p class="font-weight-black text-h4 text-sm-h2 mt-2">+ {{ quantidade ?? 0 }}</p>
        <p style="font-size: 10px">*Considere os filtros aplicados</p>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    quantidade: number;
}>()
</script>

<style scoped>
.gradient {
    background-image: linear-gradient(to top, #089BD0,#B0F2DF);
}
</style>