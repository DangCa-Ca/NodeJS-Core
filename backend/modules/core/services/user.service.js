const model = require("../../../configs/models");
const userModel = model.User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userService = {
    // Lấy danh sách users
    list: async () => {
        try {
            return await userModel.findAll();
        } catch (error) {
            throw new Error("Lỗi khi lấy danh sách users");
        }
    },

    // Thêm user mới
    create: async (userData) => {
        try {
            // Giải cấu trúc dữ liệu
            const { username, email, password, role_id, avatar } = userData;

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Tạo user với mật khẩu đã mã hóa
            return await userModel.create({
                username,
                email,
                password: hashedPassword,
                role_id,
                avatar,
            });
        } catch (error) {
            console.error("Lỗi khi tạo user:", error);
            throw new Error(error.message);
        }
    },
    // Lấy thông tin user theo ID
    getById: async (id) => {
        try {
            return await userModel.findByPk(id);
        } catch (error) {
            throw new Error("Lỗi khi lấy user theo ID");
        }
    },
    // getProfile: async (id) => {
    //     try {
    //         return await userModel.findByPk(id);
    //     } catch (error) {
    //         throw new Error("Lỗi khi lấy user theo ID");
    //     }
    // },

    // Cập nhật user
    update: async (id, data) => {
        try {
            await userModel.update(data, { where: { id } });
            return await userModel.findByPk(id);
        } catch (error) {
            throw new Error("Lỗi khi cập nhật user");
        }
    },

    // Xóa user
    delete: async (id) => {
        try {
            return await userModel.destroy({ where: { id } });
        } catch (error) {
            throw new Error("Lỗi khi xóa user");
        }
    },
};

module.exports = userService;
