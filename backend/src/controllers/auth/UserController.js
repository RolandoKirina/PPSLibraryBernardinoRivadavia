import * as UserService from "../../services/auth/UserService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";
import { ValidationError } from '../../utils/errors/ValidationError.js';
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "error" });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await UserService.getUser(req.params.id);
        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }
        res.status(HTTP_STATUS.OK.code).json(user);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = req.body;

        if (!user) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        
        const newUser = await UserService.createUser(user);
        res.status(HTTP_STATUS.CREATED.code).json(newUser);
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

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newUser = await UserService.updateUser(id, updates);
        res.status(HTTP_STATUS.OK.code).json(newUser);
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

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await UserService.deleteUser(id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "User not found" });
        }
        return res.status(HTTP_STATUS.OK.code).json(deleted);
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

export const loginUser = async (req, res) => {
    try {
        const userData = req.body;

        if (!userData) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        
        const user = await UserService.loginUser(userData);

        const token = generateToken(user);

        res.status(HTTP_STATUS.CREATED.code).json(token);
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

export const generateToken = (userData) => {
    return jwt.sign({ userId: userData.userId, fullName: userData.fullName, role: userData.role}, process.env.JWT_SECRET, {
        expiresIn: '5hr'
    })
}