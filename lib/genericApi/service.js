const { isAdmin, isMember } = require("./permissions");

const genericService = (repo) => {
  const getAll = async (userId, element) => {
    const projectId = repo.getProjectId(id);
    if (await isMember(userId, projectId)) {
      return repo.getAll();
    }
  };

  const get = async (req, res, next) => {
    const id = req.params.id;
    try {
      const element = await repo.get(id);
      if (element.length === 0) {
        next("not found");
      } else {
        res.status(200).json(element);
      }
    } catch (err) {
      next(err);
    }
  };

  const create = async (req, res, next) => {
    const element = req.body;
    console.log("generic create", element);

    try {
      const createdElement = await repo.create(element);
      res.status(200).json(createdElement);
    } catch (err) {
      next(err);
    }
  };

  const update = async (req, res, next) => {
    const id = req.params.id;
    const element = req.body;
    try {
      const updatedElement = await repo.update(id, element);
      res.status(200).json(updatedElement);
    } catch (err) {
      next(err);
    }
  };

  const remove = async (req, res, next) => {
    const id = req.params.id;
    try {
      await repo.remove(id);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  };
  return {
    getAll,
    get,
    create,
    update,
    remove,
  };
};

module.exports = genericController;
