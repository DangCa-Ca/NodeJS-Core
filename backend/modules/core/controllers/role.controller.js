const roleService = require("../services/role.service");

module.exports = {
    // Lấy danh sách roles
    list: async (req, res) => {
        try {
            const roles = await roleService.list();
            res.json({
                status: 1,
                code: 200,
                message: "Danh sách roles",
                data: roles,
            });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Lỗi server", error: error.message });
        }
    },

    // Thêm role mới
    create: async (req, res) => {
        try {
            const newRole = await roleService.create(req.body);
            res.json({
                status: 1,
                code: 201,
                message: "Role đã được tạo",
                data: newRole,
            });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Lỗi tạo role", error: error.message });
        }
    },
    
    // Lấy role theo ID
    getById: async (req, res) => {
        try {
            const role = await roleService.getById(req.params.id);
            if (!role) {
                return res.status(404).json({ status: 0, message: "Role không tồn tại" });
            }
            res.json({
                status: 1,
                code: 200,
                message: "Thông tin role",
                data: role,
            });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Lỗi server", error: error.message });
        }
    },

    // Cập nhật role
    update: async (req, res) => {
        try {
            const updatedRole = await roleService.update(req.params.id, req.body);
            res.json({
                status: 1,
                code: 200,
                message: "Role đã được cập nhật",
                data: updatedRole,
            });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Lỗi server", error: error.message });
        }
    },

    // Xóa role
    delete: async (req, res) => {
        try {
            await roleService.delete(req.params.id);
            res.json({
                status: 1,
                code: 200,
                message: "Role đã bị xóa",
            });
        } catch (error) {
            res.status(500).json({ status: 0, message: "Lỗi server", error: error.message });
        }
    },
};
