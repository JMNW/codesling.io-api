import express from 'express';

import {
  addTestCaseController,
  testGetter
} from './testCasesControllers';

const router = express.Router();

router.route('/')
  .post(addTestCaseController);

router.route('/:challenge_id')
  .get(testGetter);


export default router;
