import Authors from '../../models/author/Authors.js';

export const getAll = async () => {
    return await Authors.findAll();
};

export const getOne = async (id) => {
    return await Authors.findByPk(id);
};

export const create = async (author) => {
    return await Authors.create(author);
};

// A diferencia de patch, los updates deben tener todos los campos de la entidad
export const update = async (id, updates) => {
    await Authors.update(updates, {
        where: { id: id }
    });

    return await Authors.findByPk(id);
};

export const remove = async (id) =>{
    const author = await Authors.findByPk(id);

      if (!author) {
        return null;
      }
    await author.destroy();
  
    return {
        msg: "Author deleted successfully",
        data: author
    }
}
