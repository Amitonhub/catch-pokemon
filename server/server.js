require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const masterRoutes = require('./routes/masterRoutes');
const abilityRoutes = require('./routes/abilityRoutes');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDB();

app.use('/api/master', masterRoutes);
app.use('/api/ability', abilityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
