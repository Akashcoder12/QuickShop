 const express=require('express');
 const mongoose=require('mongoose');
 const dotenv=require('dotenv');
 const cors=require('cors');
const path = require('path');

dotenv.config();

const app=express();
//image
app.use('/images', express.static(path.join(__dirname, 'images')));

//middleware
app.use(express.json());
app.use(cors({
  origin: "https://quickkart-frontend.vercel.app", // your Vercel frontend URL
  credentials: true,
}));

//Routes
// ✅ Add this:
app.get('/', (req, res) => {
  res.send('API is running...');
});
const authRoutes=require("./routes/userRoutes");
const productRoutes=require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoutes");
const orderRoutes=require("./routes/orderRoutes");
app.use("/api",authRoutes)
app.use("/api/products",productRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/orders",orderRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDb Connection Error:", err));


 const PORT=process.env.PORT||5000

 app.listen(PORT,()=>{
     console.log(`Server running on http://localhost:${PORT}`);
 });
