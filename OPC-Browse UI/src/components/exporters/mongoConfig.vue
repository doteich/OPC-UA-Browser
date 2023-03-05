<template>
    <div>
        <h3>REST API Konfiguration</h3>
        <form>
            <div class="inputClass">
                <label>URL/IP</label>
                <input type="text" v-model="url" placeholder="127.0.0.1" />
            </div>
            <div class="inputClass">
                <label>Port</label>
                <input type="number" v-model="port" placeholder="27017" />
            </div>
            <div class="inputClass">
                <label>Secret Name</label>
                <input type="text" v-model="secretRef" placeholder="mongodb-secret" />
            </div>
            <button @click.prevent="setMongoData()">Bestätigen</button>

        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            url: "",
            port: 27017,
            secretRef: ""
        }
    },
    methods: {
        setMongoData() {
            let payload = {
                url: this.url,
                port: this.port,
                secretRef: this.secretRef
            }
            this.$store.commit("setMongoConfig", payload)
        }
    }
}
</script>
  
<style></style>