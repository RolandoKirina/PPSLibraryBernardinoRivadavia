import * as LoanRepository from '../../repositories/loan/LoanRepository.js';
import * as EmployeesRepository from '../../repositories/options/EmployeesRepository.js';
import * as PartnerRepository from '../../repositories/partner/PartnerRepository.js';
import * as LoanBookRepository from '../../repositories/loan/LoanBookRepository.js';
import * as LoanTypeRepository from '../../repositories/loan/LoanTypeRepository.js';
import sequelize from '../../configs/database.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const getAllLoans = async (filters) => {
    return await LoanRepository.getAll(filters);
}

export const getLoanPrintList = async (option) => {
    let loans = [];

    switch(option) {
        case 'return': {
            loans = await LoanRepository.getReturnPrintList();
            break;
        }
        case 'phone': {
            loans = await LoanRepository.getPhonePrintList();
            break;
        }
        case 'partner': {
            loans = await LoanRepository.getPartnerPrintList();
            break;
        }
        default: {
            
        }
    }

    return loans;
}


export const getAllReturns= async (filters) => {
    return await LoanRepository.getAllReturns(filters);
}

export const getLoan = async (id) => {
    return await LoanRepository.getOne(id);
}

export const createLoan = async (data) => {
    
   if (!data.books || data.books.length === 0) {
      throw new ValidationError("No se puede crear un préstamo sin libros");
    }
    if (!data.employeeCode?.trim()) {
      throw new ValidationError("El campo código de empleado no puede estar vacío");
    }
    if (!data.retiredDate?.trim()) {
      throw new ValidationError("El campo fecha de retiro no puede estar vacío");
    }
    if (!data.expectedDate?.trim()) {
      throw new ValidationError("El campo fecha prevista no puede estar vacío");
    }
    if (!data.partnerNumber?.trim()) {
      throw new ValidationError("El campo numero de socio no puede estar vacío");
    }

    const transaction = await sequelize.transaction();
    try {
      const loanType = await LoanTypeRepository.getOneByDescription("retired");
      if (!loanType) {
        throw new ValidationError(`No existe un tipo de préstamo con la descripción "retired"`);
      }

      const employee = await EmployeesRepository.getOneByCode(data.employeeCode);
      if (!employee) {
        throw new ValidationError("Empleado no existe");
      }

      const partner = await PartnerRepository.getOneByPartnerNumber(data.partnerNumber);
      if (!partner) {
        throw new ValidationError("Socio no existe");
      }

      const loanData = {
        partnerId: partner.id,
        loanType: loanType.id,
        retiredDate: data.retiredDate,
        employeeId: employee.id,
        name: partner.name,
      };

      const newLoan = await LoanRepository.create(loanData, transaction);

      const loanBooks = data.books.map(book => ({
        BookId: book.BookId,
        loanId: newLoan.id,
        bookCode: book.codeInventory,
        expectedDate: data.expectedDate,
        reneweAmount: 0,
        returned: false,
      }));

      await Promise.all(
        loanBooks.map(book => LoanBookRepository.create(book, transaction))
      );

      await transaction.commit();

      return {
        msg: "Préstamo creado correctamente",
        loanId: newLoan.id,
        partnerNumber: data.partnerNumber
      };
    } catch (err) {
      if (!transaction.finished) {
        await transaction.rollback();
      }
      throw err;
    }
  
}

export const updateLoan = async (id, updates) => {
    const existingLoan = await LoanRepository.getOne(id);

    if (!existingLoan) throw new Error("Loan not found");

    return await LoanRepository.update(id, updates);
}

export const removeLoan = async (id) => {
    const existingLoan = await LoanRepository.getOne(id);
    
    if (!existingLoan) throw new Error("Loan not found");

    return await LoanRepository.remove(id);
}

export const getLoansByEmployeeCount = async (filters) => {
    return await LoanRepository.getLoansByEmployeeCount(filters);
}