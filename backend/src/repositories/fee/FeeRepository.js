import Fees from "../../models/fee/Fee.js";
import Partner from "../../models/partner/Partner.js";

export const getAll = async (filters) => {
    const {
       wherePartner,
       whereFees,
    } = filters;
    const fees = await Fees.findAll({
    required: true,
    include: [
      {
        model: Partner,
        as: "Partner",
        where: wherePartner
      }
    ],
    where: whereFees
  });

  const quantitypaidfees = await getQuantityPaidFees(filters);
  const groupedFees = fees.map(fee => ({
        feeId: fee.id,
        month: fee.month,
        year: fee.year,
        amount: fee.amount,
        paid: fee.paid,
        observation: fee.observation || '',
        dateOfPaid: fee.date_of_paid || '',
        partnerId: fee.Partner?.id ?? null,
        partnerNumber: fee.Partner?.partnerNumber ?? '',
        name: `${fee.Partner?.name ?? ''} ${fee.Partner?.surname ?? ''}`.trim(),
        surname: fee.Partner?.surname ?? '',
        homePhone: fee.Partner?.homePhone ?? '',
        homeAddress: fee.Partner?.homeAddress ?? '',
        quantitypaidfees: quantitypaidfees ?? '',
    }));

      return groupedFees;
};
 export const  getQuantityPaidFees = async (filters) => {
   const { wherePartner} = filters;

  const count = await Fees.count({
    include: [
      {
        model: Partner,
        as: "Partner",
        required: true,
        where: wherePartner,
      },
    ],
   whereFees: { paid: true }, 
  });

  return count;
}

export const getById = async (id) => {
    return await Fees.findByPk(id);
};

export const create = async (fee) => {
    return await Fees.create(fee);
};

export const update = async (id, fee) => {
    const [rowsUpdated] = await Fee.update(fee, { where: { id } });
    if (rowsUpdated === 0) {
        return null;
    }
    return await Fees.findByPk(id);
};

export const remove = async (id) => {
    const fee = await Fees.findByPk(id);

    if (!fee) {
        return null;
    }
    await fee.destroy();

    return {
        msg: "Fee deleted successfully",
        data: fee
    };
};
