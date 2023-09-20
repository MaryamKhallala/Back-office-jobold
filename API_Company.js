const express = require('express');
const bodyParser = require('body-parser');
const Company = require('./company');

const app = express();
app.use(bodyParser.json());

// Route pour ajouter une entreprise
app.post('/companies', async (req, res) => {
    try {
      const { id,name, address, telephone, email, url_site } = req.body;
  
      const newCompany = new Company({
        id,
        name,
        address,
        telephone,
        email,
        url_site
      });
  
      await newCompany.save();
  
      res.status(201).json({ message: 'Entreprise ajoutée avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });
  // Route pour supprimer une entreprise par son ID
app.delete('/companies/:id', async (req, res) => {
    try {
      const companyID = req.params.id;
      await Company.findByIdAndDelete(companyID);
      res.json({ message: 'Company deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  // Route pour afficher la liste des équipes
app.get('/companies', async (req, res) => {
    try {
      // Récupérer toutes les enreprises depuis la base de données
      const companies = await Company.find();
      
      res.status(200).json(companies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });

  // Route pour mettre à jour une entreprise
app.put('/companies/:id', async (req, res) => {
    try {
      const companyId = req.params.id;
      const { name } = req.body;
      const { address } = req.body;
      const { telephone } = req.body;
      const { email } = req.body;
      const { url_site } = req.body;
      
      // Recherche de l'équipe par ID dans la base de données
      const company = await Company.findOneAndUpdate(
        { id: companyId },
        { $set: { name: name } },
        { $set: { address: address } },
        { $set: { telephone: telephone } },
        { $set: { email: email } },
        { $set: { url_site: url_site } },
        { new: true }
      );
      
      if (!company) {
        return res.status(404).json({ message: 'entreprise non trouvée' });
      }
      
      res.status(200).json(company);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });  