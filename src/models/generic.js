const db = require("../db/db");
const { toSnake, toCamel } = require("./convertCases");

const repo = (elementName) => {
  const create = async (element) => {
    console.log(
      `${elementName} repo create ${JSON.stringify(element, null, 2)}`
    );

    const newElement = await db(elementName)
      .insert(toSnake(element))
      .returning("*");

    return toCamel(newElement[0]);
  };

  const get = async (id) => {
    console.log(`${elementName} repo get ${id}`);

    const records = await db.select("*").from(elementName).where("id", id);

    if (records.length > 0) {
      return records[0];
    } else {
      throw new Error("not found in db");
    }
  };

  const getByProject = async (projectId) => {
    console.log(`${elementName} repo getByProject ${projectId}`);

    const records = await db
      .select("*")
      .from(elementName)
      .where("projectId", projectId);

    if (records.length > 0) {
      return records;
    } else {
      throw new Error("not found in db");
    }
  };

  const update = async (id, element) => {
    console.log(`${elementName} repo update ${element}`);
    const { _id, email, passwordHash, ...cleanedElement } = element;
    const updatedElement = await db(elementName)
      .where("id", id)
      .update(cleanedElement)
      .returning("*");

    return updatedElement[0];
  };

  const remove = async (id) => {
    console.log(`${elementName} repo remove ${id}`);

    const element = await db(elementName).where("id", id).del();

    console.log(element);

    return;
  };

  return {
    create,
    get,
    getByProject,
    update,
    remove,
  };
};
module.exports = repo;
