const db = require("../config/database");

const getAllUsers = async () => {
  const result = await db.query("SELECT * from user");
  return result[0][0];
};

const getUserById = async (id) => {
  const result = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  return result[0][0];
};

const insertUser = async (userData) => {
  const { name, caste, city } = userData;
  const result = await db.query(
    "INSERT INTO user (name, caste, city) VALUES (?, ?, ?)",
    [name, caste, city]
  );
  return result[0];
};

const updateUser = async (id, userData) => {
  const { name, caste, city } = userData;
  const result = await db.query(
    "UPDATE user SET name = ?, caste = ?, city = ? WHERE id = ?",
    [name, caste, city, id]
  );
  if (result[0].affectedRows == 1) return "Data Inserted Sucessfully";
};

const deleteUser = async (id) => {
  const result = await db.query("DELETE FROM user WHERE id = ?", [id]);
  return result[0];
};
const registerUser = async (userData) => {
  console.log(userData);
  const { name, city, email, mobile_no, password } = userData;

  const user = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  if (user[0][0]) {
    throw new Error("Email already exists");
  }

  await await db.query("INSERT INTO login (email, password) VALUES (?, ?)", [
    email,
    password,
  ]);
  await db.query(
    "INSERT INTO user (name, city,email,mobile_no) VALUES (?, ?, ?,?)",
    [name, city, email, mobile_no]
  );
  return {
    message: "Register successfully",
    data: {
      email,
      userName: name,
      city: city,
      mobile: mobile_no,
    },
  };
};

const loginUser = async (userData) => {
  const { email, password } = userData;

  const userWithLogin = await db.query(
    "SELECT password FROM login WHERE email = ?",
    [email]
  );

  if (!userWithLogin || password !== userWithLogin[0][0].password) {
    throw new Error("Invalid email or password");
  }

  const result = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  return {
    message: "Login successful",
    data: result[0][0],
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  loginUser,
  registerUser,
};
