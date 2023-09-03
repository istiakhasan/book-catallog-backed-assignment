"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const loginValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z.string({
            required_error: 'Please provide a passwored',
        }),
    }),
});
const signUpValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Please provide a Email',
        }),
        password: zod_1.z.string({
            required_error: 'Please provide a passwored',
        }),
        role: zod_1.z.enum(['admin', 'customer'], {
            required_error: 'Please provide a valid role (admin or customer)',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Please provide a contactNo',
        }),
        address: zod_1.z.string({
            required_error: 'Please provide an address',
        }),
        profileImg: zod_1.z.string({
            required_error: 'Please provide a profileImg',
        }),
    }),
});
exports.authValidation = {
    loginValidation,
    signUpValidation,
};
