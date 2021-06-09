<template>
  <div class="grid-item todo" :style="cardStyle">
    <div
      class="todo__color-label"
      :style="{
        backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
      }"
    ></div>
    <router-link v-if="id && clickable" :to="{ path: `/todo/${id}` }"
      ><md-toolbar :md-elevation="1">
        <p class="md-title todo__title">{{ title }}</p>
      </md-toolbar>
    </router-link>
    <md-toolbar v-else :md-elevation="1">
      <p class="md-title todo__title">{{ title }}</p>
    </md-toolbar>
    <p class="md-body-2 todo__body" :style="bodyStyle">
      {{ body }}
    </p>
    <md-divider></md-divider>
    <p class="md-caption todo__time">
      <span class="todo__time__event"
        >Event time: {{ formatDate(event_time) }}</span
      >
      <br />
      <span class="todo__time__creation"
        >Creation time: {{ formatDate(created_at) }}</span
      >
      <br />
      <span v-if="user && user.username" class="todo__time__creation"
        >Created by: {{ user.username }}</span
      >
    </p>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'TodoItem',
  props: {
    id: Number,
    title: String,
    body: String,
    event_time: String,
    created_at: String,
    color: Object,
    clickable: Boolean,
    user: Object,
  },
  data() {
    return {
      bodyStyle: {
        textOverflow: this.id ? 'ellipsis' : '',
        overflow: this.id ? 'hidden' : '',
        whiteSpace: this.id ? 'nowrap' : '',
      },
      cardStyle: {
        maxWidth: this.id ? '' : '600px',
        margin: this.id ? '' : '0 auto',
      },
    };
  },
  methods: {
    formatDate(date) {
      return format(Date.parse(date), 'yyyy-MM-dd');
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  border-radius: 8px;
  border: 1px solid rgba(74, 74, 74, 0.3);
  overflow: hidden;

  &__title {
    padding-right: 20px;
  }

  &__body {
    text-align: left;
    padding: 0 5px;
  }

  &__time {
    padding: 0 5px;
    &__event {
      color: #015f01;
    }
  }

  &__color-label {
    padding: 0.625rem 2.325rem;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(27%, 45%) rotate(45deg);
    pointer-events: none;
    font-size: 1.25rem;
    text-align: center;
    z-index: 3;
  }
}
</style>
