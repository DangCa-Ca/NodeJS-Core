const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // hoặc config lưu filename, type...

const userController = require("../controllers/user.controller")
const roleController = require("../controllers/role.controller");
// const authMiddleware = require("../../auth/middleware/auth.middleware");

module.exports = function (app) {
    app.get(`/project/about`, (req, res) => {
        return res.json({
            status: 1,
            code: 200,
            message: 'BLOG API'
        })
    });

          // ✅ Thêm route mới ở đây
    app.get("/user/top-authors", userController.getTopAuthors);
    
    app.get('/user/list',
        [],
        (req, res) => {
            return userController.list(req, res)
        })

    // Thêm user mới
    app.post("/user/create", userController.create);
    // app.get("/user/profile", [authMiddleware], userController.getProfile);
    // Cập nhật user
    app.put("/user/:id",upload.single('avatar'), userController.update);

    // Xóa user
    app.delete("/user/:id",  userController.delete);


    // Lấy thông tin user t
    app.get("/user/:id", userController.getById);
    // Routes cho role
    app.get("/role/list",roleController.list);
    app.post("/role/create", roleController.create);
    app.get("/role/:id",roleController.getById);
    app.put("/role/:id",roleController.update);
    app.delete("/role/:id", roleController.delete);

  

};

