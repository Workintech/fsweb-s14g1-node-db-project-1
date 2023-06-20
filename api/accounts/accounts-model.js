const db = require('../../data/db-config')

const getAll = () => {
  /*
  SELECT * 
  FROM [Accounts]
  */
  return db("accounts");
}

const getById = (id) => {
  /*
  SELECT * 
  FROM [Accounts]
  WHERE id = '{id}' limit 1
  */
  return db("accounts").where("id", id).first(); // first: array'in ilk objesi
}

const getByName = (name) => {
  /*
  SELECT * 
  FROM [Accounts]
  WHERE name = '{name}' limit 1
  */
  return db("accounts").where("name", name).first(); // first: array'in ilk objesi
}

const create = async (account) => {
  const [id] = await db("accounts").insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  return getById(id);
}

const deleteById = (id) => {
  return db("accounts").where("id", id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getByName
}