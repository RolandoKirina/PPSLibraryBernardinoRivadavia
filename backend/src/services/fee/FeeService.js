import * as FeeRepository from "../../repositories/fee/FeeRepository.js";
import { getAll, create, update, remove } from "../../repositories/partner/PartnerRepository.js";
import { ValidationError } from "../../utils/errors/ValidationError.js";
import { changeUnpaidFees } from "../../repositories/partner/PartnerRepository.js";
import Partner from "../../models/partner/partner.js";

const MONTH_NAMES = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
];

export const getYearlyReport = async (partnerNumber, year, semester) => {
    const fees = await FeeRepository.getYearlyReport(partnerNumber, year, semester);

    // Si no hay cuotas, buscamos al socio para no devolver null
    if (!fees || fees.length === 0) {
        // Buscamos al socio por su número para devolver su nombre al menos
        const partner = await Partner.findOne({ where: { partnerNumber } });
        if (!partner) return null; // Si ni el socio existe, ahí sí devolvemos null

        return {
            Partner: {
                fullName: `${partner.surname} ${partner.name}`,
                partnerNumber: partner.partnerNumber
            },
            Fees: [] // Array vacío porque está al día
        };
    }

    const partnerInfo = fees[0].Partner;

    return {
        Partner: {
            fullName: `${partnerInfo.surname} ${partnerInfo.name}`,
            partnerNumber: partnerInfo.partnerNumber
        },
        Fees: fees.map(f => ({
            month: MONTH_NAMES[f.month - 1],
            monthNumber: f.month, // <--- CRUCIAL para el filtro del frontend
            year: f.year,
            amount: f.amount
        }))
    };
};

export const getUnpaidFeesByPartner = async (id, filters) => {
    const fees = await FeeRepository.getUnpaidFeesByPartner(id, filters);
    return fees;
};

export const searchGlobalUnpaidFees = async (filters) => {
    const result = await FeeRepository.searchGlobalUnpaidFees(filters);
    return result;
};

export const getAllFees = async (filters) => {
    const fees = await FeeRepository.getAll(filters);
    return fees;
};

export const getFeesTypeOne = async (filters) => {
    return await FeeRepository.getAllFeesTypeOne(filters);
};

export const getFeesTypeTwo = async (filters) => {
    return await FeeRepository.getAllFeesTypeTwo(filters);
};

export const generateUnpaidFees = async (body) => {
    if (!body || !body.month || !body.year) {
        throw new Error("Faltan datos obligatorios (mes o año)");
    }

    const { month, year, observation } = body;

    const activePartners = await getAll({
        isActive: 1,
        includeCategory: true
    });

    const partners = activePartners.rows;

    if (partners.length === 0) {
        throw new Error("No hay socios activos para generar cuotas");
    }

    const existingFees = await FeeRepository.findExistingFees(month, year);
    const partnersWithFee = new Set(existingFees.map(f => f.idPartner));

    const feesToCreate = partners
        .filter(partner => !partnersWithFee.has(partner.id))
        .map(partner => {
            const categoryAmount = partner.PartnerCategory?.amount;

            if (!categoryAmount) {
                throw new Error(`El socio ${partner.id} no tiene categoría o importe definido`);
            }

            return {
                idPartner: partner.id,
                month,
                year,
                amount: categoryAmount,
                observation: observation || "",
                paid: false,
                date_of_paid: null,
                createdAt: new Date(),
                periodDate: new Date(Date.UTC(year, month - 1, 1))
            };
        });

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

