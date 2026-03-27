const db = require('../../data/db-config');

const getAll = () => {
  // Kural: db('table') -> Array döner
  return db('accounts');
};

const getById = (id) => {
  // Kural: .where('id', id).first() -> Tek bir Object döner
  return db('accounts').where('id', id).first();
};

const create = async (account) => {
  // Kural: .insert() -> Yeni ID'leri içeren bir Array [id] döner
  const [id] = await db('accounts').insert(account);
  return getById(id); // Ödevde "yeni oluşturulan hesabı döner" dediği için tekrar sorguluyoruz
};

const updateById = async (id, account) => {
  // Kural: .update() -> Etkilenen kayıt sayısını döner (1 veya 0)
  await db('accounts').where('id', id).update(account);
  return getById(id); // Güncellenmiş halini dönmek için tekrar sorguluyoruz
};

const deleteById = async (id) => {
  // Kural: .delete() -> Etkilenen kayıt sayısını döner. 
  // Ama ödev "silinen hesabı döner" dediği için önce bulup sonra siliyoruz.
  const deletedAccount = await getById(id);
  await db('accounts').where('id', id).delete();
  return deletedAccount;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};