import express from 'express';
import { NewDoctor } from '../types';
const router = express.Router();
import doctorService from '../services/doctorService';

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (request, response): Promise<void> => {
  const newDoctor = request.body as NewDoctor;
  const addedDoctor = await doctorService.addDoctor(newDoctor);
  response.status(201).json(addedDoctor);
});



export default router;