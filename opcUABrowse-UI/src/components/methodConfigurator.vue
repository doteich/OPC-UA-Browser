<template>
  <div>
    <h3>Methoden Konfiguration</h3>
    <form>
      <div class="inputClass">
        <label>Subscription Interval (in Sekunden)</label>
        <input type="number" v-model="subInterval"/>
      </div>
      <div class="inputClass">
        <label>Name</label>
        <input type="text" v-model="name"/>
      </div>
      <div class="inputClass">
        <label>Beschreibung</label>
        <textarea v-model="description"></textarea>
      </div>
      <button @click.prevent="setMethodData()">Bestätigen</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      subInterval: 10,
      name: null,
      description: null,
    };
  },
  methods:{
    setMethodData(){
      let payload = {
        subInterval : this.subInterval,
        name: this.name,
        description: this.description
      }
      this.$store.commit("setMethodConfig",payload)
    }
  }
};
</script>

<style>
</style>