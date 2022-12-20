import {Router} from 'express';
import { getRecipt, getRecipts, readReports, registerRecipts } from '../controllers/recipts.js';


const router = Router();
router.get('/', getRecipts)
router.get('/:id', getRecipt)
router.get('/reports', readReports)
router.put('/', registerRecipts)


export default router
