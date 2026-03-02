import User from "../../models/auth/User.js";
import UserRole from "../../models/auth/UserRole.js";
import * as RoleRepository from "./RoleRepository.js";
import * as UserRoleRepository from "./UserRoleRepository.js";
import sequelize from "../../configs/database.js";
import Role from "../../models/auth/Role.js";

export const getAll = async () => {
    const users = await User.findAll({
        subQuery: false,
        include: [
            {
                model: UserRole,
                as: 'UserRoles',
                required: true,
                include: [
                    {
                        model: Role,
                        as: 'Role',
                        required: true,
                    }
                ]
            }
        ]
    });

    return users.map(u => {
        const plainUser = u.get({ plain: true });
        return {
            userId: plainUser.id,
            fullname: plainUser.fullname,  
            email: plainUser.email,
            role: plainUser.UserRoles[0]?.Role?.name
        };
    });
};


export const getById = async (id) => {
    return await User.findByPk(id);
};

export const create = async (user, role) => {
    return await sequelize.transaction(async (t) => {

        const userData = await User.create(user, { transaction: t });

        await UserRole.create({
            userId: userData.id,
            roleId: role.id
        }, { transaction: t });

        return userData;
    });
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

export const existUser = async (email) => {
    const user = await User.findOne({
        where: { email },
        subQuery: false,
        include: [
            {
                model: UserRole,
                as: 'UserRoles',
                required: true,
                include: [
                    {
                        model: Role,
                        as: 'Role',
                        required: true,
                    }
                ]
            }
        ]
    });

    if (!user) return null;

    const plainUser = user.get({ plain: true });

    return {
        userId: plainUser.id,
        fullName: plainUser.fullName,
        password: plainUser.password,
        role: plainUser.UserRoles[0]?.Role?.name
    };
};
