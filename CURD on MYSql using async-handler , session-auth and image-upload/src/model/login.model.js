const db = require("../config/database");
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
      email: email,
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
  loginUser,
  registerUser,
};
