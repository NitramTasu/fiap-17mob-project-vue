<template>
  <div>
    <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Usuário</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">Primeiro Nome</label>
                <md-input
                  name="first-name"
                  id="first-name"
                  autocomplete="given-name"
                  v-model="form.firstName"
                  :disabled="sending"
                />
                <span
                  class="md-error"
                  v-if="!$v.form.firstName.required"
                >O primeiro nome é obrigatório</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Nome inválido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Sobrenome</label>
                <md-input
                  name="last-name"
                  id="last-name"
                  autocomplete="family-name"
                  v-model="form.lastName"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.lastName.required">O sobrenome é obrigatório</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Sobrenome inválido</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('gender')">
                <label for="gender">Sexo</label>
                <md-select
                  name="gender"
                  id="gender"
                  v-model="form.gender"
                  md-dense
                  :disabled="sending"
                >
                  <md-option></md-option>
                  <md-option value="M">Masculino</md-option>
                  <md-option value="F">Feminino</md-option>
                </md-select>
                <span class="md-error">Sexo obrigatório</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('age')">
                <label for="age">Idade</label>
                <md-input
                  type="number"
                  id="age"
                  name="age"
                  autocomplete="age"
                  v-model="form.age"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.age.required">Idade é obrigatória</span>
                <span class="md-error" v-else-if="!$v.form.age.maxlength">Idade inválida</span>
              </md-field>
            </div>
          </div>

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
            <span class="md-error" v-if="!$v.form.email.required">Email obrigatório</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Email inválido</span>
          </md-field>
        </md-card-content>

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

        <md-progress-bar md-mode="indeterminate" v-if="sending"/>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Cadastrar</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">Usuário {{ lastUser }} cadastrado com sucesso!</md-snackbar>
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

export default {
  name: "signup",
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      gender: null,
      age: null,
      password: null,
      email: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      age: {
        required,
        maxLength: maxLength(3)
      },
      gender: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required
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
      this.form.firstName = null;
      this.form.lastName = null;
      this.form.age = null;
      this.form.gender = null;
      this.form.email = null;
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(
          user => {
            alert("Sua conta foi criada!!");
          },
          error => {
            alert("Algo deu errado: " + error.message);
          }
        );

      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
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