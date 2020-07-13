import http from "../http-common";

class CommentDataService {
  getAll(postId) {
    return http.get(`/Comments/${postId}`);
  }

  get(id) {
    return http.get(`/Comments/${id}`);
  }

  create(data) {
    return http.post("/Comments", data);
  }

  update(id, data) {
    return http.put(`/Comments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Comments/${id}`);
  }

  deleteAll() {
    return http.delete(`/Comments`);
  }

}

export default new CommentDataService();
