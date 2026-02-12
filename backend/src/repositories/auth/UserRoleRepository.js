import UserRole from "../../models/auth/UserRole.js";

export const getAll = async () => {
    return await UserRole.findAll();
};

export const getById = async (id) => {
    return await UserRole.findByPk(id);
};

export const create = async (userRole) => {
    return await UserRole.create(userRole);
};

export const update = async (id, userRole) => {
    const [rowsUpdated] = await UserRole.update(userRole, { where: { id } });
    if (rowsUpdated === 0) return null;
    return await UserRole.findByPk(id);
};

export const remove = async (id) => {
    const userRole = await UserRole.findByPk(id);
    if (!userRole) return null;
    await userRole.destroy();
    return { msg: "UserRole deleted successfully", data: userRole };
};
