import * as FeeRepository from "../../repositories/fee/FeeRepository.js";
import { getAll, create, update, remove }  from "../../repositories/partner/PartnerRepository.js";


export const getUnpaidFeesByPartner = async (id) => {

    const fees = await FeeRepository.getUnpaidFeesByPartner(id);
    return fees;
};

    
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

    const fee = await FeeRepository.getById(id);
    if (!fee) {
        throw new Error("Fee not found");
    }

    if (fee.paid === true) {
        if (data.paid === false || data.paid === "false") {
            throw new Error("No se puede marcar como impaga una cuota ya pagada.");
        }
    }

     if (fee.paid === true && data.amount && Number(data.amount) !== fee.amount) {
        throw new Error("No se puede modificar el monto de una cuota ya pagada.");
    }

     if (fee.paid === true) {
        if ((data.month && data.month !== fee.month) ||
            (data.year && data.year !== fee.year)) {
            throw new Error("No se puede cambiar el período (mes/año) de una cuota pagada.");
        }
    }


     if ((data.paid === true || data.paid === "true")) {
        if (!data.date_of_paid) {
            throw new Error("Debe ingresar una fecha de pago para marcar como pagada.");
        }
    }

    if (data.date_of_paid && isNaN(new Date(data.date_of_paid).getTime())) {
        throw new Error("La fecha de pago no es válida.");
    }

if (
  (data.paid === false || data.paid === "false") &&
  data.date_of_paid) {
  throw new Error(
    "Una cuota impaga no puede tener fecha de pago."
  );
}

    
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
