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

    let defaultRole = await RoleRepository.getRoleByName('user');

    if (!defaultRole) {
        defaultRole = await RoleRepository.create({ name: 'user', description: 'Usuario de la biblioteca rivadavia' });
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

    const userToUpdate = await UserRepository.getById(id);
    if (!userToUpdate) {
        throw new ValidationError("Usuario no encontrado");
    }

    const updateData = { ...data };

    if (updateData.email && updateData.email !== userToUpdate.email) {
        const emailTaken = await existUser(updateData.email);
        if (emailTaken) {
            throw new ValidationError("El email ya está en uso por otro usuario");
        }
    }

    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updatedUser = await UserRepository.update(id, updateData);

    if (!updatedUser) {
        throw new Error("No se pudo actualizar el usuario");
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