const repo = require("../repository/generic");

const create = async (element) => {
  return await repo.create(element);
};

const get = async (projectId) => {
  return await repo.get(projectId);
};

const update = async (element) => {
  return await repo.update(id, element);
};

const remove = async (element) => {
  return await repo.remove(element.id);
};

module.exports = {
  create,
  get,
  getByProject,
  update,
  remove,
};
