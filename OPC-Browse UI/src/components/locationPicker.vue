<template>
  <div>
    <h3>Auswahl der Location</h3>
    <div>
      <select>
        <option>BNP Rheine</option>
        <option>Kepware Simulation</option>
      </select>
      <button @click="displayNextComp('opcConfigurator')">Bestätigen</button>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    displayNextComp(component){
      this.$store.commit("displayComponent",component)
    }
  }
};
</script>

<style>
</style>