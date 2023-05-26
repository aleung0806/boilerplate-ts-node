const config = {
  auth: {
    register: null,
    login: null,
    logout: null,
  },
  user: {
    get: "user",
    getAllByProjectId: "member",
    update: "user",
    remove: "user",
  },
  role: {
    create: "admin",
    update: "admin",
    getAllByProjectId: "member",
    getAllByUserId: "user",
    remove: "admin",
  },
  project: {
    create: null,
    update: "member",
    getAllByProjectId: "member",
    getAllByUserId: "user",
    remove: "admin",
  },
  list: {
    create: "member",
    update: "member",
    remove: "member",
  },
  issue: {
    create: "member",
    update: "member",
    remove: "member",
  },
};

module.exports = config;
