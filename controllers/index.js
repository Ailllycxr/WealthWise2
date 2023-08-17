const router = require("express").Router();
const homeRoutes = require("./homeRoutes.js");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);


router.get('*', (req, res) => {
    res.render('404');
  });

module.exports = router;
