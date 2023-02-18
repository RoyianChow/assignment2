import {Router} from 'express';
import {  DisplayContactAddPage, DisplayContactEditPage, DisplayContactList, ProcessContactAddPage, ProcessContactDelete, ProcessContactEditPage } from '../controllers/contacts.js';
import { AuthGuard } from '../utils/index.js';
const router = Router();

// R ead
router.get('/contact-list', AuthGuard, DisplayContactList);

// C reate
router.get('/contact-add', DisplayContactAddPage);
router.post('/contact-add', AuthGuard, ProcessContactAddPage);

// U pdate
router.get('/contact-edit/:id', AuthGuard, DisplayContactEditPage);
router.post('/contact-edit/:id', AuthGuard, ProcessContactEditPage);

// D elete
router.get('/contact-delete/:id', AuthGuard, ProcessContactDelete);

export default router;