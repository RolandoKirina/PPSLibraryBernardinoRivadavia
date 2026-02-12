import Role from "../../models/auth/Role.js";

export const getAll = async () => {
    return await Role.findAll();
};

export const getById = async (id) => {
    return await Role.findByPk(id);
};

export const create = async (role) => {
    return await Role.create(role);
};

export const update = async (id, role) => {
    const [rowsUpdated] = await Role.update(role, { where: { id } });
    if (rowsUpdated === 0) return null;
    return await Role.findByPk(id);
};

export const remove = async (id) => {
    const role = await Role.findByPk(id);
    if (!role) return null;
    await role.destroy();
    return { msg: "Role deleted successfully", data: role };
};
