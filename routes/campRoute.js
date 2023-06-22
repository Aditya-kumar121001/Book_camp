const express = require("express")
const router = express.Router()
const {getAllCamp,addCamp,getCamp,updateCamp,deleteCamp} = require("../controllers/campController");

router.route("/").get(getAllCamp);
router.route("/").post(addCamp);
router.route("/camp/:id").get(getCamp);
router.route("/camp/:id").put(updateCamp);
router.route("/camp/:id").delete(deleteCamp);

module.exports = router;