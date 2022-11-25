import { Router } from "express";
import { ProductController } from "../controller/productController";
import { UserController } from "../controller/userController";
import { authorization } from "../middleware/authentication"
import { upload } from "../middleware/multer";

const user = new UserController()
const product = new ProductController()

const router = Router();

router.post("/register", user.registration)
router.post("/login", user.login)

router.post("/upload", authorization,upload.single("image"), product.upload)
router.get("/get-product-image",product.getImage)
router.post("/create", authorization, product.create)
router.put("/update/:productId", authorization, product.update)
router.delete("/delete/:productId", authorization, product.delete)
router.get("/products", product.getProduct)

router.post("/toggleCart/:productId", authorization, product.toggleCart)
router.get("/getCartProducts", authorization, product.getCartProducts)

export default router;