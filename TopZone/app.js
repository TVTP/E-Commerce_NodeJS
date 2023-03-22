const bodyParser = require('body-parser');
const express = require('express');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const dbConnect = require('./config/dbConnect');
const app = express()
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter=require('./routes/authRoute');
const productRouter=require('./routes/productRoute');
const categoryRouter=require('./routes/categoryRoute');
const blogRouter=require('./routes/blogRoute');
const blogCatRouter=require('./routes/blogCatRoute');
const brandRouter=require('./routes/brandRoute');
const voucherRouter=require('./routes/voucherRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

dbConnect();

var corsOptions = {
  origin: "",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: "Content-Type,Authorization,X-Requested-With",
  exposedHeaders: "Content-Range,X-Content-Range",
  credential: true,
}

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/blogcategory", blogCatRouter);
app.use("/api/brand", brandRouter);
app.use("/api/voucher", voucherRouter);


app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running at  PORT ${PORT}`);
});
