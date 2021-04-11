import { http } from '../utils/http';

export const rolesService = {
  async get(query?: string) {
    return http.get('/api/roles');
  },
  getOne(id: string) {},
  create() {},
  update(id: string) {},
  delete(id: string) {},
};
