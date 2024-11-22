import { hashPassword } from "../utils/index.mjs";

export const adminUser = {
    username: "admin",
    password: await hashPassword("admin123"),
    role: "admin",
  };
  