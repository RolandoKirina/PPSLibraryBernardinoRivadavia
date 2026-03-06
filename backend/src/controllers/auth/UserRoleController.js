import * as UserRoleService from "../../services/auth/UserRoleService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";

export const getAllUserRoles = async (req, res) => {
    try {
        const userRoles = await UserRoleService.getAllUserRoles();
        res.json(userRoles);
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "error" });
    }
};

export const getUserRole = async (req, res) => {
    try {
        const userRole = await UserRoleService.getUserRole(req.params.id);
        if (!userRole) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }
        res.status(HTTP_STATUS.OK.code).json(userRole);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createUserRole = async (req, res) => {
    try {
        const userRole = req.body;
        if (!userRole) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newUserRole = await UserRoleService.createUserRole(userRole);
        res.status(HTTP_STATUS.CREATED.code).json(newUserRole);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newUserRole = await UserRoleService.updateUserRole(id, updates);
        res.status(HTTP_STATUS.OK.code).json(newUserRole);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await UserRoleService.deleteUserRole(id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "UserRole not found" });
        }
        return res.status(HTTP_STATUS.OK.code).json(deleted);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
