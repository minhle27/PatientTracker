// import express from 'express';
// import patientService from '../services/patientService';
// import { processNewPatient, processNewEntry } from '../utils/fieldValidate';
// const router = express.Router();

// router.get('/', (_req, res) => {
//     res.send(patientService.getPatients());
// });

// router.post('/', (req, res) => {
//     try {
//         const newPatient = processNewPatient(req.body);
//         const addedPatient = patientService.addPatient(newPatient);
//         res.json(addedPatient);
//     } catch (error: unknown) {
//         let errorMessage = 'Something went wrong.';
//         if (error instanceof Error) {
//             errorMessage += ' Error: ' + error.message;
//         }
//         res.status(400).send(errorMessage);
//     }
// });

// router.get('/:id', (req, res) => {
//     const patient = patientService.findByID(req.params.id);

//     if (patient) {
//         res.send(patient);
//     } else {
//         res.sendStatus(404);
//     }
// });

// router.post('/:id/entries', (req, res) => {
//     try {
//         const newEntry = processNewEntry(req.body);
//         const patient = patientService.addEntry(req.params.id, newEntry);
//         res.send(patient);
//     }
//     catch (error: unknown) {
//         let errorMessage = 'Something went wrong.';
//         if (error instanceof Error) {
//           errorMessage += ' Error: ' + error.message;
//         }
//         res.status(400).send(errorMessage);
//     }
// });

// export default router;