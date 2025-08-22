<template>
    <v-card class="gradient elevation-0 text-white rounded-xl card pa-4 w-100 w-sm-25" style="height: fit-content;">
        <p class="font-weight-medium text-tertiary text-subtitle-1 ">Cirurgias para hoje: +8</p>
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