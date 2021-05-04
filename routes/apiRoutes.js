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
// Transaction Endpoint
//
router.post('/transaction', async (req, res) => 
{
  const invoices = await db.Invoices.findAll();
  const rentals = await db.Rental.findAll();
  const currentInvoiceId = (await invoices.length) + 1;
  const currentRentalId = (await rentals.length) + 1;
  const now = Sequelize.fn('NOW');

  try 
  {
    const newInvoice = await db.Invoices.create({
      invoice_id: currentInvoiceId,
      customer_id: 1,
      credit_total: req.body.credit_total,
      invoice_date: now,
      invoice_total: req.body.invoice_total
    });
    //res.json(newInvoice);

    const newRental = await db.Rental.create({
      confirmation_num: currentRentalId,
      invoice_id: currentInvoiceId,
      catalogue_id: req.body.catalogue_id,
      purchase_type: req.body.purchase_type,
      purchase_date: now
    });
    res.json(newRental);
  }
  catch(err) 
  {
    console.error(err);
    res.send(`Server error: ${err}`);
  }
});


//
// Movies Endpoints
//

// Get all movies

const moviesCustom = `SELECT tm.*, \`description\`
FROM \`tv_movie\` tm JOIN \`descriptions\` USING (catalogue_id)`;
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
const moviesCustomId = `SELECT tm.*, \`description\`
FROM \`tv_movie\` tm JOIN \`descriptions\` USING (catalogue_id)
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
  try 
  {
    const movie = await db.Movies.findAll({
      where: {
        [Op.between]: 
        [
          { catalogue_id: range_start },
          { catalogue_id: range_end }
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
    // What is the point of category id
    // Code validation maybe?
    const newMovie = await db.Movies.create({
      catalogue_id: currentId,
      category_id: req.body.category_id,
      movie_title: req.body.movie_title,
      pricing: req.body.pricing,
      year: req.body.year,
      duration: req.body.duration,
      episodes: req.body.episodes,
      seasons: req.body.seasons,
      avg_star_rating: req.body.avg_star_rating,
      media_type: req.body.media_type,
      rating_id: req.body.rating_id,
      studio_id: req.body.studio_id
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
      where: 
      {
        catalogue_id: req.params.movie_id
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
        category_id: req.body.category_id,
        movie_title: req.body.movie_title,
        pricing: req.body.pricing,
        year: req.body.year,
        duration: req.body.duration,
        episodes: req.body.episodes,
        seasons: req.body.seasons,
        avg_star_rating: req.body.avg_star_rating,
        media_type: req.body.media_type,
        rating_id: req.body.rating_id,
        studio_id: req.body.studio_id
      },
      {
        where: 
        {
          catalogue_id: req.body.movie_id
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

// Get all ratings
router.get('/ratings', async (req, res) => 
{
  try 
  {
    const ratings = await db.Movies.findAll();
    const reply = ratings.length > 0 ? { data: ratings } : { message: 'no results found' };
    res.json(reply);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

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
    const categories = await db.Categories.findAll();
    const reply = categories.length > 0 ? { data: catagories } : { message: 'no results found' };
    res.json(reply);
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
    const category = await db.Categories.findAll({
      where: 
      {
        catalogue_id: req.params.category_id
      }
    });

    res.json(category);
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

// Get all invoices
router.get('/invoices', async (req, res) => 
{
  try 
  {
    const invoices = await db.Invoices.findAll();
    const reply = invoices.length > 0 ? { data: invoices } : { message: 'no results found' };
    res.json(reply);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

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

// Add a new invoice
router.post('/invoices', async (req, res) => 
{
  const invoices = await db.Invoices.findAll();
  const currentId = (await invoices.length) + 1;
  try 
  {
    const newInvoice = await db.Invoices.create({
      invoice_id: currentId,
      customer_id: 1,
      credit_total: req.body.credit_total,
      invoice_date: Sequelize.fn('NOW'),
      invoice_total: req.body.invoice_total
    });
    res.json(newInvoice);
  }
  catch(err) 
  {
    console.error(err);
    res.send(`Server error: ${err}`);
  }
});

// Update an invoice
router.put('/invoices', async (req, res) => 
{
  try 
  {
    await db.Invoices.update(
      {
        customer_id: 1,
        credit_total: req.body.credit_total,
        invoice_date: req.body.invoice_date,
        invoice_total: req.body.invoice_total
      },
      {
        where: 
        {
          invoice_id: req.body.invoice_id
        }
      }
    );
    res.send('Invoice Successfully Updated.');
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

//
// Rental info
//

// Don't know if we should really be exposing things like this, but the assignment said to make all records available.

// Get all rental info
router.get('/rentals', async (req, res) => 
{
  try 
  {
    const rentals = await db.Rental.findAll();
    const reply = rentals.length > 0 ? { data: rentals } : { message: 'no results found' };
    res.json(reply);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

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

// Add a new rental record
router.post('/rentals', async (req, res) => 
{
  const rentals = await db.Rental.findAll();
  const currentId = (await rentals.length) + 1;
  try 
  {
    const newRental = await db.Rental.create({
      confirmation_num: currentId,
      invoice_id: req.body.invoice_id,
      catalouge_id: req.body.catalogue_id,
      purchase_type: req.body.purchase_type,
      purchase_date: Sequelize.fn('NOW')
    });
    res.json(newRental);
  }
  catch(err) 
  {
    console.error(err);
    res.error('Server error');
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



// Studio

// Get all studios
router.get('/studios', async (req, res) => 
{
  try 
  {
    const studios = await db.Studios.findAll();
    const reply = studios.length > 0 ? { data: studios } : { message: 'no results found' };
    res.json(reply);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Get a specifc studio by id
router.get('/studios/:studio_id', async (req, res) => 
{
  try 
  {
    const studio = await db.Studios.findAll({
      where: 
      {
        studio_id: req.params.studio_id
      }
    });

    res.json(studio);
  } 
  catch (err) 
  {
    console.error(err);
    res.error('Server error');
  }
});

// Testing endpoint - make sure to remove before final submission
const testCustom = 'SELECT * FROM `genre`';
router.get('/test', async (req, res) => 
{
  try 
  {
    const result = await db.sequelizeDB.query(testCustom, {
      type: sequelize.QueryTypes.SELECT
    });
    res.json(result);
  } 
  catch (err) {
    console.error(err);
    res.error('Server error');
  }
});
export default router;
