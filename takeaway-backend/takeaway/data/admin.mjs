import { hashPassword } from "../utils/index.mjs";

export const adminUser = {
    username: "admin",
    password: await hashPassword("admin123"),
    role: "admin",
  };
  import { comparePasswords } from "../utils/index.mjs";

  export const handler = async (event) => {
    const { username, password } = JSON.parse(event.body);
  
    const adminUser = {
      username: "admin",
      password: await hashPassword("admin123"), 
      role: "admin",
    };
  
    if (username === adminUser.username && (await comparePasswords(password, adminUser.password))) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, role: adminUser.role }),
      };
    }
  
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "Ogiltiga inloggningsuppgifter" }),
    };
  };
  