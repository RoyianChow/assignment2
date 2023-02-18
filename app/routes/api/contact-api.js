import { Router } from "express";
import { Add, Delete, Edit, Get, GetList } from "../../controllers/api/contact-api.js";
//import movies controller operations later

const router = Router();

// HTTP Verbs GET, POST, PUT, DELETE
// REST API Methodology
router.get('/list', GetList);
router.get('/:id', Get);
router.post('/add', Add);
router.put('/edit/:id', Edit);
router.delete('/delete/:id', Delete);

export default router;