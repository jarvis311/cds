import express from "express";
import { Authenticat, CategoriesAdd, CategoriesAll, CategoriesAllId, CategoriesDelete, CategoriesSearch, CategoriesStatusUpdate, CategoriesUpdate, CategoriesView, Login, Logout, ReelsAdd, ReelsAll, ReelsDelete, ReelsEdit, ReelsSearch, ReelsStatusUpdate, ReelsUpdate, ReelsView, RegisterUpdate, Registers } from "../controller/web.js";
import { createCelebrityVoice, deleteCelebrityVoice, getCelebrityVoice, getCelebrityVoiceById, updateCelebrityVoice } from "../controller/celebrityVoice.js";
const router = express.Router()

/* Categories Module */

router.post("/categories/add", CategoriesAdd)
router.post("/categories/view", CategoriesView)
router.post("/categories/delete", CategoriesDelete)
router.post("/categories/status", CategoriesStatusUpdate)
router.post("/categories/update", CategoriesUpdate)
router.post("/categories/all", CategoriesAll)
router.post("/categories/getallid", CategoriesAllId)
router.post("/categories/search", CategoriesSearch)

/* End Categories Module */

/* Reels Module */

router.post("/reels/add", ReelsAdd)
router.post("/reels/view", ReelsView)
router.post("/reels/edit", ReelsEdit)
router.post("/reels/delete", ReelsDelete)
router.post("/reels/status", ReelsStatusUpdate)
router.post("/reels/update", ReelsUpdate)
router.post("/reels/all", ReelsAll)
router.post("/reels/search", ReelsSearch)

/* End Reels Module */

/* User Module */

router.post("/register", Registers)
router.post('/register/update', RegisterUpdate)
router.post('/login', Login)
router.post('/logout', Authenticat, Logout)

/* End User Module */

/* Celebrity Voice Module start by jignesh patel */
router.post("/celebrity-voice/add", createCelebrityVoice)
router.post("/celebrity-voice/updtae", updateCelebrityVoice)
router.post("/celebrity-voice/get", getCelebrityVoice)
router.post("/celebrity-voice/delete", deleteCelebrityVoice)
router.post("/celebrity-voice/viwe", getCelebrityVoiceById)

/*End Of Celebrity Voice Module */


export default router
