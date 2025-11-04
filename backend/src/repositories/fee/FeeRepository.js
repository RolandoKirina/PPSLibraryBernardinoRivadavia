import Fees from "../../models/fee/Fee.js";
import Partner from "../../models/partner/Partner.js";

export const getAll = async (filters) => {
    const {
       wherePartner,
        whereFees,

    } = filters;

     return await Fees.findAll({
        include: [
        {
            model: Partner,
            as: "Partner",
            where: 
            wherePartner           
        }
        ],
        where: whereFees
        
  });
};

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
