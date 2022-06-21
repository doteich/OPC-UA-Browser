<template>
  <div>
    <h3>Konfiguration Überprüfen</h3>
    <textarea v-model="completeConfig" disabled="true"></textarea>
  </div>
</template>

<script>
export default {
    computed:{
        completeConfig(){
            return this.$store.getters
        }
    }
}
</script>

<style>

</style>