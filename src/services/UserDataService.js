import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return http.post("/users", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }
  findUser(name) {
    return http.get(`/users?name=${name}`);
  }
  login(data) {
    return http.post(`/users/login`, data);
  }
  confirmPassword(data) {
    return http.post(`/users/confirmpass`, data);
  }

}

export default new UserDataService();
