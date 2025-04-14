const express = require('express');
const cors = require('cors');
const filterRoute = require('./routes/filter');

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/filter-triplets', filterRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});