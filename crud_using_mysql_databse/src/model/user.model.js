const db = require('../config/database'); 

const getAllUsers = (callback) => {
  db.query('SELECT * FROM user', (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

const getUserById = (id, callback) => {
    // console.log(id);
  db.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(new Error('User not found'), null);
    callback(null, results);
  });
};

const insertUser = (userData, callback) => {
    const { name, caste, city } = userData;
    db.query('INSERT INTO user (name, caste, city) VALUES (?, ?, ?)', [name, caste, city], (err, results) => {
      if (err) return callback(err, null);
      callback(null, { id: results.insertId, name, caste, city });
    });
  };
  

  const updateUser = (id, userData, callback) => {
    const { name, caste, city } = userData;
    db.query('UPDATE user SET name = ?, caste = ?, city = ? WHERE id = ?', [name, caste, city, id], (err, results) => {
      if (err) return callback(err, null);
      if (results.affectedRows === 0) return callback(new Error('User not found'), null);
      callback(null, { id, name, caste, city });
    });
  };
  

  const deleteUser = (id, callback) => {
    db.query('DELETE FROM user WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.affectedRows === 0) return callback(new Error('User not found'), null);
      callback(null, { message: 'User deleted successfully' });
    });
  };
  
  module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
  };
