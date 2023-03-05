<template>
    <div>
        <h3>Exporter Auswahl</h3>
        <div class="exporterConfig ">
            <div class="exporter" :class="[enabledExporters.rest ? 'enabled' : 'disabled', 'exporter']"
                @click="selectExporter('rest')">
                <img src="../assets/rest.png">
                <label>HTTP/REST</label>
            </div>
            <div class="exporter" :class="[enabledExporters.prometheus ? 'enabled' : 'disabled', 'exporter']"
                @click="selectExporter('prometheus')">
                <img src="../assets/prom.svg">
                <label>Prometheus</label>
            </div>

            <div class="exporter" :class="[enabledExporters.websockets ? 'enabled' : 'disabled', 'exporter']"
                @click="selectExporter('websockets')">
                <img src="../assets/ws.png">
                <label>Websockets</label>
            </div>

            <div class="exporter" :class="[enabledExporters.mongodb ? 'enabled' : 'disabled', 'exporter']"
                @click="selectExporter('mongodb')">
                <img src="../assets/mongo.svg">
                <label>MongoDB</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            enabledExporters: {
                rest: false,
                prometheus: false,
                websockets: false, 
                mongodb: false
            }
        };
    },
    methods: {
        selectExporter(name) {
            let payload = {
                name,
                value: false
            }

            if (!this.enabledExporters[name]) {
                this.enabledExporters[name] = true
                payload.value = true


            } else {
                this.enabledExporters[name] = false
            }

            this.$store.commit("setExporters", payload)
        }
    },
};
</script>

<style scoped>
.exporterConfig {
    display: flex;
}

.exporter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    width: 150px;
    padding: 10px;
    cursor: pointer;
}

.enabled {
    border: 3px solid rgb(38, 38, 97);
    background: rgb(41, 40, 44);

}

.disabled {
    border: 1px solid grey;
}


.exporter:hover {
    background: rgb(41, 40, 44);
}

.exporter img {
    width: 100px;
}

.exporter label {
    color: white;
    font-size: 17px;
    margin-top: auto;
}
</style>