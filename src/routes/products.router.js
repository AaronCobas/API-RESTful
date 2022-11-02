import { Router} from "express";
import productsManager from "../Managers/productManager.js"
import uploader from "../services/upload.js";
const router = Router()
const productsService = new productsManager();
router.post("/",uploader.single("thumbnail"),async (req,res)=>{
    const thumbnail = req.protocol+"://"+req.hostname+":8080/thumbnail/"+req.file.filename
    let product = req.body;
    product.thumbnail = thumbnail;
    const result = await productsService.save(product);
    res.send({status:"success", message:"Product added"});
})
router.get("/",async(req,res)=>{
    let result = await productsService.getAll()
    res.send(result)
})
router.get("/:id",async(req,res)=>{
    let id = req.params.id
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
    let result = await productsService.getById(id)
    res.send(result)
})
router.put("/api/productos/:id",async(req,res)=>{
    let id = req.params.id
    const newProduct = req.body.newProduct
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
    const oldProduct = await productsService.getById(id)
    res.send({objetoAnterior:oldProduct,nuevoTituloObjeto:newProductTitle,nuevoPrecioObjeto:newProductPrice, nuevaPortadaObjeto: newProductThumbnail})
})
router.delete("/api/productos/:id",async(req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
let result = await productsService.deleteById(id)
    res.send(result)
})
export default router