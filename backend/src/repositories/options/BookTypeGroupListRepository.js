import BookTypeGroupList from '../../models/options/BookTypeGroupList.js';
import BookTypeGroup from '../../models/options/BookTypeGroup.js';
import BookType from '../../models/options/BookType.js';

export const getAll = async () => {
    return await BookTypeGroupList.findAll({
        attributes: ['bookTypeGroupListId', 'group', 'maxAmount'],
        include: [
            { 
                model: BookTypeGroup,
                attributes: ['BookTypeGroupListId', 'bookTypeId'],
                include: [
                    {
                        model: BookType,
                        attributes: ['bookTypeId', 'typeName', 'loanDays']
                    }
                ]
            }
        ]
    });
};

export const getLastId = async () => {
    const lastId = await BookTypeGroupList.findAll({
        attributes: ["bookTypeGroupListId"],
        order: [["bookTypeGroupListId", "DESC"]],
        limit: 1
    });

    if(lastId) {
        return lastId[0].bookTypeGroupListId;
    }
};

export const getOne = async (id) => {
    return await BookTypeGroupList.findByPk(id);
};

export const create = async (data) => {
    return await BookTypeGroupList.create(data);
};

export const update = async (id, updates) => {
    await BookTypeGroupList.update(updates, { where: { bookTypeGroupListId: id } });
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

