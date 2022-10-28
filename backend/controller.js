const model = require("./models");

exports.addNewUser = (req, res, next) => {
  const token_id = req.body.token_id;
  const username = req.body.username;
  model
    .addNewUserSql(token_id, username)
    .then(() => {
      res.status(200).send({ username: username, token_id: token_id });
      next();
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
exports.getUsers = (req, res, next) => {
  model
    .getUsersSql()
    .then((result) => {
      if (result.length > 0) {
        return res.status(200).send({
          userlist: result,
        });
      }
      return res.json({ users: "no-user" });
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
};
exports.getUserExercises = async (req, res, next) => {
  let token_id = req.params.token_id;
  let username;
  let date = req.body.date;
  let duration = req.body.duration;
  let description = req.body.description;

  model.dateControl(date).then((result) => {
    return (date = result);
  });
  await model
    .getUserNameSql(token_id)
    .then((result) => {
      username = result[0].username;
      return username;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    })
    .then((username) => {
      model.addNewExerciseSql(username, description, duration, date, token_id);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  await model.getUserExercisesSql(token_id).then((result) => {
    res.send({
      username: username,
      token_id: token_id,
      exercises: result,
    });
  })
  .catch((err) => {
    if (err) {
      console.log(err);
    }
  })
};
exports.getUserLog = async (req, res, next) => {
  let token_id = req.params.token_id;
  await model.getUserLogSql(token_id).then((logInfo) => {
    model.getUserLogDetailsSql(logInfo.token_id).then((logDetails) => {
      res.send({
        username: logInfo.username,
        count: logInfo.count,
        token_id: logDetails.token_id,
        logs: logDetails,
      });
    });
  });
};
