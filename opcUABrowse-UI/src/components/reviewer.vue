<template>
  <div>
    <h3>Konfiguration Überprüfen</h3>
    <p>{{completeConfig}}</p>
  </div>
</template>

<script>
export default {
    computed:{
        completeConfig(){
            let config = this.$store.getters.configFileGetter
            return config
        }
    }
}
</script>

<style>

</style>