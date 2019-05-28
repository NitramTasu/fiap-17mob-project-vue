<template>
  <div class="md-layout md-alignment-top-center card">
    <md-card class="md-layout-item md-size-50 md-small-size-100" style="padding: 10px">
      <md-field>
        <label>Buscar usuário do Github</label>
        <md-input v-model="userNickName"></md-input>
      </md-field>
      <md-button class="md-raised" v-on:click="search">Buscar</md-button>
    </md-card>
    <md-list class="md-double-line">
      <md-list-item v-for="repo in repositories">
        <div class="md-list-item-text">
          <span>{{repo.name}}</span>
          <span>Estrelas:{{repo.stargazers_count}}</span>
          <span>
            <md-button :href="getURL(repo.full_name)" class="md-raised md-primary">Acesse Aqui</md-button>
          </span>
        </div>
      </md-list-item>
    </md-list>
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
      userNickName: "",
      repositories: []
    };
  },
  methods: {
    search() {
      console.log("userNickName " + this.userNickName);
      const baseURI = `https://api.github.com/users/${this.userNickName}/repos`;
      this.$http.get(baseURI).then(
        result => {
          console.log(result);
          this.repositories = result.data;
        },
        erro => {
          console.log(erro.message);
        }
      );
    },
    getURL(full_name) {
      return "https://github.com/" + full_name;
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
.card {
  margin-left: 10px;
  margin-right: 10px;
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
.md-list {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  align-self: center;
  margin-top: 20px;
  border: 1px solid rgba(#000, 0.12);
}
.md-list-item {
  width: 320px;
  max-width: 100%;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, 0.12);
}
.md-list-item-text {
  align-items: center;
}
.md-card {
  align-self: center;
}

.access-link {
  margin-left: 0px;
}
.md-primary {
  text-align: center;
  margin: 20px
}
</style>
