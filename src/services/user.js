import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/api/users?${stringify(params)}`);
}

export async function loadUser(id) {
  return request(`/api/user/${id}`);
}

export async function removeUser(params) {
  return request(`/api/user/${params}`, {
    method: 'DELETE',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  console.info("params",params);
  return request('/api/user', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
