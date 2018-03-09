import {
  addTestCaseQuery,
  getTest
} from './testCasesQuery';
import {
  success,
  error
} from '../../lib/log';

export const addTestCaseController = async (req, res) => {
  try {
    const data = await addTestCaseQuery(req.body)
    // const { content:testContent } = await getTest(req.body);
    console.log(req.body, 'up in ADD TEST CASE CONTROLLER');
    // data.testContent = testContent;
    success('addTestCaseController - successfully added test case ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('addTestCaseController - error= ', err);
  }
};

export const testGetter = async (req, res) => {
  try {
    const data = await getTest(req.params)
    // const { content:testContent } = await getTest(req.body);
    console.log(req.params, 'up in ADD TEST CASE CONTROLLER');
    // data.testContent = testContent;
    success('got test- successfully added test case ', data);
    return res.status(200).send(data);
  } catch (err) {
    error('to test data - error= ', err);
  }
};
