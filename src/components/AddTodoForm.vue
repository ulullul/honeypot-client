<template>
  <div class="form-container">
    <md-content class="md-elevation-3">
      <div class="title">
        <md-icon class="md-size-5x md-primary">bookmarks</md-icon>
        <div class="md-title title__text">Create your todo</div>
      </div>

      <form novalidate class="form" @submit.prevent="validateUser">
        <md-field :class="getValidationClass('title')">
          <label>Title</label>
          <md-input v-model="todo.title" autofocus></md-input>
          <span class="md-error" v-if="!$v.todo.title.required"
            >Title is required</span
          >
        </md-field>

        <md-field :class="getValidationClass('body')">
          <label>Description</label>
          <md-textarea v-model="todo.body" md-autogrow></md-textarea>
          <span class="md-error" v-if="!$v.todo.body.required"
            >Description is required</span
          >
        </md-field>

        <md-datepicker
          :class="getValidationClass('event_time')"
          v-model="todo.event_time"
          md-immediately
        >
          <label>Select event date</label>
          <span class="md-error" v-if="!$v.todo.event_time.isRightTime"
            >Wrong date</span
          >
        </md-datepicker>

        <div class="color-container">
          <label class="color__label">Select todo color: </label>
          <input class="color__input" type="color" v-model="todo.colors" />
        </div>
        <div class="public-container">
          <label class="color__label">Public: </label>
          <md-checkbox
            class="color__input md-primary"
            type="checkbox"
            v-model="todo.is_public"
          />
        </div>
        <md-card-actions class="md-layout md-alignment-center actions">
          <md-button type="submit" class="md-raised md-primary"
            >Create todo</md-button
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
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { format, isFuture, parseISO, isToday } from 'date-fns';
import hexToRgb from '@/Utils/hexToRgb';

export default {
  name: 'AddTodoForm',
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      todo: {
        title: '',
        body: '',
        event_time: format(Date.now(), 'yyyy-MM-dd'),
        colors: '#000000',
        is_public: false,
      },
      colors: String,
    };
  },
  methods: {
    reload() {
      this.$router.go(this.$router.currentRoute);
    },
    async addTodo(newTodo) {
      try {
        this.loading = true;
        await this.$api.todos.addTodo(newTodo);
        this.$toasted.success('Note successfully create', {
          icon: 'check_circle',
          duration: 1000,
        });
      } catch (e) {
        this.$toasted.error('Error, please try again', {
          icon: 'error',
          duration: 1000,
        });
      } finally {
        this.loading = false;
      }
    },
    async handleSubmit() {
      let rgbValue = hexToRgb(this.todo.colors);
      const newTodo = {
        title: this.todo.title,
        body: this.todo.body,
        event_time: this.todo.event_time,
        colors: {
          red: rgbValue[0],
          green: rgbValue[1],
          blue: rgbValue[2],
        },
        is_public: this.todo.is_public,
      };
      await this.addTodo(newTodo);
      this.resetForm();
    },
    getValidationClass(fieldName) {
      const field = this.$v.todo[fieldName];

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
    resetForm() {
      this.$v.$reset();
      this.todo = {
        title: '',
        body: '',
        event_time: format(Date.now(), 'yyyy-MM-dd'),
        colors: '#000000',
      };
    },
  },
  validations: {
    todo: {
      title: {
        required,
      },
      body: {
        required,
      },
      event_time: {
        isRightTime: date =>
          isFuture(parseISO(date)) || isToday(parseISO(date)),
      },
      colors: {
        required,
      },
    },
  },
};
</script>

<style lang="scss" scoped>
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

.public-container {
  display: flex;
  align-items: center;
}
</style>
