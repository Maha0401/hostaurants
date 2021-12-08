****Hostaurants**** is the app that makes booking personal chef easy for both users and chefs.

It's also my capstone project for BrainStation's full-stack bootcamp. We were tasked to ideate, plan, and execute a full-stack application within two weeks. Hostaurants was made using create-react-app, react-router, and SASS for the front end, a Node/Express backend API with JWT for auth, and Knex to query a MySQL database. At least for now. We'll see how things change as I continue to build on it.

Thanks for stopping by. 
—Maha (2021-12-10)
 
 
![image](https://user-images.githubusercontent.com/91100108/145144645-6c2e52df-8aba-4ce5-b2d9-81e43b2bf7c7.png)


****Installation****
Follow these steps to run a local instance of Ribbon:
(You'll need node, npm, and MySQL already installed.)
1.	Clone or download this repo.
2.	
**Set up the backend**
2.	Create a new database in MySQL called hostaurants.
3.	Install server dependencies:
Run npm install from inside the server directory.
$ cd server
$ npm install
4.	Run migrations
$ npx knex migrate:latest
5.	Run seeds
$ npx knex seed:run
6.	Set environment variables:
Rename .env_sample to .env and change placeholder values with your own.
PORT=8080
JWT_SECRET=<SECRET KEY>
7.	Start the server:
$ npx nodemon server.js
 
**Set up the frontend**
8.	Install client dependencies:
Run npm install from inside the client directory.
$ cd ../client
$ npm install
9.	Start the React app:
$ npm start
