import * as EmployeesRepository from '../../repositories/options/EmployeesRepository.js';

export const getAllEmployees = async () => {
    return await EmployeesRepository.getAll();
};

export const getEmployee = async (id) => {
    return await EmployeesRepository.getOne(id);
};

export const createEmployee = async (data) => {
    return await EmployeesRepository.create(data);
};

export const updateEmployee = async (id, updates) => {
    const existing = await EmployeesRepository.getOne(id);
    if (!existing) throw new Error("Employee not found");
    return await EmployeesRepository.update(id, updates);
};

export const removeEmployee = async (id) => {
    const existing = await EmployeesRepository.getOne(id);
    if (!existing) throw new Error("Employee not found");
    return await EmployeesRepository.remove(id);
};
