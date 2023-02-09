const User = require("../models/User");

const getUsers = async (req, res, next) => {
  try {
    //create options object to store query parameters
    const options = {};

    //check if the req query is empty?
    if (Object.keys(req.query).length) {
      //destructure sortByFirstName and limit from the the request query
      const { sortByFirstName, limit } = req.query;

      //setup pagination if limit is provided
      if (limit) options.limit = limit;

      //sort results
      if (sortByFirstName)
        options.sort = {
          firstName: sortByFirstName === "asc" ? 1 : -1,
        };
    }
    //get all users from DB using the options object
    const result = await User.find({}, {}, options);
    //respond with a JSON representation of the result
    res.status(200).setHeader("Content-Type", "application/json").json(result);
  } catch (error) {
    throw new Error(`Error getting all users: ${error.message}`);
  }
};

const createUser = async (req, res, next) => {
  try {
    console.log(req.body);
    /*******/
    //This block says if the userName entered already exists, then throw an error. Now the DB won't be disrupted!
    const existingUser = await User.findOne({ userName: req.body.userName });
    if (existingUser) {
      return res
        .status(400)
        .setHeader("Content-Type", "application/json")
        .json({ success: false, error: "Username already exists" });
    }
    /*******/
    //create new user in the DB using the info from the request body
    const user = await User.create(req.body);
    //get a signed JWT for the new user
    const token = user.getSignedJwtToken();
    //set up options object for JWT cookie
    const options = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 1000 * 60),
    };
    //respond with success message, JWT, & user info
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .cookie("token", token, options)
      .json({ success: true, token, user });
  } catch (error) {
    throw new Error(`Error creating a user: ${error.message}`);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("res: ", res);
      return res
        .status(404)
        .setHeader("Content-Type", "application/json")
        .json({ success: false, error: "User not found" });
    }

    await User.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json({ success: true });
  } catch (error) {
    console.log("error: ", error);
    throw new Error(`Error deleting a user: ${error.message}`);
  }
};

// const getUser = async (req, res, next) => {

// }

module.exports = {
  getUsers,
  createUser,
  deleteUser,
};
