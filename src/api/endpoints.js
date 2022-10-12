import api from ".";

export const CallAPI = {
  create: (payload) => {
    return api
      .post("/employees", payload)

      .then((res) => {
        return res.data;
      });
  },

  get: (id) => {
    return api
      .get(`/employees/${id}`)

      .then((res) => {
        return res.data;
      });
  },

  getList: () => {
    return api
      .get("/employees")

      .then((res) => {
        return res.data;
      });
  },

  update: (id, payload) => {
    return api
      .put(`/employees/${id}`, payload)

      .then((res) => {
        return res.data;
      });
  },

  delete: (id) => {
    return api
      .delete(`/employees/${id}`)

      .then((res) => {
        return res.data;
      });
  },
};

export default CallAPI;
