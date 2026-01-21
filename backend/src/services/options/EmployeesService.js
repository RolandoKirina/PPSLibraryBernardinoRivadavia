import * as EmployeesRepository from '../../repositories/options/EmployeesRepository.js';

export const getAllEmployees = async (filters) => {
    return await EmployeesRepository.getAll(filters);
};

export const getOneByCode = async (filters, code) => {
    return await EmployeesRepository.getOneByCode(filters, code);
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
