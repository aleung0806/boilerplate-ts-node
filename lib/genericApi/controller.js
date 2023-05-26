const genericController = (repo) => {
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

  const getAll = async (req, res, next) => {
    try {
      const elements = await repo.getAllByProjectId();
      if (elements.length === 0) {
        next("not found");
      } else {
        res.status(200).json(elements);
      }
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
    create,
    get,
    update,
    remove,
  };
};

module.exports = genericController;
