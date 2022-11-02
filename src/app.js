import express from "express"
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js"
const app = express();
app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use("/api/productos",productsRouter);
app.listen(8080, ()=>console.log("Escuchando"))
