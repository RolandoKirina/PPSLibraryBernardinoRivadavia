import BookTypeGroupList from '../../models/options/BookTypeGroupList.js';
import BookTypeGroup from '../../models/options/BookTypeGroup.js';
import BookType from '../../models/options/BookType.js';

export const getAll = async () => {
    return await BookTypeGroupList.findAll({
        attributes: ['group', 'maxAmount'],
        include: [
            { 
                model: BookTypeGroup,
                attributes: ['groupId', 'bookTypeId'],
                include: [
                    {
                        model: BookType,
                        attributes: ['typeName', 'loanDays']
                    }
                ]
            }
        ]
    });
};

export const getOne = async (id) => {
    return await BookTypeGroupList.findByPk(id);
};

export const create = async (data) => {
    return await BookTypeGroupList.create(data);
};

export const update = async (id, updates) => {
    await BookTypeGroupList.update(updates, { where: { id } });
    return await BookTypeGroupList.findByPk(id);
};

export const remove = async (id) =>{
    const bookTypeGroupList = await BookTypeGroupList.findByPk(id);

      if (!bookTypeGroupList) {
        return null;
      }
    await bookTypeGroupList.destroy();
  
    return {
        msg: "BookTypeGroupList deleted successfully",
        data: bookTypeGroupList
    }
}

