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
const moviesCustom = `SELECT tm.*, tl.trailer_link, pr.poster_link, \`description\`, \`g\`.\`genre_name\`, co.purchase_count, co.rental_count
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
const moviesCustomId = `SELECT tm.*, aa.rating_description, tl.trailer_link, \`description\`, \`g\`.\`genre_name\`, co.purchase_count, co.rental_count
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
const moviesCustomRange = `SELECT tm.*, tl.trailer_link, pr.poster_link, \`description\`, \`g\`.\`genre_name\`, co.purchase_count, co.rental_count
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

// Update a count record
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
    
    console.log(c[0].dataValues);

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
    
    console.log(c[0].dataValues);

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
// Descriptions Endpoints
//

// Get a specific movie description by catalogue id
router.get('/movies/description/:catalouge_id', async (req, res) => 
{
  try 
  {
    const description = await db.Descriptions.findAll({
      where: 
      {
        catalogue_id: req.params.catalouge_id
      }
    });
    res.json(description);
  } 
  
  catch (err) 
  {
    console.error(err);
    res.send(err);
  }
});

// Endpoints to pass all other database records to front end

//
// Ratings Endpoints
//

// Get a specifc rating by id
router.get('/ratings/:rating_id', async (req, res) => 
{
  try 
  {
    const rating = await db.Movies.findAll({
      where: 
      {
        rating_id: req.params.rating_id
      }
    });

    res.json(rating);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

//
// Categories Endpoints
//

// Get all categories
router.get('/categories', async (req, res) => 
{
  try 
  {
    const result = await db.sequelizeDB.query("SELECT * FROM \`categories\`", 
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

// Get a specifc category by id
router.get('/categories/:cat_id', async (req, res) => 
{
  try 
  {
    const result = await db.sequelizeDB.query(`SELECT * FROM \`categories\` WHERE \`category_id\` = ${req.params.category_id};`, 
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
// Invoices Endpoints
//

// Get a specifc invoice by id
router.get('/invoices/:invoice_id', async (req, res) => 
{
  try 
  {
    const invoice = await db.Invoices.findAll({
      where: 
      {
        invoice_id: req.params.invoice_id
      }
    });

    res.json(invoice);
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
    const result = await db.sequelizeDB.query(`SELECT poster_link FROM \`poster\` WHERE \`poster_id\` = ${req.params.poster_id};`, 
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

// Don't know if we should really be exposing things like this, but the assignment said to make all records available.

// Get a specifc rental by confirmation number
router.get('/rentals/:confirmation_number', async (req, res) => 
{
  try 
  {
    const rental = await db.Rental_info.findAll({
      where: 
      {
        confirmation_num: req.params.confirmation_number
      }
    });

    res.json(rental);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Get a specific rental record by invoice_id
router.get('/rentals/invoice_id/:invoice_id', async (req, res) => 
{
  try 
  {
    const rental = await db.Rental.findAll({
      where: 
      {
        invoice_id: req.params.invoice_id
      }
    });

    res.json(rental);
  } 
  catch (err) 
  {
    console.error(err);
    res.send(err);
  }
});


// Update a rental record
router.put('/rentals', async (req, res) => 
{
  try 
  {
    await db.Rental.update(
      {
      invoice_id: req.body.invoice_id,
      catalouge_id: req.body.catalogue_id,
      purchase_type: req.body.purchase_type,
      purchase_date: req.body.purchase_date
      },
      {
        where: {
          confirmation_num: req.body.confirmation_num
        }
      }
    );
    res.send('Rental info Successfully Updated.');
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

export default router;