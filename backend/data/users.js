import bycrpt from "bcrypt";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bycrpt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@email.com",
    password: bycrpt.hashSync("123456", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@email.com",
    password: bycrpt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users;
