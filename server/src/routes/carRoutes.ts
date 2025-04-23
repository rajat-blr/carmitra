import { Router } from 'express';
import carController from '../controllers/carController';

const router = Router();

router.get('/reviews', carController.getReviews.bind(carController));
router.get('/reviews/:id', carController.getReviewById.bind(carController));
router.post('/reviews', carController.submitReview.bind(carController));

export = (app: Router) => {
    app.use('/api/cars', router);
};