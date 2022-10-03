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
        <label>HTTP Endpunkt</label>
        <input type="text" v-model="targetURL" placeholder="https://URL" />
      </div>
      <div class="inputClass">

        <label>Als Metrics-Endpunkt Bereitstellen (Prometheus)</label>

        <input type="checkbox" class="checkbox" value="metrics" v-model="metrics">
      </div>
      <div class="inputClass">
        <label>On Error Backup</label>
        <input type="checkbox" class="checkbox" value="backup" v-model="backup">
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
      targetURL: "https://",
      description: null,
      metrics: false,
      backup: false,

    };
  },
  methods: {
    setMethodData() {
      let payload = {
        subInterval: this.subInterval,
        name: this.name,
        targetURL: this.targetURL,
        metricsEnabled: this.metrics,
        backup: this.backup,
        description: this.description,
      };

      this.$store.commit("setMethodConfig", payload);
      if (this.metrics) {
        this.$store.commit("displayComponent", "metricsConfigurator")
      } else {
        this.$store.commit("displayComponent", "reviewer");
      }
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