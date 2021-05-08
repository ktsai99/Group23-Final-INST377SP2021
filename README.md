# Green Box

## Description
Our project was created to provide consumers with on-demand movie and television content.
Some individuals may not use subscription services enough to justify paying the recurring fee.
Additionally, invididuals with low bandwidth may be unable to stream content effectively.
Our project aims to give users options to physically rent, stream, or purchase to own. 
This flexibility which is not present on popular platforms can cater to individuals' movie and television watching preferences.

![image](https://raw.githubusercontent.com/ktsai99/Group23-Final-INST377SP2021/main/image.png)

## Link to Website
[https://group23-final.herokuapp.com/](https://group23-final.herokuapp.com/)

## Target Browsers
* Windows NT 7/8/10
* Samsung Galaxy S8/9/10

## Links
* [Developer Manual]()

# Developer Manual
## How to install application and all dependencies
1. Clone this repository through Github Desktop or through Terminal.
2. Open repository in VSCode Terminal or Terminal application.
3. type ```npm install``` into terminal window and run.
4. The application should now be set to use.

## How to run application on a server
1. Open repository in VSCode terminal or Terminal application.
2. Run ```npm start```. There should be no errors.
3. In a web browser, go to url: ```http://localhost:3000/```.

## To run tests for software
The are no prewritten tests in the source repository, but you can use Cypress to run your own written tests.
1. Open two terminals and make sure you are in the main project directory
2. In the first terminal, run ```npm start```.
3. In the second terminal run ```npm test```.

## Server APIs
`/api/transaction` - API route for creating purchase transactions.
* POST - (Params (JSON): `catalogue_id`, `invoice_total`, `credit_total`, `purchase_type`) - Generates a new transaction based on the supplied information, inserting records into the database tables as appropriate. Returns a JSON object representing the newly created transaction.

`/api/transaction/:invoice_id` - API route for deleting purchase transactions.
* DELETE (Params (URL): `invoice_id`) - Deletes a transaction with the given invoice ID from the database. Returns "Sucessfully deleted". 

`api/movies` - API route for fetching movie information.
* GET - Returns a JSON object of information for all movies in the database.

`api/movies/:movie_id` - API route for fetching movie information for a specific movie.
* GET (Params (URL): `movie_id: ID of the specific movie requested`) - Returns a JSON object of information for the specified movie.

`api/movies/range/:range_start/:range_end` - API route for fetching movie information for a range of movies.
* GET (Params (URL): `range_start`, `range_end`) - Returns a JSON object of information for all movies in the specified range.

`api/count/r/:c_id` - API route for updating the rental counter for a specific movie, identified by `c_id`
* GET (Params (URL): `c_id`) - Increments the rental counter for the specified movie by 1. Returns "Count updated" upon sucessful update.

`api/count/p/:c_id` - API route for updating the purchase counter for a specific movie, identified by `c_id`
* GET (Params (URL): `c_id`) - Increments the purchase counter for the specified movie by 1. Returns "Count updated" upon sucessful update.

`api/genres` - API route for fetching genre information.
* GET - Returns a JSON object representing all movie genres in the database.


`api/genres/:genre_id` - API route for fetching genre information for a specific genre.
* GET (Params (URL): `genre_id`) - Returns a JSON object representing information for the specific genre.

`api/poster/image/:poster_id` - API route for fetching a movie poster link for a specific movie.
* GET (Params (URL): `poster_id`) - Returns a link to a poster for the specified movie.

## Known Bugs and Future Development
### Bugs:
* Results on the search page must be clicked twice in order to follow the link.
* The default picture is displayed on the movie-info page for a split-second before the correct image loads in from the database.


### Future Development: 
* Change the confirmation page to a popup window.
* Add more movies and TV shows to the database.
* Embed the search bar into the header instead of having it be a separate page.
