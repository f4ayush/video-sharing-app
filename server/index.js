const express= require("express")
const mongoose= require('mongoose')
const cors= require('cors')
const dotenv= require("dotenv")

dotenv.config()
const routes= require( './routes/index.js')


// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// use express router
app.use('/', routes);


const  MONGO_DB_URL = process.env.MONGO_DB_URL

const PORT = process.env.PORT || 5000

mongoose.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((e) => console.log(e))


