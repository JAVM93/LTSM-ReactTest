import Report from "../models/Report.js";
import User from "../models/User.js";

/* CREATE */
export const createReport = async (req, res) => {
  try {
    const { userId, problema } = req.body;
    //const user = await User.findById(userId);
    const newReport = new Report({
      fecha: new Date(),
      userReport: userId,
      sitio,
      problema,
      descripcionDelProblema,
      personaAsignada,
      solucionado,
      descripcionDeLaSolucion,
      fechaDeLaSolucion,
    });
    await newReport.save();

    const post = await Report.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedReport = async (req, res) => {
  try {
    const post = await Report.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  } 
};

export const getUserReport = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Report.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};




