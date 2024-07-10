const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', authRoutes); // Ensure this line is correct

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
