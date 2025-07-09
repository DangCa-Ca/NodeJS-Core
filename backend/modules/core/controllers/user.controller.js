const userService = require("../services/user.service");

const db = require('../models'); // ✅ Nếu controller cùng cấp trong core

const { User, Post , Sequelize  } = db;



module.exports = {
    // Lấy danh sách users
    list: async (req, res) => {
        try {
            const users = await userService.list();
            res.json({
                status: 1,
                code: 200,
                message: "Danh sách users",
                data: users,
            });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Lỗi server", error: error.message });
        }
    },

    // Thêm user mới
    create: async (req, res) => {
        try {
            const newUser = await userService.create(req.body);
            res.json({
                status: 1,
                code: 201,
                message: "User đã được tạo",
                data: newUser,
            });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Lỗi server", error: error.message });
        }
    },

    // Lấy user theo ID
    getById: async (req, res) => {
          console.log("✅ Called: getById with id =", req.params.id);
        try {
            const user = await userService.getById(req.params.id);
            if (!user) {
                return res.status(404).json({ status: 0, message: "User không tồn tại" });
            }
            res.json({
                status: 1,
                code: 200,
                message: "Thông tin user",
                data: user,
            });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Lỗi server", error: error.message });
        }
    },
//     getProfile: async (req, res) => {
//         try {
//             const user = await userService.getProfile(req.user.id);
//             if (!user) {
//                 return res.status(404).json({ status: 0, message: "User không tồn tại" });
//             }
//             return res.json({
//                 status: 1,
//                 code: 200,
//                 message: "Thông tin user",
//                 data: user,
//             });
//         } catch (error) {
//             return res.status(500).json({ status: 0, message: "Lỗi server", error: error.message });
//         }
//     }
// ,    

    // Cập nhật user
update: async (req, res) => {
  try {
    let data = req.body;

    // ✅ Gán lại dữ liệu đúng kiểu
    data.role_id = parseInt(data.role_id);     // hoặc +data.role_id
    data.status = parseInt(data.status);

    // Lấy avatar cũ nếu cần
    const currentUser = await userService.update(req.params.id);

    if (req.file) {
      data.avatar = `/uploads/${req.file.filename}`;
    } else if (data.avatar) {
      // giữ nguyên data.avatar nếu là link
    } else {
      data.avatar = currentUser.avatar;
    }

    const updatedUser = await userService.update(req.params.id, data);

    res.json({
      status: 1,
      code: 200,
      message: 'User đã được cập nhật',
      data: updatedUser,
    });
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật user:', error);
    res
      .status(500)
      .json({ status: 0, message: 'Lỗi server', error: error.message });
  }
}
,



  getTopAuthors: async (req, res) => {
  try {
    const authors = await db.sequelize.query(`
      SELECT 
        users.id, 
        users.username, 
        users.avatar, 
        COUNT(posts.id) AS postCount
      FROM users
      LEFT JOIN posts 
        ON posts.user_id = users.id AND posts.status = 1
      GROUP BY users.id
      HAVING COUNT(posts.id) > 0
      ORDER BY postCount DESC
      LIMIT 5
    `, {
      type: db.Sequelize.QueryTypes.SELECT,
    });

    res.json({
      status: 1,
      code: 200,
      message: "Top authors fetched successfully",
      data: authors,
    });
  } catch (error) {
    console.error("❌ Error fetching top authors:", error);
    res.status(500).json({
      status: 0,
      code: 500,
      message: "Failed to fetch top authors",
      error: error.message,
    });
  }
},



    // Xóa user
    delete: async (req, res) => {
        try {
            await userService.delete(req.params.id);
            res.json({
                status: 1,
                code: 200,
                message: "User đã bị xóa",
            });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Lỗi server", error: error.message });
        }
    },
};
