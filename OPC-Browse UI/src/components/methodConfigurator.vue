<template>
  <div>
    <h3>Methoden Konfiguration</h3>
    <form>
      <div class="inputClass">
        <label>Subscription Interval (in Sekunden)</label>
        <input type="number" v-model="subInterval" />
      </div>
      <div class="inputClass">
        <label>Name</label>
        <input type="text" v-model="name" />
      </div>
      <div class="inputClass">
        <label>Secret Name</label>
        <input type="text" v-model="secretRef" />
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
      secretRef: "", 
      description: null,

    };
  },
  methods: {
    setMethodData() {
      let payload = {
        subInterval: this.subInterval,
        name: this.name,
        description: this.description,
        secretRef: this.secretRef
      };

      this.$store.commit("setMethodConfig", payload);
      this.$store.commit("displayComponent", "reviewer");
    },
  },
};
</script>

<style>
.checkbox {
  width: 20px;
  height: 20px;
  margin: 1vh
}
</style>