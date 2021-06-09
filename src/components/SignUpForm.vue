<template>
  <md-empty-state
    v-if="error"
    md-icon="error"
    class="md-accent"
    md-label="Error"
    :md-description="`Error: ${error}`"
  >
    <md-button class="md-primary md-raised" @click="reload"
      >Reload and try again</md-button
    >
  </md-empty-state>
  <div v-else class="form-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <md-icon class="md-size-5x md-primary">how_to_reg</md-icon>
        <div class="md-title title__text">Sign up</div>
      </div>

      <form novalidate class="form" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('username')">
          <label>Username</label>
          <md-input v-model="user.username" autofocus></md-input>
          <span class="md-error" v-if="!$v.user.username.required"
            >Username is required</span
          >
        </md-field>

        <md-field :class="getValidationClass('password')">
          <label>Password</label>
          <md-input
            type="password"
            v-model="user.password"
            md-autogrow
          ></md-input>
          <span class="md-error" v-if="!$v.user.password.required"
            >Password is required</span
          >
        </md-field>

        <md-card-actions class="md-layout md-alignment-center actions">
          <md-button type="submit" class="md-raised md-primary"
            >Sign up</md-button
          >
        </md-card-actions>
      </form>
      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner
          md-mode="indeterminate"
          :md-stroke="2"
        ></md-progress-spinner>
      </div>
    </md-content>
    <div style="margin-top: 20px">
      Already have an account? <router-link to="/sign-in">Sign in</router-link>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate/src';
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
  name: 'SignUpForm',
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      error: false,
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions('Auth', ['setToken']),
    getValidationClass(fieldName) {
      const field = this.$v.user[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.handleSubmit();
      }
    },
    async handleSubmit() {
      try {
        await this.$api.user.signUp(this.user);
        this.$toasted.success('User successfully created', {
          icon: 'check_circle',
          duration: 1000,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  validations: {
    user: {
      username: {
        required,
      },
      password: {
        required,
      },
    },
  },
};
</script>

<style scoped lang="scss">
.color {
  &-container {
    min-height: 48px;
    margin: 4px 0;
    padding-top: 16px;
  }

  &__label {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.54);
  }

  &__input {
    margin-left: 20px;
  }
}

.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  .title {
    text-align: center;
    margin-bottom: 10px;
    &__text {
      margin-top: 20px;
    }
  }
  .actions {
    margin-top: 20px;
    .md-button {
      margin: 0;
    }
  }

  .md-content {
    z-index: 1;
    padding: 40px 40px 15px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }

  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
