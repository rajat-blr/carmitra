import { Router } from 'express';
import dealershipController from '../controllers/dealershipController';

const router = Router();

router.get('/', dealershipController.getDealerships.bind(dealershipController));
router.post('/', dealershipController.addDealership.bind(dealershipController));

export = (app: Router) => {
    app.use('/api/dealerships', router);
};