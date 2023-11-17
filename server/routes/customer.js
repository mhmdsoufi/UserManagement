import express from 'express';
const router = express.Router();
import {
  homepage,
  addCustomer,
  about,
  createCustomer,
  viewCustomer,
  editCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomers,
} from '../controllers/customerController.js';

/**
 *  Customer Routes
 */
router.get('/', homepage);
router.get('/about', about);
router.get('/add', addCustomer);
router.post('/add', createCustomer);
router.get('/view/:id', viewCustomer);
router.get('/customer/:id', editCustomer);
router.put('/customer/:id', updateCustomer);
router.delete('/customer/:id', deleteCustomer);
router.post('/search', searchCustomers);

export default router;
