const db = require("../config/database");

const getAllUsers = async () => {
  const result = await db.query("SELECT * from user");
  return result[0];
};

const getUserById = async (id) => {
  const result = await db.query("SELECT * FROM user WHERE id = ?", [id]);
  return result[0][0];
};

const insertUser = async (userData, image) => {
  const { name, city, email, mobile_no } = userData;
  const result = await db.query(
    "INSERT INTO user (name, city,email,mobile_no,image) VALUES (?, ?, ?, ? , ?)",
    [name, city, email, mobile_no, image]
  );
  return result[0];
};

const updateUser = async (id, userData, filename) => {
  const { name, city, email, mobile_no } = userData;
  const result = await db.query(
    "UPDATE user SET name = ?, city = ?, email = ?, mobile_no = ?, image= ? WHERE id = ?",
    [name, city, email, mobile_no, filename, id]
  );
  if (result[0].affectedRows == 1) return "Data Inserted Sucessfully";
};

const deleteUser = async (id) => {
  const result = await db.query("DELETE FROM user WHERE id = ?", [id]);
  return result[0];
};

const imageUser = async (filename, userId) => {
  const result = await db.query("UPDATE user SET image= ? WHERE id = ?", [
    filename,
    userId,
  ]);
  return result[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  imageUser,
};
