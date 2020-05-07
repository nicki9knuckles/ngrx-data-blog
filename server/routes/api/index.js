const router = require("express").Router();
const entryRoutes = require("./entries");

router.use("/entries", entryRoutes.getRoute);
router.use("/entry", entryRoutes.postRoute);
router.use("/entry?id=:id", entryRoutes.getByIdParamRoute);
router.use("/entry/:id", entryRoutes.getByIdRoute);
router.use("/entry/:id", entryRoutes.updateByIdRoute);
router.use("/entry/:id", entryRoutes.deleteByIdRoute);

module.exports = router;
