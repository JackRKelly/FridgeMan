# FridgeMan
#### A Full-Stack food inventory management application built using React.js, Node.js, Express.js, and PostgreSQL.
***
## Build Instructions:

### Database Setup:
1. Login to PostgreSQL
```
psql -Upostgres
```
2. Create Fridge Man database, and connect to the database.
```
CREATE DATABASE fridgeman;
\c fridgeman
```
3. Create stock, users, and location tables.
```
CREATE TABLE stock {
  stock_id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  quantity integer NOT NULL,
  location varchar(50) NOT NULL,
  expiration varchar(300) NOT NULL,
  email varchar(150) NOT NULL
};

CREATE TABLE users {
  id SERIAL PRIMARY KEY,
  email varchar(150) UNIQUE NOT NULL,
  password varchar(255) NOT NULL
};

CREATE TABLE location {
  location_id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  email varchar(150) NOT NULL
};
```

### Client & Server Setup:
1. Clone the source repository from Github.
```
git clone https://github.com/JackRKelly/FridgeMan.git
```

2. Navigate to server directory, install server dependencies, create env file (You will have to manually edit the env file to fit your credentials).
```
cd FridgeMan/server
npm install
call touch .env
echo import DB_USER=postgres >> .env
echo import DB_PASSWORD=PASSWORD >> .env
echo import DB_NAME=DB_NAME >> .env
echo import SECRET=SECRET_KEY >> .env
echo import SALT_LENGTH=10 >> .env
```

3. Navigate to client directory and install dependencies and create production build
```
cd ../client
npm install
npm run build
```

4. Start server and view at http://localhost:5000 (port defined in /server/index.js)
```
cd ../server
nodemon index
```

***
### Screenshots:

![Home Page](https://i.ibb.co/Qn8Zk2J/Home.png "Home Page")
![Signup Page](https://i.ibb.co/2SZnKH2/Signup.png "Signup Page")
![Login Page](https://i.ibb.co/TbxtjSH/Login.png "Login Page")
![Navigation Menu](https://i.ibb.co/NF4trK4/Menu.png "Navigation Menu")
![Stocks Page](https://i.ibb.co/vz5vVn5/Stock-List.png "Stocks Page")
![Locations Page](https://i.ibb.co/gJSN6P0/Location-List.png "Locations Page")


