import * as UserRepository from "../../repositories/auth/UserRepository.js";
import * as RoleRepository from "../../repositories/auth/RoleRepository.js";
import { ValidationError } from "../../utils/errors/ValidationError.js";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
    return await UserRepository.getAll();
};

export const getUser = async (id) => {
    return await UserRepository.getById(id);
};

export const createUser = async (user) => {
    if (!user.fullName || !user.email || !user.password) {
        throw new ValidationError('Todos los campos deben estar completos');
    }

    const existingUser = await existUser(user.email);

    if (existingUser) {
        throw new ValidationError('El usuario ya existe');
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);

    let defaultRole = await RoleRepository.getRoleByName('Usuario');

    if (!defaultRole) {
        defaultRole = await RoleRepository.create({ name: 'Usuario', description: 'Usuario de la biblioteca rivadavia' });
    }

    const role = await RoleRepository.getRoleByName(user.role);

    const safeUser = {
        ...user,
        password: hashedPassword,
    };

    if (!role) {
        return await UserRepository.create(safeUser, defaultRole);
    }
    else {
        return await UserRepository.create(safeUser, role);
    }

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

export const existUser = async (email) => {
    return await UserRepository.existUser(email);
};

export const loginUser = async (userData) => {
    if (!userData.email || !userData.password) {
        throw new ValidationError('Todos los campos deben estar completos');
    }

    const existingUser = await existUser(userData.email);

    if (!existingUser) {
        throw new ValidationError('El usuario no existe');
    }

    if (existingUser && (await bcrypt.compare(userData.password, existingUser.password))) {
        return existingUser;
    }

};