const express = require('express');
const bodyParser = require('body-parser');
const Team = require('./team');

const app = express();
app.use(bodyParser.json());

// Route pour ajouter une équipe
app.post('/teams', async (req, res) => {
  try {
    const {First_name, Last_name, telephone, email, title_profile } = req.body;
    const team = new Team({ First_name, Last_name, telephone, email, title_profile });
    await team.save();
    res.status(201).json({ message: 'Team added successfully', team });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Route pour supprimer une équipe par son ID
app.delete('/teams/:id', async (req, res) => {
    try {
      const teamId = req.params.id;
      await Team.findByIdAndDelete(teamId);
      res.json({ message: 'Team deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  // Route pour afficher la liste des équipes
app.get('/teams', async (req, res) => {
    try {
      // Récupérer toutes les équipes depuis la base de données
      const teams = await Team.find();
      
      res.status(200).json(teams);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });

  // Route pour mettre à jour une équipe
app.put('/teams/:id', async (req, res) => {
    try {
      const teamId = req.params.id;
      const { First_name } = req.body;
      const { Last_name } = req.body;
      const { telephone } = req.body;
      const { email } = req.body;
      const { title_profile } = req.body;
      
      // Recherche de l'équipe par ID dans la base de données
      const team = await Team.findOneAndUpdate(
        { id: teamId },
        { $set: { First_name: First_name } },
        { $set: { Last_name: Last_name } },
        { $set: { telephone: telephone } },
        { $set: { email: email } },
        { $set: { title_profile: title_profile } },
        { new: true }
      );
      
      if (!team) {
        return res.status(404).json({ message: 'Équipe non trouvée' });
      }
      
      res.status(200).json(team);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });
  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});