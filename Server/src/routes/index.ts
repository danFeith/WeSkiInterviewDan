import { Router } from 'express'
import hotelsRoutes from './hotels.router';

const router = Router();

router.use("/hotels", hotelsRoutes);


export default router;