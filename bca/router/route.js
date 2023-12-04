const express = require('express')
const router = express.Router()
const render = require("./render")
const multer = require('multer')
const categoryController = require('../controller/category.js')
const upload = multer({ dest: 'uploads/' })
require("../connection/conn")

/*  Stamp Module Web Api  */
router.post("/stamps/all", render.Authenticat, render.StampsAll)
router.post("/stamps/add", render.Authenticat, render.StampsAdd)
router.post("/stamps/view", render.Authenticat, render.StampsView)
router.post("/stamps/update", render.Authenticat, render.StampsUpdate)
router.post("/stamps/delete", render.Authenticat, render.StampsDelete)
router.post("/stamps/ispremium/update", render.Authenticat, render.StampsIsPremiumUpdate)
router.post("/stamps/ispremiumios/update", render.Authenticat, render.StampsIsPremiumIosUpdate)
router.post("/stamps/status/update", render.Authenticat, render.StampStatusUpdate)
router.post("/stamps/statusios/update", render.Authenticat, render.StampStatusIosUpdate)
router.post("/stamps/position/update", render.Authenticat, render.updateStampPosition)

/* End Stamp Module Web Api  */

/* Login And Register Web Api */

router.post("/register", render.Register)
router.post("/register/update", render.RegisterUpdate)
router.post('/login', render.Login)
router.post('/logout', render.Authenticat, render.Logout)

/* End Login And Register Web Api */


/* Android Api */

router.post("/api/social_login", render.social_login)
router.post('/api/get_all_stamp', render.get_all_stamp)
/* End Android Api */

/* Category Web Api start*/
router.post('/category/get', render.Authenticat, categoryController.getCategories)
router.post('/category/add', render.Authenticat, categoryController.createCategories)
router.post('/category/update', render.Authenticat, categoryController.updateCategories)
router.post('/category/delete', render.Authenticat, categoryController.deleteCategories)
router.post('/category/changestatus', render.Authenticat, categoryController.categoryUpdateStatus)
router.post('/category/view/', render.Authenticat, categoryController.categoryGetById)
router.post('/category/position', render.Authenticat, categoryController.updatePosition)
/* Category Web Api  end*/



module.exports = router;
