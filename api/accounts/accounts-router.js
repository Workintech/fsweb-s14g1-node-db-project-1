const router = require("express").Router();
const Account = require("./accounts-model");
const mw = require("./accounts-middleware");

router.get("/", (req, res, next) => {
  Account.getAll()
    .then((account) => {
      res.json(account);
    })
    .catch((err) => {
      res.json([]);
    });
});

router.get("/:id", mw.checkAccountId, async (req, res, next) => {
  try {
    res.json(req.account);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkAccountPayload,
  mw.checkAccountNameUnique,
  async (req, res, next) => {
    // KODLAR BURAYA
    try {
      let insertData = await Account.create(req.body);
      res.status(201).json(insertData);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  mw.checkAccountId,
  mw.checkAccountPayload,
  async (req, res, next) => {
    try {
      const updateAccount = await Account.updateById(req.params.id, req.body);
      res.json(updateAccount);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.checkAccountId, async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await Account.deleteById(req.params.id);
    res.json(req.account);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});

module.exports = router;
