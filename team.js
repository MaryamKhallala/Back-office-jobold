// team.js
const mongoose = require('./db');

const teamSchema = new mongoose.Schema({
 
  First_name: String,
  Last_name: String,
  telephone: [String],
  email: String,
  title_profile: String,
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
