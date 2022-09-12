<template>
  <div>
    <h3>OPC UA Endpunkt Konfiguration</h3>
    <form>
      <div class="inputClass">
        <label>OPC Endpunkt</label>
        <input placeholder="opc.tcp://IP:port" v-model="url" />
      </div>
      <div class="inputClass">
        <label>Sicherheitsrichtlinie</label>
        <select v-model="securityPolicy">
          <option>None</option>
          <option>Basic256Sha256</option>
          <option>Basic256</option>
          <option>Basic128Rsa15</option>
        </select>
      </div>
      <div class="inputClass">
        <label>Sicherheitsmodus</label>
        <select v-model="securityMode">
          <option>None</option>
          <option>Sign</option>
          <option>SignAndEncrypt</option>
        </select>
      </div>
      <div class="inputGroup">
        <h4 v-if="authType==='User & Password'">Auth</h4>
      <div>
        <div class="inputClass">
          <label>Authentifizierung</label>
          <select v-model="authType">
            <option>Anonymous</option>
            <option>User & Password</option>
          </select>
        </div>
          <div class="inputClass" v-if="authType==='User & Password'">
            <label>Username</label>
            <input v-model="username" />
          </div>

          <div class="inputClass" v-if="authType==='User & Password'">
            <label>Passwort</label>
            <input type="password" v-model="password"/>
          </div>
        </div>
      </div>

      <button @click.prevent="connectToOPC()">Verbinden</button>
    </form>
    <p class="error" v-if="error"><i  class="bi bi-exclamation-diamond"></i>{{error}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: null,
      securityPolicy: "None",
      securityMode: "None",
      authType: "Anonymous",
      username: null,
      password: null,
      node:"RootFolder"
    };
  },
  computed:{
    error(){
      return this.$store.getters.getConfigError
    }
  },
  methods: {
    connectToOPC() {
      let payload = {
        url: this.url,
        securityPolicy: this.securityPolicy,
        securityMode: this.securityMode,
        authType:this.authType,
        username:this.username,
        password: this.password,
        node:this.node

      };

      this.$store.dispatch("browse", payload);
    },
  },
};
</script>


<style scoped>

.error{
  border-radius: 5px;
  border: 1px solid white;
  width: 50%;
  margin-left: 1%;
  
  background: rgba(139, 8, 8, 0.76);
  color:white;
}

</style>