<template>
  <div class="search">
    <div class="md-layout md-alignment-top-center card">
      <md-card class="md-layout-item md-size-50 md-small-size-100" style="padding: 10px">
        <md-field>
          <label>Buscar usuário do Github</label>
          <md-input v-model="userNickName"></md-input>
        </md-field>
        <md-button class="md-raised">Buscar</md-button>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    msg: String
  },
  data: function() {
    return {
      userNickName: ""
    };
  },
  methods: {
    search() {
      console.log("userNickName " + userNickName);
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
.card{
    margin-left: 10px ;
    margin-right: 10px ;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
