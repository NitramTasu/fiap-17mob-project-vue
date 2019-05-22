<template>
  <div>
    <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Users</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="form.email"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required">Campo E-mail obrigatório</span>
            <span class="md-error" v-else-if="!$v.form.email.email">E-mail inválido</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Senha</label>
            <md-input
              type="password"
              name="password"
              id="password"
              v-model="form.password"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.email.required">Campo senha obrigatório</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Senha inválida</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Logar</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar
        :md-active.sync="userLogged"
      >Usuário {{ $v.form.email.email }} logado com sucesso!!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import firebase from "firebase";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
import { debug } from "util";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      password: null,
      email: null
    },
    userLogged: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      password: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();

      this.form.password = null;
      this.form.email = null;
    },
    saveUser() {
      this.sending = true;
      var self = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(firebaseUser => {
          self.userLogged = true;
          self.sending = false;
          this.clearForm();
          console.log("Logado com sucesso");
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
