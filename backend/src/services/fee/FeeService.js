import * as FeeRepository from "../../repositories/fee/FeeRepository.js";
import { getAll, create, update, remove }  from "../../repositories/partner/PartnerRepository.js";
// Uso
export const getAllFees = async (filters) => {
    const fees = await FeeRepository.getAll(filters);
    return fees;
};

export const generateUnpaidFees = async (body) => {
  if (!body) {
    throw new Error("No se recibieron datos para generar cuotas");
  }

  const { month_and_year, amount, observation, date_of_paid } = body;

  const [year, month, day] = month_and_year.split("-").map(Number);

  const generatedFees = [];
  const partners = await getAll();

  for (const partner of partners) {
    const existingFee = await FeeRepository.findOne({
      idPartner: partner.id,
      month,
      year
    });

    if (existingFee) continue;

    const newFee = await FeeRepository.create({
      idPartner: partner.id,
      month,
      year,
      amount: amount ?? 0,
      observation: observation ?? "",
      paid: false,
      date_of_paid: date_of_paid
    });

    generatedFees.push(newFee);
  }

    if (generatedFees.length === 0) {
      throw new Error(`Ya existen cuotas generadas para el mes ${month} y año ${year}`);
    }
    
  return {
    message: "Cuotas generadas correctamente",
    detail: generatedFees
  };

};


export const getFee = async (id) => {
    return await FeeRepository.getById(id);
};

export const createFee = async (fee) => {
    return await FeeRepository.create(fee);
};

export const getQuantityPaidFees = async (partnerNumber) =>{
    return await FeeRepository.getQuantityPaidFees(partnerNumber);
}
export const updateFee = async (id, data) => {
    const updatedFee = await FeeRepository.update(id, data);
    if (!updatedFee) {
        throw new Error("Fee not found or not updated");
    }
    return updatedFee;
};

export const deleteFee = async (id) => {
    const deletedFee = await FeeRepository.remove(id);
    if (!deletedFee) {
        throw new Error("Fee not found or already deleted");
    }
    return deletedFee;
};
