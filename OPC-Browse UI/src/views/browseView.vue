<template>
  <article class="browser">
    <section>
      <h2>1</h2>
      <opc-configurator class="component"></opc-configurator>
    </section>
    <section v-if="displayedComponents.tagPicker">
      <h2>2</h2>
      <tag-picker class="component"></tag-picker>
    </section>
    <section v-if="displayedComponents.nameConfig">
      <h2>3</h2>
      <name-config class="component"></name-config>
    </section>
    <section v-if="displayedComponents.methodConfigurator">
      <h2>4</h2>
      <method-configurator class="component"></method-configurator>
    </section>
    <section v-if="displayedComponents.methodConfigurator">
      <h2>5</h2>
      <exporter-config class="component"></exporter-config>
    </section>
    <section v-if="selectedExporters.rest.enabled">
      <h2> <img src="../assets/rest.png"></h2>
      <rest-config class="component"></rest-config>
    </section>
    <section v-if="selectedExporters.prometheus.enabled">
      <h2> <img src="../assets/prom.svg"></h2>
      <prom-config class="component"></prom-config>
    </section>

    <section v-if="selectedExporters.mongodb.enabled">
      <h2> <img src="../assets/mongo.svg"></h2>
      <mongo-config class="component"></mongo-config>
    </section>

    <section v-if="displayedComponents.reviewer">
      <h2>5</h2>
      <reviewer class="component"></reviewer>
    </section>
  </article>
</template>

<script>
//import locationPicker from "../components/locationPicker.vue";
import OpcConfigurator from "../components/opcConfigurator.vue";
import tagPicker from "../components/tagPicker.vue";
import methodConfigurator from "../components/methodConfigurator.vue";
import nameConfig from "../components/nameConfig.vue";
import promConfig from "../components/exporters/promConfig.vue"
import exporterConfig from "../components/exporterConfig.vue"
import restConfig from "../components/exporters/restConfig.vue"
import mongoConfig from "../components/exporters/mongoConfig.vue"

import Reviewer from "../components/reviewer.vue";

export default {
  components: {
    //locationPicker,
    nameConfig,
    OpcConfigurator,
    tagPicker,
    methodConfigurator,
    Reviewer,
    promConfig,
    exporterConfig,
    restConfig,
    mongoConfig
  },
  computed: {
    displayedComponents() {
      return this.$store.getters.displayedComponentsGetter;
    },
    selectedExporters() {
      return this.$store.getters.getExporters
    }
  },
};
</script>

<style>
.browser {
  display: flex;
  flex-direction: column;
}

section {
  display: flex;
  margin: 1%;
  align-items: center;
  padding: 1vmin;
  box-shadow: -1px 3px 9px -1px #000000;
}

section h2 {
  background: rgb(38, 38, 97);
  margin-left: 1%;
  padding: 20px 20px;
  color: white;
  font-size: 1.7rem;
  margin-right: 2%;
}

section h3 {
  border-bottom: 1px solid white;
}

.component {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation-name: slidein;
  animation-duration: 1s;
}

.component>* {
  margin-bottom: 1%;
}

.component>*>* {
  margin: 1%;
}

.component>form {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
}

@keyframes slidein {
  from {
    opacity: 0%;
  }

  to {
    opacity: 100%;
  }
}

h2 img {
  width: 50px;
}
</style>