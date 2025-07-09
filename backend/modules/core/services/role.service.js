const model = require("../../../configs/models");
const roleModel = model.Role; // Kiểm tra Role có đúng tên trong models không

const roleService = {
    // Lấy danh sách roles
    list: async () => {
        try {
            return await roleModel.findAll();
        } catch (error) {
            throw new Error("Lỗi khi lấy danh sách roles");
        }
    },

    // Thêm role mới
    create: async (roleData) => {
        try {
            return await roleModel.create(roleData);
        } catch (error) {
            console.error(" Lỗi khi tạo role:", error);
            throw new Error(error.message);
        }
    },

    // Lấy role theo ID
    getById: async (id) => {
        try {
            return await roleModel.findByPk(id);
        } catch (error) {
            throw new Error("Lỗi khi lấy role theo ID");
        }
    },

    // Cập nhật role
    update: async (id, data) => {
        try {
            await roleModel.update(data, { where: { id } });
            return await roleModel.findByPk(id);
        } catch (error) {
            throw new Error("Lỗi khi cập nhật role");
        }
    },

    // Xóa role
    delete: async (id) => {
        try {
            return await roleModel.destroy({ where: { id } });
        } catch (error) {
            throw new Error("Lỗi khi xóa role");
        }
    },
};

module.exports = roleService;
