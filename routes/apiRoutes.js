/* eslint-disable no-console */
import express from 'express';
import sequelize, { Sequelize } from 'sequelize';

import db from '../database/initializeDB.js';

const router = express.Router();

router.get('/', (req, res) => 
{
  res.send('Movies API');
});

//
// Transaction Endpoints
//

// Create a new transaction
router.post('/transaction', async (req, res) => 
{
  const now = Sequelize.fn('NOW');

  try 
  {
    const newInvoice = await db.Invoices.create({
      credit_total: req.body.credit_total,
      invoice_date: now,
      invoice_total: req.body.invoice_total
    });

    const newRental = await db.Rental.create({
      invoice_id: newInvoice.dataValues.invoice_id,
      catalogue_id: req.body.catalogue_id,
      purchase_type: req.body.purchase_type,
      purchase_date: now
    });
    res.json(newRental);
  }

  catch(err) 
  {
    console.error(err);
    res.send("Server error");
  }
});

// Delete a transaction
router.delete('/transaction/:invoice_id', async (req, res) => 
{
  try 
  {
    await db.Rental.destroy({
      where: 
      {
        invoice_id: req.params.invoice_id
      }
    });

    await db.Invoices.destroy({
      where: 
      {
        invoice_id: req.params.invoice_id
      }
    });

    res.json('Successfully Deleted');
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

//
// Movies Endpoints
//

// Get all movies
const moviesCustom = `SELECT tm.*, tl.trailer_link, pr.poster_link, pr.hdposter_link, \`description\`, \`g\`.\`genre_name\`, co.purchase_count, co.rental_count
FROM \`tv_movie\` tm JOIN \`descriptions\` USING (catalogue_id)
JOIN \`counts\` co USING (catalogue_id)
JOIN \`trailer\` tl USING (catalogue_id)
JOIN \`poster\` pr USING (poster_id)
JOIN \`categories\` c ON tm.category_id = c.category_id
JOIN \`genre\` g ON c.genre_id = g.genre_id;`

router.get('/movies', async (req, res) => 
{
  try 
  {
    const result = await db.sequelizeDB.query(moviesCustom, 
      {
        type: sequelize.QueryTypes.SELECT
      });
    res.json(result);
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
const moviesCustomId = `SELECT tm.*, aa.rating_description, pr.hdposter_link, tl.trailer_link, \`description\`, \`g\`.\`genre_name\`, co.purchase_count, co.rental_count
FROM \`tv_movie\` tm JOIN \`descriptions\` USING (catalogue_id)
JOIN \`counts\` co USING (catalogue_id)
JOIN \`trailer\` tl USING (catalogue_id)
JOIN \`poster\` pr USING (poster_id)
JOIN \`categories\` c ON tm.category_id = c.category_id
JOIN \`genre\` g ON c.genre_id = g.genre_id
JOIN \`approved_audience\` aa USING(rating_id)
WHERE catalogue_id = ${req.params.movie_id};`;

try 
  {
    const result = await db.sequelizeDB.query(moviesCustomId, 
      {
        type: sequelize.QueryTypes.SELECT
      });
    res.json(result);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Get a range of movies by id
router.get('/movies/range/:range_start/:range_end', async (req, res) => 
{
const moviesCustomRange = `SELECT tm.*, tl.trailer_link, pr.poster_link, pr.hdposter_link, \`description\`, \`g\`.\`genre_name\`, co.purchase_count, co.rental_count
FROM \`tv_movie\` tm JOIN \`descriptions\` USING (catalogue_id)
JOIN \`counts\` co USING (catalogue_id)
JOIN \`trailer\` tl USING (catalogue_id)
JOIN \`poster\` pr USING (poster_id)
JOIN \`categories\` c ON tm.category_id = c.category_id
JOIN \`genre\` g ON c.genre_id = g.genre_id
WHERE catalogue_id BETWEEN ${req.params.range_start} AND ${req.params.range_end};`;
  try 
  {
    const result = await db.sequelizeDB.query(moviesCustomRange, 
      {
        type: sequelize.QueryTypes.SELECT
      });
    res.json(result);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

//
// Counts Endpoints
//

// Update a rental count record
router.put('/count/r/:c_id', async (req, res) => 
{
  try 
  {
    const c = await db.Counts.findAll({
      where: 
      {
        catalogue_id: req.params.c_id
      }
    });

    await db.Counts.update(
      {
        rental_count: c[0].dataValues.rental_count + 1
      },
      {
        where: 
        {
          catalogue_id: req.params.c_id
        }
      }
    );
    res.json('Count Successfully Updated');
  } 
  catch (err) 
  {
    console.error(err);
    res.send('Server error');
  }
});

// Update a purchase count record
router.put('/count/p/:c_id', async (req, res) => 
{
  try 
  {
    const c = await db.Counts.findAll({
      where: 
      {
        catalogue_id: req.params.c_id
      }
    });

    await db.Counts.update(
      {
        purchase_count: c[0].dataValues.purchase_count + 1
      },
      {
        where: 
        {
          catalogue_id: req.params.c_id
        }
      }
    );
    res.json('Count Successfully Updated');
  } 
  catch (err) 
  {
    console.error(err);
    res.send('Server error');
  }
});

//
// Genre Endpoints
//

// Get all genres
router.get('/genres', async (req, res) => 
{
  try 
  {
    const genres = await db.Genres.findAll();
    const reply = genres.length > 0 ? { data: genres } : { message: 'no results found' };
    res.json(reply);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Get a specifc genre by id
router.get('/genre/:genre_id', async (req, res) => 
{
  try 
  {
    const genre = await db.Genres.findAll({
      where: 
      {
        genre_id: req.params.genre_id
      }
    });

    res.json(genre);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

//
// Poster/Trailer endpoints
//

// Get a poster by id
router.get('/poster/image/:poster_id', async (req, res) => 
{
  try 
  {
    const result = await db.sequelizeDB.query(`SELECT poster_link, hdposter_link FROM \`poster\` WHERE \`poster_id\` = ${req.params.poster_id};`, 
      {
        type: sequelize.QueryTypes.SELECT
      });
    res.json(result);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

export default router;