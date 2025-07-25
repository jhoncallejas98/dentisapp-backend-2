import express from 'express';

import { createUser, getAllUsers, getUsersById, removeUsersById, updateUsersById, getAlldentist, assignCedulaToAllUsers } from '../controller/users.controller.mjs'

const router = express.Router();

router.post('/api/users', createUser);
router.get("/api/users", getAllUsers)
router.get("/api/users/dentists", getAlldentist);
router.get("/api/users/assign-cedula", assignCedulaToAllUsers);
router.get("/api/users/:id", getUsersById)
router.delete("/api/users/:id", removeUsersById);
router.patch("/api/users/:id", updateUsersById);


export default router;