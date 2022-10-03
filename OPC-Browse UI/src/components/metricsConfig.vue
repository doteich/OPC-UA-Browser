
<template>
    <div>
        <h3>Metrics Konfiguration</h3>

        <div class="nameDisplay" v-for="tag in getTags" :key="tag.nodeId">
            <div class="nodeLabel">
                <label>NodeId</label>
                <p>{{ tag.nodeId }}</p>
            </div>
            <div class="nodeLabel">
                <label>Name</label>
                <p>{{ tag.name }}</p>
            </div>
            <div class="nodeLabel">
                <label>Datentyp</label>
                <p>{{ tag.dataType }}</p>
            </div>
            <div class="nodeLabel">
                <label>Aktueller Wert</label>
                <p>{{ tag.currentValue }}</p>
            </div>
            <div class="horizontalInput">
                <label>Metrics Typ</label>
                <select @change="updateMetricsType(tag, $event.target.value)">
                    <option selected>Counter</option>
                    <option>Gauge</option>
                </select>
            </div>
        </div>
        <p class="info">
            <i class="bi bi-info-circle"></i>Nur numerische Datentypen werden als Metric unterstützt
        </p>
        <button @click.prevent="displayNextComp('reviewer')">
            Bestätigen
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tags: null,
        };
    },

    computed: {
        getTags() {
            let tags = this.$store.getters.getSelectedTags

            let metricTags = tags.filter((tag) => { return tag.dataTypeId < 12 })

            return metricTags;
        },
    },
    methods: {
        updateMetricsType(tag, type) {
           tag.metricsType = type
           this.$store.commit("updateMetricsType", tag)
        },
        displayNextComp(component) {
            this.$store.commit("enableMetrics")
            this.$store.commit("displayComponent", component);
        },
    },

};
</script>