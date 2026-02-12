import User from "../../models/auth/User.js";

export const getAll = async () => {
    return await User.findAll();
};

export const getById = async (id) => {
    return await User.findByPk(id);
};

export const create = async (user) => {
    return await User.create(user);
};

export const update = async (id, user) => {
    const [rowsUpdated] = await User.update(user, { where: { id } });
    if (rowsUpdated === 0) return null;
    return await User.findByPk(id);
};

export const remove = async (id) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return { msg: "User deleted successfully", data: user };
};
