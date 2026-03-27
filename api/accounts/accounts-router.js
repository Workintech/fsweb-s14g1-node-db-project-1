const router = require('express').Router();
const Accounts = require('./accounts-model');
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
} = require('./accounts-middleware');

// [GET] /api/accounts
router.get('/', async (req, res, next) => {
  try {
    // Model içindeki getAll fonksiyonuna query parametrelerini gönderiyoruz
    const accounts = await Accounts.getAll(req.query);
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

// [GET] /api/accounts/:id
router.get('/:id', checkAccountId, (req, res) => {
  res.json(req.account);
});

// [POST] /api/accounts
router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
});

// [PUT] /api/accounts/:id
router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const updatedAccount = await Accounts.updateById(req.params.id, req.body);
    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

// [DELETE] /api/accounts/:id
router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Accounts.deleteById(req.params.id);
    res.json(deletedAccount);
  } catch (err) {
    next(err);
  }
});

module.exports = router;