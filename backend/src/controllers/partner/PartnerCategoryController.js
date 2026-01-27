import * as PartnerCategoryService from '../../services/partner/PartnerCategoryService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';
import { buildPartnerCategoryFilters } from '../../utils/buildPartnerCategoryFilters.js';

export const getAllPartnerCategories = async (req, res) => {
    try {
        const queryOptions = buildPartnerCategoryFilters(req.query); 
        const result = await PartnerCategoryService.getAllPartnerCategories(queryOptions);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getPartnerCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await PartnerCategoryService.getPartnerCategory(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `PartnerCategory with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createPartnerCategory = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid PartnerCategory body" });
        }

        const result = await PartnerCategoryService.createPartnerCategory(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }

        console.error("Server error:", error);

        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updatePartnerCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid PartnerCategory body" });
        }

        const result = await PartnerCategoryService.updatePartnerCategory(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }

        console.error("Server error:", error);

        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deletePartnerCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await PartnerCategoryService.removePartnerCategory(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted PartnerCategory with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
