import * as RoleService from "../../services/auth/RoleService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";

export const getAllRoles = async (req, res) => {
    try {
        const roles = await RoleService.getAllRoles();
        res.json(roles);
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "error" });
    }
};

export const getRole = async (req, res) => {
    try {
        const role = await RoleService.getRole(req.params.id);
        if (!role) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }
        res.status(HTTP_STATUS.OK.code).json(role);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createRole = async (req, res) => {
    try {
        const role = req.body;
        if (!role) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newRole = await RoleService.createRole(role);
        res.status(HTTP_STATUS.CREATED.code).json(newRole);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newRole = await RoleService.updateRole(id, updates);
        res.status(HTTP_STATUS.OK.code).json(newRole);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await RoleService.deleteRole(id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "Role not found" });
        }
        return res.status(HTTP_STATUS.OK.code).json(deleted);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
