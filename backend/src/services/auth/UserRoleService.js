import * as UserRoleRepository from "../../repositories/auth/UserRoleRepository.js";

export const getAllUserRoles = async () => {
    return await UserRoleRepository.getAll();
};

export const getUserRole = async (id) => {
    return await UserRoleRepository.getById(id);
};

export const createUserRole = async (userRole) => {
    return await UserRoleRepository.create(userRole);
};

export const updateUserRole = async (id, data) => {
    const updatedUserRole = await UserRoleRepository.update(id, data);
    if (!updatedUserRole) {
        throw new Error("UserRole not found or not updated");
    }
    return updatedUserRole;
};

export const deleteUserRole = async (id) => {
    const deletedUserRole = await UserRoleRepository.remove(id);
    if (!deletedUserRole) {
        throw new Error("UserRole not found or already deleted");
    }
    return deletedUserRole;
};
