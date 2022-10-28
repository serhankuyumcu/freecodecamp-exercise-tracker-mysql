const { resolve } = require("path");
const db = require("./db");

exports.addNewUserSql = async (token_id, username) => {
  let newUserQuery = "insert into users (token_id,username) values(?,?)";
  return new Promise(function (resolve, reject) {
    db.query(newUserQuery, [token_id, username], (error, row) => {
      if (error) {
        console.log(error);
      }
      return resolve(row);
    });
  });
};
exports.getUsersSql = async () => {
  let getUsersQuery = "select username,token_id) from users";
  return new Promise(function (resolve, reject) {
    db.query(getUsersQuery, (error, row, field) => {
      if (error) {
        return reject(error);
      }
      return resolve(row);
    });
  });
};
exports.getUserNameSql = async (token_id) => {
  let sql_uname = "select username from users where token_id=?";
  return new Promise(function (resolve, reject) {
    db.query(sql_uname, `${token_id}`, (error, row, field) => {
      if (error) {
        return reject(error);
      }
      return resolve(row);
    });
  });
};
exports.dateControl = async (date) => {
  return new Promise(function (resolve, reject) {
    if (!date == 0) {
      return reject;
    }
    return resolve((date = new Date()));
  });
};
exports.getUserExercisesSql = async (token_id) => {
  let sql_exinfo = "select description,duration,date from exercise where token_id=?";
  return new Promise(function (resolve, reject) {
    db.query(sql_exinfo, `${token_id}`, (err, row, fields) => {
      if (err) {
        return reject(err);
      }
      return resolve(row);
    });
  });
};
exports.addNewExerciseSql = async (
  username,
  description,
  duration,
  date,
  token_id
) => {
  let addExerciseQuery =
    "insert into exercise (username,description,duration,date,token_id) values (?,?,?,?,?)";
  return new Promise(function (resolve, reject) {
    db.query(
      addExerciseQuery,
      [username, description, duration, date, token_id],
      (error, addedRow, fields) => {
        if (error) {
          return reject(error);
        }
        return addedRow;
      }
    );
  });
};
exports.getUserLogSql = async (token_id) => {
  let sql_logs = "select * from logs where token_id=?";
  return new Promise(function (resolve, reject) {
    db.query(sql_logs, `${token_id}`, (err, row, field) => {
      if (err) {
        return reject(err);
      }
      return resolve(row[0]);
    });
  });
};
exports.getUserLogDetailsSql = async (token_id) => {
  let sql_logDetails = "select * from log_details where token_id=? ";
  return new Promise(function(resolve,reject){
    db.query(sql_logDetails, token_id, (err, row, fields) => {
      if (err) {
        reject(err);
      } 
      resolve(row)
    });
  })
};
