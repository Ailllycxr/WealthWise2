const router = require("express").Router();


router.get("/current", async (req, res) => {
    const sessionData = await {
        user_id: req.session.user_id,
    };
    console.log(sessionData);
    res.json(sessionData);
});


module.exports = router;