/* eslint-disable no-console */
import express from 'express';
import sequelize from 'sequelize';

import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Movies API');
});

//
// Movies Endpoints
//

// Get all movies
router.get('/movies', async (req, res) => 
{
  try 
  {
    const movies = await db.Movies.findAll();
    const reply = movies.length > 0 ? { data: movies } : { message: 'no results found' };
    res.json(reply);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Get a specifc movie by id
router.get('/movies/:movie_id', async (req, res) => 
{
  try 
  {
    const movie = await db.Movies.findAll({
      where: {
        movie_id: req.params.movie_id
      }
    });

    res.json(movie);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Get a range of movies by id
router.get('/movies/:range_start/:range_end', async (req, res) => 
{
  try 
  {
    const movie = await db.Movies.findAll({
      where: {
        [Op.between]: 
        [
          { movie_id: range_start },
          { movie_id: range_end }
        ]
      }
    });

    res.json(movie);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Search for movies other variables, such as name, etc. Handle this here or on front-end?

// Add a new Movie to database
router.post('/movies', async (req, res) => 
{
  const movies = await db.Movies.findAll();
  const currentId = (await movies.length) + 1;
  try 
  {
    // I don't know all the params to put here since no one botherd to respond and give me a diagram of the database tables.
    const newMovie = await db.Movies.create({
      movie_id: currentId,
      movie_title: req.body.movie_title,
      imdb_rating: req.body.imdb_rating,
      duration: req.body.duration
    });
    res.json(newMovie);
  } 
  
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Delete a movie from the database
router.delete('/movies/:movie_id', async (req, res) => 
{
  try 
  {
    await db.Movies.destroy({
      where: {
        movie_id: req.params.movie_id
      }
    });
    res.send('Successfully Deleted');
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Update a movie in the database
router.put('/movies', async (req, res) => 
{
  try 
  {
    await db.Movies.update(
      {
        movie_title: req.body.movie_title,
        imdb_rating: req.body.imdb_rating,
        duration: req.body.duration
      },
      {
        where: {
          movie_id: req.body.movie_id
        }
      }
    );
    res.send('Successfully Updated');
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

//
// Customers Endpoints
//

// Get all customers
router.get('/customers', async (req, res) => 
{
  try 
  {
    const customers = await db.Customers.findAll();
    res.json(customers);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Get a specific customer by id
router.get('/customers/:customer_id', async (req, res) => 
{
  try 
  {
    const customers = await db.Customers.findAll({
      where: {
        customer_id: req.params.customer_id
      }
    });
    res.json(meals);
  } 
  
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Add a customer to database

// Delete a customer from database

// Update a customer's record
router.put('/customers', async (req, res) => 
{
  try 
  {
    await db.Customers.update(
      {
        customer_name: req.body.customer_name,
        customer_address: req.body.customer_address
      },
      {
        where: {
          meal_id: req.body.meal_id
        }
      }
    );
    res.send('Customer Successfully Updated.');
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Kept this for a useful example - maybe?

/// //////////////////////////////////
/// ///////Custom SQL Endpoint////////
/// /////////////////////////////////
const macrosCustom = 'SELECT `Dining_Hall_Tracker`.`Meals`.`meal_id` AS `meal_id`,`Dining_Hall_Tracker`.`Meals`.`meal_name` AS `meal_name`,`Dining_Hall_Tracker`.`Macros`.`calories` AS `calories`,`Dining_Hall_Tracker`.`Macros`.`carbs` AS `carbs`,`Dining_Hall_Tracker`.`Macros`.`sodium` AS `sodium`,`Dining_Hall_Tracker`.`Macros`.`protein` AS `protein`,`Dining_Hall_Tracker`.`Macros`.`fat` AS `fat`,`Dining_Hall_Tracker`.`Macros`.`cholesterol` AS `cholesterol`FROM(`Dining_Hall_Tracker`.`Meals`JOIN `Dining_Hall_Tracker`.`Macros`)WHERE(`Dining_Hall_Tracker`.`Meals`.`meal_id` = `Dining_Hall_Tracker`.`Macros`.`meal_id`)';
router.get('/table/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(macrosCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

const mealMapCustom = `SELECT hall_name,
  hall_address,
  hall_lat,
  hall_long,
  meal_name
FROM
  Meals m
INNER JOIN Meals_Locations ml 
  ON m.meal_id = ml.meal_id
INNER JOIN Dining_Hall d
ON d.hall_id = ml.hall_id;`;
router.get('/map/data', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(mealMapCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
router.get('/custom', async (req, res) => {
  try {
    const result = await db.sequelizeDB.query(req.body.query, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.error('Server error');
  }
});

export default router;
