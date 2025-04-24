import { Router } from 'express';
import guideController from '../controllers/guideController';

const router = Router();

router.get('/', guideController.getGuides.bind(guideController));
router.get('/:uuid', guideController.getGuideByUuid.bind(guideController));
router.post('/', guideController.createGuide.bind(guideController));

export = (app: Router) => {
    app.use('/api/guides', router);
}; 