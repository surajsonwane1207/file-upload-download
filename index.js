import express, { json } from "express"
import multer, { diskStorage } from "multer"
import fs from "fs"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
console.log(__filename);

const uploadedFiles = []
const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filname:(req,file,cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({storage:storage})

const app = express()

// app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))
app.use(json())
app.set('view engine', 'pug')

app.post("/",upload.single("upload-file"),(req,res)=>{
   const normalPath = path.normalize(req.file.path)
   
    console.log(uploadedFiles.length)
// fs.unlink()
    uploadedFiles.push(req.file.path)
    // res.redirect("/")
    res.send(`download at <a>${req.file.path}</a>`)
})
app.get('/', function (req, res) {
    const options = {
        root: path.join(__dirname, 'public'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    // console.log(req.hostname)
     res.sendFile(`C:/Users/suraj/OneDrive/Desktop/file-upload-download/public/index.html`)
});


app.listen(3000,()=>{
    console.log("server is running on port 3000")
})
