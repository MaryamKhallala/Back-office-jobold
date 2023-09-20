// company.js
const mongoose = require('./db');

const companySchema = new mongoose.Schema({
  id: String, 
  name: String,
  adress: String,
  telephone: [String],
  email: String,
  url_site: String,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
