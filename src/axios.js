import axios from 'axios';
import store from './store/index';
// import router from './router';

class Api {
  constructor() {
    let service = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
      withCredentials: false,
    });
    service.interceptors.request.use(Api.setHeaderToken);
    service.interceptors.response.use(Api.handleSuccess, Api.handleError);
    this.service = service;
  }

  static handleSuccess(response) {
    return response;
  }

  static handleError(error) {
    /*if (error.response.status === 401) {
      store.dispatch('auth/logout');
      if (router.currentRoute.name !== 'login') router.push('/login');
    }*/
    return Promise.reject(error);
  }

  static setHeaderToken(config) {
    const token = store.getters['Auth/token'];
    config.headers.auth = token;
    return config;
  }

  get(path, payload = {}) {
    return this.service.get(path, {
      params: payload,
    });
  }

  rawPatch(path, payload) {
    if (payload instanceof FormData) {
      payload.set('_method', 'PATCH');
    } else {
      payload['_method'] = 'PATCH';
    }
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload,
    });
  }

  patch(path, payload) {
    return this.service.request({
      method: 'PATCH',
      url: path,
      responseType: 'json',
      data: payload,
    });
  }

  parsePayload(payload) {
    this.formData = new FormData();
    for (const key in payload) {
      const value = payload[key];
      this.parseData(key, value);
    }
    return this.formData;
  }

  parseData(key, value) {
    switch (true) {
      case typeof value === 'string' ||
        typeof value === 'number' ||
        value instanceof File:
        this.parseStringNumberFile(key, value);
        break;
      case Array.isArray(value):
        this.parseArray(key, value);
        break;
      case typeof value === 'boolean':
        this.parseBoolean(key, value);
        break;
      case typeof value === 'object':
        this.parseObject(key, value);
        break;
    }
  }

  parseBoolean(key, value) {
    const bool = value ? 1 : 0;
    this.formData.append(key, bool);
  }

  parseArray(key, value) {
    if (value.length === 0) return;
    for (let i = 0; i < value.length; i++) {
      let newI = `[${i}]`;
      this.parseData(key + newI, value[i]);
    }
  }

  parseObject(key, value) {
    for (let subKey in value) {
      let newSubKey = `[${subKey}]`;
      this.parseData(key + newSubKey, value[subKey]);
    }
  }

  parseStringNumberFile(key, value) {
    this.formData.append(key, value);
  }

  parseFile(key, value) {
    this.formData.append(key, value);
  }

  post(path, payload) {
    // payload = this.parsePayload(payload);
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      /*withCredentials: true,*/
      data: payload,
    });
  }

  rawPost(path, payload) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: payload,
    });
  }

  delete(path, payload) {
    return this.service.request({
      method: 'DELETE',
      url: path,
      responseType: 'json',
      data: payload,
    });
  }
}

export default new Api();
