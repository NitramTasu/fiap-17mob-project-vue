<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <button v-on:click="logout" to="/login">Logout</button>
    </div>
    <router-view/>
  </div>
</template>
<script>
import firebase from "firebase";
import { Script } from "vm";

export default {
  name: "app",
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a,
button {
  font-weight: bold;
  color: #2c3e50;
}

button {
  background: none;
  border: none;
  padding: 0px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
