<template>
  <div>
    <h3>Konfiguration Speichern und Abschicken</h3>
    <button @click="saveAsJson()">Konfiguration Lokal Speichern</button>
    <button @click="submit()">Abschicken</button>
  </div>
</template>

<script>
export default {
  computed: {
    completeConfig() {
      let config = this.$store.getters.configFileGetter;
      return config;
    },
  },
  methods: {
    saveAsJson() {
      const data = JSON.stringify(this.completeConfig);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = "config.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
       e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    },
      submit(){
        this.$store.dispatch("submitConfig")
      }
  },

};
</script>

<style>
</style>