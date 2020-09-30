import { Router } from 'express';
import { getPerson } from './person.controller';
import { personMiddleware } from './person.middleware';

const router = Router();

router.get('/name-count', personMiddleware, getPerson);

export default router;