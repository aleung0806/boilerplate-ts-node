const express = require("express");

const genericRouter = (controller) => {
  const router = express.Router();
  router.get("/", controller.getAll);
  router.get("/:id", controller.get);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.remove);

  return router;
};

module.exports = genericRouter;
