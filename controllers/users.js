import User from "../models/User.js";
import bcrypt from "bcrypt";
import Joi from "joi";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateduser = await User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleteduser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Definir la ruta para obtener la lista de usuarios
/* export const getUserlist = async (req, res) => {
  try {
    const users = await User.find().select("usercode");
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener la lista de usuarios");
  }
}; */

/* export const getUserlist = async (req, res) => {
  try {
    const { usercode } = req.params;
    const users = await User.find({ usercode: usercode }).select("usercode");
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener la lista de usuarios");
  }
}; */

/* REGISTER USER */
/* export const register = async (req, res) => {
  try {
    const { firstName, lastName, usercode, password, rol, jobArea } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      usercode,
      password: passwordHash,
      rol,
      jobArea,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; */
export const register = async (req, res) => {
  try {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      usercode: Joi.string().required(),
      password: Joi.string().min(6).required(),
      rol: Joi.string().required(),
      jobArea: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      usercode: req.body.usercode,
      password: passwordHash,
      rol: req.body.rol,
      jobArea: req.body.jobArea,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

