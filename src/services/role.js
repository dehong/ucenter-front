import { stringify } from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/api/roles?${stringify(params)}`);
}

export async function addRole(params) {
    return request('/api/role', {
      method: 'POST',
      body: {
        ...params,
      },
    });
  }