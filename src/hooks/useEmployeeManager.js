import { useState, useEffect } from "react";

export const useEmployeeManager = (initialEmployees) => {
  const getStoredEmployees = () => {
    const stored = localStorage.getItem("employees");
    if (!stored || stored === "[]") {
      return initialEmployees;
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing employees:", error);
      return initialEmployees;
    }
  };

  const [employees, setEmployees] = useState(getStoredEmployees());

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // GET BY ID
  const getEmployee = (employeeId) => {
    const found = employees.find((employee) => employee.employeeId === employeeId);
    if (!found) console.warn(`Empleado con ID ${employeeId} no encontrado`);
    return found;
  };

  // CREATE
  const createEmployee = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  // UPDATE
  const updateEmployee = (employeeId, updatedData) => {
    setEmployees((prev) =>
      prev.map((employee) =>
        employee.employeeId === employeeId ? { ...employee, ...updatedData } : employee
      )
    );
  };

  // DELETE
  const deleteEmployee = (employeeId) => {
    setEmployees((prev) =>
      prev.filter((employee) => employee.employeeId !== employeeId)
    );
  };

  return {
    employees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
  };
};
