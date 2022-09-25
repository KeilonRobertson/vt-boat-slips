# VT Boat Slips

API Application for Virginia Tech <br />

### How to get set up?

- Run:

```
npm install
```

- Run 'npm start' to run the server.
- Run 'npm test' to test the routes and functionality.

### Files / Directories

- **/routes** : Contains all the routes created and routes that will be created. Possibility to split up into different folders depending on future complexity
- **/public** : Contains the main page and a possible UI to interact with
- **/tests** : Contains all tests created

### Notes

- Uses Node and Express for access to a simple server and built-in API functions. If a connection to a cloud database is required, there will be several packages to help out with the transition.
- .json file was used for ease of testing, however, in production, and as the need for scaling will demand, a simple NoSQL database like MongoDB or a cloud service like AWS or Firebase will be a better choice for persistent storage of boat slips.
- All API request types were added in a single file 'boat-slips.js' in the routes folder to ensure all functionality for the same route were in a single place. As more routes are added and current routes updated, this will make for an easier time in maintaining the codebase.
- Jest and Supertest were used for testing. Jest makes for a maintainable way to write tests and Supertest gives access to several API functionality, making it easier to test API's.

### Authors

- **Keilon Robertson**

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
