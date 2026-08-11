import { Router } from 'express';
import { createUser, updateUser, getUserById, deleteUser } from './controller';

const router = Router();

router.post(`/user`, createUser);
router.get('/user/:id', getUserById);
router.post('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;