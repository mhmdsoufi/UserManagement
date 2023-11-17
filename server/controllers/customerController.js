import Customer from '../models/customer.js';
import mongoose from 'mongoose';

/**
 * GET /
 * Homepage
 */
export const homepage = async (req, res) => {
  const locals = {
    title: 'NodeJs',
    description: 'Free NodeJs User Management System',
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await Customer.countDocuments({});

    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.log(error);
  }
};
/**
 * GET /
 * Homepage
 */
// export const homepage = async (req, res) => {
//   const locals = {
//     title: 'Home page',
//     description: 'User management System on top of NodeJS',
//   };

//   const customers = await Customer.find();
//   console.log(customers);

//   res.render('index', { locals, customers });
// };

/**
 * GET /
 * About page
 */
export const about = async (req, res) => {
  const locals = {
    title: 'about',
    description: 'User management System on top of NodeJS',
  };

  res.render('about', locals);
};

/**
 * GET /
 * New Customer Form
 */
export const addCustomer = async (req, res) => {
  const locals = {
    title: 'Add New Customer',
    description: 'Free NodeJs User Management System',
  };

  res.render('customer/add', locals);
};

/**
 * POST /
 * Create New Customer
 */
export const createCustomer = async (req, res) => {
  //

  const newCustomer = new Customer(req.body);

  try {
    await Customer.create(newCustomer);
    await res.flash('success', 'New customer has been added.');

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

/**
 * GET /
 * View Customer Details
 */
export const viewCustomer = async (req, res) => {
  const locals = {
    title: 'Customer Details',
    description: 'Free NodeJs User Management System',
  };

  const customer = await Customer.findById(req.params.id);

  res.render('customer/view', { locals, customer });
};

/**
 * GET /
 * edit existing Customer Details
 */
export const editCustomer = async (req, res) => {
  const locals = {
    title: 'edit Customer Details',
    description: 'Free NodeJs User Management System',
  };

  const customer = await Customer.findById(req.params.id);

  res.render('customer/edit', { locals, customer });
};

/**
 * PUT /
 * Update Customer
 */
export const updateCustomer = async (req, res) => {
  //

  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.flash('updated', 'customer has been updated.');

    res.redirect(`/customer/${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
};

/**
 * DELETE /
 * Delete Customer
 */
export const deleteCustomer = async (req, res) => {
  //

  try {
    await Customer.findByIdAndDelete(req.params.id);
    await res.flash('deleted', 'customer has been deleted.');

    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

/**
 * Get /
 * Search Customer Data
 */
export const searchCustomers = async (req, res) => {
  const locals = {
    title: 'Search Customer Data',
    description: 'Free NodeJs User Management System',
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ],
    });

    res.render('search', {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
