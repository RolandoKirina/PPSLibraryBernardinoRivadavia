import * as FeeRepository from "../../repositories/fee/FeeRepository.js";
import { getAll, create, update, remove } from "../../repositories/partner/PartnerRepository.js";
import { ValidationError } from "../../utils/errors/ValidationError.js";
import { changeUnpaidFees } from "../../repositories/partner/PartnerRepository.js";
import Partner from "../../models/partner/Partner.js";

export const getUnpaidFeesByPartner = async (id, filters) => {

    const fees = await FeeRepository.getUnpaidFeesByPartner(id, filters);
    return fees;
};


export const getAllFees = async (filters, listType) => {
    const fees = await FeeRepository.getAll(filters, listType);
    return fees;
};

// export const generateUnpaidFees = async (body) => {
//     if (!body) {
//         throw new Error("No se recibieron datos para generar cuotas");
//     }

//     const { month_and_year, amount, observation, date_of_paid } = body;

//     const [year, month, day] = month_and_year.split("-").map(Number);

//     const generatedFees = [];
//     const data = await getAll({ idState: 1 });

//     const partners = data.rows;

//     if (!month_and_year) {
//         throw new Error("El campo mes y año es obligatorio");
//     }

//     if (amount === undefined || amount === null || amount === "") {
//         throw new Error("El monto es obligatorio");
//     }

//     console.log(month_and_year, amount, observation, date_of_paid);

//     // for (const partner of partners) {

//     //     const existingFee = await FeeRepository.findOne({
//     //         idPartner: partner.id,
//     //         month,
//     //         year
//     //     });

//     //     if (existingFee) {
//     //         continue;
//     //     }
//     //     else {
//     //         const newFee = await FeeRepository.create({
//     //             idPartner: partner.id,
//     //             month,
//     //             year,
//     //             amount: amount ?? 0,
//     //             observation: observation ?? "",
//     //             paid: false,
//     //             date_of_paid: date_of_paid
//     //         });

//     //         generatedFees.push(newFee);
//     //     }
//     // }

//     /*if (generatedFees.length === 0) {
//         throw new Error(`Ya existen cuotas generadas para el mes ${month} y año ${year}`);
//     }*/

//     return {
//         message: "Cuotas generadas correctamente",
//         detail: generatedFees
//     };

// };

export const generateUnpaidFees = async (body) => {
    if (!body || !body.month_and_year || !body.amount) {
        throw new Error("Faltan datos obligatorios (fecha o monto)");
    }

    const { month_and_year, amount, observation } = body;
    const [year, month] = month_and_year.split("-").map(Number);

    const activePartners = await getAll({ 
        isActive: 1 
    });
    
    const partners = activePartners.rows;

    if (partners.length === 0) {
        throw new Error("No hay socios activos para generar cuotas");
    }

    const existingFees = await FeeRepository.findExistingFees(month, year);
    const partnersWithFee = new Set(existingFees.map(f => f.idPartner));

    const feesToCreate = partners
        .filter(partner => !partnersWithFee.has(partner.id))
        .map(partner => ({
            idPartner: partner.id,
            month,
            year,
            amount: amount,
            observation: observation || "",
            paid: false,
            date_of_paid: null 
        }));

    if (feesToCreate.length === 0) {
        return { message: "Todos los socios ya tienen su cuota generada para este periodo." };
    }

    const generatedFees = await FeeRepository.bulkCreate(feesToCreate);

    const newFeePartnerIds = feesToCreate.map(f => f.idPartner);
    
    await changeUnpaidFees("increment", newFeePartnerIds);

    return {
        message: `Se generaron ${generatedFees.length} cuotas exitosamente`,
        detail: generatedFees
    };
};

export const getFee = async (id) => {
    return await FeeRepository.getById(id);
};

export const getQuantityPaidFees = async (partnerNumber) => {
    return await FeeRepository.getQuantityPaidFees(partnerNumber);
}
export const updateFee = async (id, data) => {

    const fee = await FeeRepository.getById(id);

    if (!fee) {
        throw new ValidationError("Fee not found");
    }

    if (fee.paid === true) {
        if (data.paid === false || data.paid === "false") {
            throw new ValidationError("No se puede marcar como impaga una cuota ya pagada.");
        }
    }

    if (fee.paid === true && data.amount && Number(data.amount) !== fee.amount) {
        throw new ValidationError("No se puede modificar el monto de una cuota ya pagada.");
    }

    if (fee.paid === true) {
        if ((data.month && data.month !== fee.month) ||
            (data.year && data.year !== fee.year)) {
            throw new ValidationError("No se puede cambiar el período (mes/año) de una cuota pagada.");
        }
    }

    if ((data.paid === true || data.paid === "true")) {
        if (!data.date_of_paid) {
            throw new ValidationError("Debe ingresar una fecha de pago para marcar como pagada.");
        }

        await changeUnpaidFees("decrement", [data.partnerNumber]);
    }

    if (data.date_of_paid && isNaN(new Date(data.date_of_paid).getTime())) {
        throw new ValidationError("La fecha de pago no es válida.");
    }

    if (
        (data.paid === false || data.paid === "false") &&
        data.date_of_paid) {
        throw new ValidationError(
            "Una cuota impaga no puede tener fecha de pago."
        );
    }

    const updatedFee = await FeeRepository.update(id, data);

    if (!updatedFee) {
        throw new ValidationError("Fee not found or not updated");
    }

    return updatedFee;
};

export const changeState = async (id) => {

    const fee = await FeeRepository.getById(id);

    if (!fee) {
        throw new Error("Fee not found");
    }

    let newStatus = !fee.status;

    const updatedFee = await FeeRepository.update(id, {
        status: newStatus
    })

    if (!updatedFee) {
        throw new Error("Fee not found or not updated");
    }

    return updatedFee;
};

