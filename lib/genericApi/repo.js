const db = require("../db/db");

const genericRepo = (elementName) => {
  const getAll = async () => {
    console.log(`${elementName} repo getAll`);
    const elements = await db.select("*").from(elementName);

    return elements;
  };

  const get = async (id) => {
    console.log(`${elementName} repo get ${id}`);
    const element = await db.select("*").from(elementName).where("id", id);

    return element[0];
  };

  const create = async (element) => {
    console.log(`${elementName} repo create ${element}`);
    const newElement = await db(elementName).insert(element).returning("*");

    return newElement[0];
  };
  const update = async (id, element) => {
    console.log(`${elementName} repo update ${element}`);

    const updatedElement = await db(elementName)
      .where("id", id)
      .update(element)
      .returning("*");

    return updatedElement[0];
  };

  const remove = async (id) => {
    console.log(`${elementName} repo remove ${id}`);
    try {
      await db(elementName).where("id", id).del();
      console.log("delete success");
    } catch (err) {
      console.log(err);
    }

    return;
  };

  return {
    getAll,
    get,
    create,
    update,
    remove,
  };
};
module.exports = genericRepo;
