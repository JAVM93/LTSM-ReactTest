/**
 * Middleware function to verify the authenticity of a token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    console.log(process.env.JWT_SECRET)
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
    return res.redirect('/');
  }
};

/**
 * Middleware function to verify if the user is an admin.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const verifyAdmin = async (req, res, next) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) {
      return res.status(403).send("Access Denied");
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Middleware function to verify if the user has access to a specific resource.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
export const verifyUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { id, isAdmin } = req.user;
    if (id !== userId && !isAdmin) {
      return res.status(403).send("Access Denied");
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



