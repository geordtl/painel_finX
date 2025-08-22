<template>
    <v-card class="gradient elevation-0 text-white rounded-xl card pa-4" style="height: 130px; width: 160px;">
        <p class="font-weight-medium text-tertiary">Cirurgias para hoje:</p>
        <p class="font-weight-bold text-tertiary text-h6 mt-1">+ {{ quantidade }}</p>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{
    quantidade: number;
}>()
</script>

<style scoped>
.card {
    border: 1px solid #1E3247;
}
</style>