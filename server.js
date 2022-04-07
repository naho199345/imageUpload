const express = require('express');
const multer = require('multer');
const { v4: uuid } = require('uuid');
// uuid 확인
// console.log('uuid', uuid())
const mime = require('mime-types');
const storage = multer.diskStorage({
    destination: (req, file, cd) => cd(null, './uploads'),
    filename: (req, file, cd) => cd(null, `${uuid()}.${mime.extension(file.mimetype)}`)
});
const upload = multer({
    storage, fileFilter: (req, file, cd) => {
        if (file.mimetype === ["image/jpeg", "image/png"]) cd(null, true)
        else cd(new Error('invaild file type.'), false);
    }
});

const app = express();
const PORT = 5000;

// 이 미들웨어가 있어야지 경로로 접근가능
app.use("/uploads", express.static("uploads"))

app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.json(req.file)
});

// 이미지 저장하기 전 필터 걸려주기

app.listen(PORT, () => console.log("Express server listening on PORT" + PORT));
