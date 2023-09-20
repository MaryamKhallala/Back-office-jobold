Hello you find in this repository The APIs of teams and company 

########### Please fellow this instruction bellow:#############

to run APIs teams please enter:

npm run team

to test APIs team in Postman:

Add team: POST http://localhost:3000/teams/ 
     and define in the body the file json witch you want to add

delete team: delete http://localhost:3000/teams/:id
      replace :id with the id of team  witch you want to delete

Read all teams: Get http://localhost:3000/teams/ 

Update team : PUT http://localhost:3000/teams/:id
    replace :id with the id of team  witch you want to update

########################################################################
  to run APIs companies please enter:

npm run company

to test APIs company in Postman:

Add team: POST http://localhost:3000/companies/ 
     and define in the body the file json witch you want to add

delete team: delete http://localhost:3000/companies/:id
      replace :id with the id of company  witch you want to delete

Read all teams: Get http://localhost:3000/companies/ 

Update team : PUT http://localhost:3000/companies/:id
    replace :id with the id of company  witch you want to update  

    #####################################################################
    to run API form contact 

      node API_Form_Contact.js