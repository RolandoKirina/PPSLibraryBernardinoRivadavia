import * as UserRepository from "../../repositories/auth/UserRepository.js";

export const getAllUsers = async () => {
    return await UserRepository.getAll();
};

export const getUser = async (id) => {
    return await UserRepository.getById(id);
};

export const createUser = async (user) => {
    return await UserRepository.create(user);
};

export const updateUser = async (id, data) => {
    const updatedUser = await UserRepository.update(id, data);
    if (!updatedUser) {
        throw new Error("User not found or not updated");
    }
    return updatedUser;
};

export const deleteUser = async (id) => {
    const deletedUser = await UserRepository.remove(id);
    if (!deletedUser) {
        throw new Error("User not found or already deleted");
    }
    return deletedUser;
};
