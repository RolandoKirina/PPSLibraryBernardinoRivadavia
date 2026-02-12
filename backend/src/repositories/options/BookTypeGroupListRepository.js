import BookTypeGroupList from '../../models/options/BookTypeGroupList.js';
import BookTypeGroup from '../../models/options/BookTypeGroup.js';
import BookType from '../../models/options/BookType.js';
import sequelize from '../../configs/database.js';
import * as BookTypeGroupRepository from '../../repositories/options/BookTypeGroupRepository.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const getAll = async (filters = {}) => {
    const { limit, offset, where, order } = filters;

    const { rows: idsResult, count } = await BookTypeGroupList.findAndCountAll({
        where,
        attributes: ['bookTypeGroupListId'],
        limit,
        offset,
        order,
        distinct: true,
        col: 'bookTypeGroupListId'
    });

    const ids = idsResult.map(r => r.bookTypeGroupListId);

    if (!ids.length) {
        return {
            items: [],
            count
        };
    }

    const rows = await BookTypeGroupList.findAll({
        where: {
            bookTypeGroupListId: ids
        },
        attributes: ['bookTypeGroupListId', 'group', 'maxAmount'],
        include: [
            {
                model: BookTypeGroup,
                as: 'BookTypeGroups',
                attributes: ['BookTypeGroupListId', 'bookTypeId'],
                include: [
                    {
                        model: BookType,
                        as: 'BookType',
                        attributes: ['bookTypeId', 'typeName', 'loanDays']
                    }
                ]
            }
        ],
        order
    });

    return {
        rows,
        count
    };
};


export const getOne = async (id) => {
    return await BookTypeGroupList.findByPk(id);
};

export const create = async (data) => {
    if (!data.group.trim() || Number(data.amount) <= 0) {
        throw new ValidationError("Los campos grupo y cantidad no pueden estar vacíos");
    }

    const transaction = await sequelize.transaction();

    try {
        const groupData = {
            group: data.group,
            maxAmount: data.amount
        };

        const newBookTypeGroupList = await BookTypeGroupList.create(groupData, { transaction });

        const newBookTypeGroupListId = newBookTypeGroupList.dataValues.bookTypeGroupListId;

        const bookTypeGroups = data.normalizedBookTypes.map(bookType => ({
            BookTypeGroupListId: newBookTypeGroupListId,
            bookTypeId: bookType.bookTypeId
        }))

        await Promise.all(
            bookTypeGroups.map(bookTypeGroup => BookTypeGroupRepository.create(bookTypeGroup, transaction))
        );

        await transaction.commit();

        return {
            msg: "Grupo de material creado correctamente",
            newBookTypeGroupListId: newBookTypeGroupListId,
        };
    }
    catch (err) {
        await transaction.rollback();
        throw err;
    }


};

export const update = async (id, updates) => {
    if (!updates.group?.trim()) {
        throw new ValidationError("El campo grupo no puede estar vacío");
    }

    if (isNaN(updates.amount) || updates.amount <= 0) {
        throw new ValidationError("El campo cantidad debe ser un número válido");
    }

    const transaction = await sequelize.transaction();

    try {
        // 1) Actualizar el grupo principal
        await BookTypeGroupList.update(
            {
                group: updates.group,
                maxAmount: updates.amount
            },
            {
                where: { bookTypeGroupListId: id },
                transaction
            }
        );

        // 2) Eliminar los registros anteriores en TipoLibroGrupo
        await BookTypeGroup.destroy({
            where: { BookTypeGroupListId: id },
            transaction
        });

        // 3) Insertar los nuevos BookTypes asociados
        const newAssociations = updates.normalizedBookTypes.map(bookType => ({
            BookTypeGroupListId: id,
            bookTypeId: bookType.bookTypeId
        }));

        await Promise.all(
            newAssociations.map(assoc =>
                BookTypeGroupRepository.create(assoc, transaction)
            )
        );

        // 4) Confirmar cambios
        await transaction.commit();

        // 5) Retornar un mensaje coherente
        return {
            msg: "Grupo de material actualizado correctamente",
            updatedId: id
        };

    } catch (err) {
        await transaction.rollback();
        throw err;
    }
};


export const remove = async (id) => {
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

