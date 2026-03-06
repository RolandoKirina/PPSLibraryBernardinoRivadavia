import * as RoleRepository from "../../repositories/auth/RoleRepository.js";

export const getAllRoles = async () => {
    return await RoleRepository.getAll();
};

export const getRole = async (id) => {
    return await RoleRepository.getById(id);
};

export const createRole = async (role) => {
    return await RoleRepository.create(role);
};

export const updateRole = async (id, data) => {
    const updatedRole = await RoleRepository.update(id, data);
    if (!updatedRole) {
        throw new Error("Role not found or not updated");
    }
    return updatedRole;
};

export const deleteRole = async (id) => {
    const deletedRole = await RoleRepository.remove(id);
    if (!deletedRole) {
        throw new Error("Role not found or already deleted");
    }
    return deletedRole;
};
