import express from "express";
import mysql from "mysql2";
import cors from "cors";
import session from "express-session"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import jwt from "jsonwebtoken"
import { authMiddleware } from "./authMiddleware.js";


const app = express();
const PORT = 8080;
const secretKey = "Blyrae01"


app.use(express.json());
app.use(helmet())
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
    origin:["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
    optionsSuccessStatus: 204,
}))



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})




const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'auth',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// const dbConfig = {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'auth',
// };

// const db = mysql.createConnection(pool);

// db.connect((error) => {
//   if (error) {
//     console.error('Error connecting to MySQL database:', error);
//     return;
//   }
//   console.log('Connected to MySQL databasee!');
// })

const emailChecker = (req) => {
  return new Promise((resolve, reject) => {
    pool
      .promise()
      .query('SELECT * FROM `admin` WHERE `email` = ?', [req.body.email])
      .then(([result]) => {
        if (result.length > 0) {
          console.log('Email is already registered!' + result.length);
        } else {
          console.log('Email is available!');
        }
        resolve(result.length);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}


app.post('/signup', async (req, res) => {
  try {
    const emailResult = await emailChecker(req);

    if (emailResult > 0) {
      // Handle the case where the email is already registered
      res.status(401).json({ message: 'Email is already registered' });
    } else {
      // Proceed with user registration
      const result = await pool.promise().query
          ('INSERT INTO admin (`name`, `email`, `password`) VALUES (?, ?, ?)', [
          req.body.name,
          req.body.email,
          req.body.password,
        ]);

      const modResult = {...result, message: 'Success'}

      res.json(modResult);
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.post('/login', async (req, res) => {
 
  try {
    
    const result = await pool.promise().query
    ('SELECT `id`, `name` FROM `admin` WHERE `email` = ? AND `password` = ? ', [
      req.body.email,
      req.body.password
    ]);
    
   

    if(result[0].length > 0){
      // res.json({isLoggedIn: true, name: result[0][0].name})
      const {username} = result[0][0].name;
      console.log(result[0][0].name)
      const token = jwt.sign({username}, secretKey, {expiresIn: "1h"})
     
      res.cookie('session', token, {
        httpOnly: 'true',
        secure: false,
        sameSite: 'Lax',
        expires: new Date(Date.now() + 3600000),
      });

      res.status(200).json({...result[0], message: 'Login successful' });
    }else{
      res.status(401).json({ message: 'Invalid credentials' });
    }
    
   


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

})

// app.get('/', (req, res) => {
//   if(req.)
// })

app.get('/protected', authMiddleware, (req, res) => {
  

  if (req.user) {
    console.log("IFs")
    res.json({ 
      isValid: true,
      message: `Helloooo, ${req.user.username}! This is a protected route.` 
    });
    
  } else {
    console.log("ELSE")
    res.status(401).json({ message: 'Unauthorized Access ELSE'});
  }
});





  process.on('SIGINT', () => {
    pool.end((endError) => {
      if (endError) {
        console.error('Error closing MySQL connection:', endError);
      } else {
        console.log('MySQL connection closed.');
      }
      process.exit(0);
    });
  });


