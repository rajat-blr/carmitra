import { Router } from 'express';
import dealershipController from '../controllers/dealershipController';

const router = Router();

router.get('/', dealershipController.getDealerships);
router.post('/', dealershipController.addDealership);

export = (app: Router) => {
    app.use('/api/dealerships', router);
};