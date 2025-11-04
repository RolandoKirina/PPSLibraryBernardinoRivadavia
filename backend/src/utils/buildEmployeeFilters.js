import { Op } from "sequelize";

export const buildEmployeeFilters = (query) => {
    const {
        code
    } = query;

    const whereEmployee = {};

    if (code) whereEmployee.code = code;

    console.log(whereEmployee);

    return {
        whereEmployee
    };

}