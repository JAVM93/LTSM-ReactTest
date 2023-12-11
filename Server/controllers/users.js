/**
 * Retrieves a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is retrieved.
 */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Retrieves all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when all users are retrieved.
 */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Retrieves a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is retrieved.
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/**
 * Updates a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is updated.
 */
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

/**
 * Deletes a user by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is deleted.
 */
export const deleteUser = async (req, res) => {
  try {
    const deleteduser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteduser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is registered.
 */
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

