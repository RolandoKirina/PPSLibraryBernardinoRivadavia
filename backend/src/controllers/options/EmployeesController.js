import * as EmployeesService from '../../services/options/EmployeesService.js';

export const getAllEmployees = async (req, res) => {
    try {
        const result = await EmployeesService.getAllEmployees();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) return res.status(400).json({ msg: "Invalid id" });

        const result = await EmployeesService.getEmployee(id);
        if (!result) return res.status(404).json({ msg: `Employee with id: ${id} not found` });

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createEmployee = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({ msg: "Invalid body" });

        const result = await EmployeesService.createEmployee(data);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!id || isNaN(Number(id))) return res.status(400).json({ msg: "Invalid id" });
        if (!updates) return res.status(400).json({ msg: "Invalid body" });

        const result = await EmployeesService.updateEmployee(id, updates);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) return res.status(400).json({ msg: "Invalid id" });

        await EmployeesService.removeEmployee(id);
        res.status(200).json({ msg: `Successfully deleted Employee with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
