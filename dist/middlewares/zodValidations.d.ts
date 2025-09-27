import z from "zod";
export declare const signupInputs: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const signinInputs: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.z.core.$strip>;
export declare const createBookInput: z.ZodObject<{
    title: z.ZodString;
    author: z.ZodString;
    isbn: z.ZodString;
    category: z.ZodString;
    totalCopies: z.ZodNumber;
}, z.z.core.$strip>;
export declare const updateBookInput: z.ZodObject<{
    title: z.ZodString;
    author: z.ZodString;
    category: z.ZodString;
    id: z.ZodNumber;
    totalCopies: z.ZodNumber;
}, z.z.core.$strip>;
//# sourceMappingURL=zodValidations.d.ts.map