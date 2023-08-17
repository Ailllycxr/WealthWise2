const router = require("express").Router();
const homeRoutes = require("./homeRoutes.js");
const apiRoutes = require("./api");
const reflectionRoutes = require("./reflection");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/reflection", reflectionRoutes);

router.get('*', (req, res) => {
    res.render('404');
  });

module.exports = router;
