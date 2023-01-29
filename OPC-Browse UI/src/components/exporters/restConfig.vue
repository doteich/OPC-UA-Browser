<template>
  <div>
    <h3>REST API Konfiguration</h3>
    <form>
      <div class="inputClass">
        <label>HTTP Endpunkt</label>
        <input type="text" v-model="targetURL" placeholder="https://URL" />
      </div>
      <button @click.prevent="setRestData()">Bestätigen</button>

    </form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            targetURL:  "https://"
        }
    },
    methods:{
        setRestData(){
            this.$store.commit("setRestConfig", this.targetURL)
        }
    }
}
</script>

<style>

</style>