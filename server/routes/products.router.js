const express= require('express');
const {createProduct,findProduct,getProducts} = require('../controllers/product.controller');

const router = express.Router();
const multer = require('multer');

/* FILE STORAGE */ 
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/assets');
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

router.get('/',getProducts);
router.post('/create', upload.single('productPicture'),createProduct);
router.get('/:id',findProduct);

module.exports = router;