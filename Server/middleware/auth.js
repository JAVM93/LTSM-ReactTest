import jwt from "jsonwebtoken";

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



