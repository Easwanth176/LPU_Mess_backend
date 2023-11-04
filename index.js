import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import formRoutes from './src/routes/formRoutes.js';
import submitForm from './src/routes/submitForm.js';
import Topics from './src/routes/topicRoutes.js'
import cors from 'cors';

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dbURI = 'mongodb+srv://easwanth123:AbYIaNzfzyeXEyaF@cluster0.bkvrbcv.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  // Print the name of the connected database
  console.log('Connected to MongoDB:', mongoose.connection.name);
  

  // Print the names of all collections in the connected database
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error('Error listing collections:', err);
    } else {
      console.log('Collections in the connected database:');
      collections.forEach((collection) => {
        console.log(collection.name);
      });
    }
  });
});

app.use(cors());

app.use('/', formRoutes);
app.use('/', submitForm);
app.use('/', Topics);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
