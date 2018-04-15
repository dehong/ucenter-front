import { query as queryUsers,loadUser, removeUser, addRule, queryCurrent } from '../services/user';
import {message } from "antd";
export default {
  namespace: 'user',

  state: {
    currentUser: {},
    data: {
      list: [],
      pagination: {},
    },
    formData:{},
  },

  effects: {
    *fetch({ payload }, { call, put }){
      const response = yield call(queryUsers,payload);
      console.info("response",response);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      console.info("add...",response);
      yield put({
        type: 'save',
        payload: response.data,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeUser, payload);
      console.info("debug:remove response",response);
      var result = JSON.parse(response);
      if(result && result.success){
        message.success("删除成功！");
      }
      if (callback) callback();
    },

    *load({ payload, callback }, { call, put }) {
      console.info("loadUserloadUserloadUserloadUser");
      const response = yield call(loadUser, payload);
      console.info("response",response);
      yield put({
        type: 'loadUser',
        payload: response.data,
      });
      if (callback) callback();
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    loadUser(state, action) {
      return {
        ...state,
        formData: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
