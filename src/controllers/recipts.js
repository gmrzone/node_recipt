import { Recipt, Category } from "../models/index.js";
import reciptSchema from '../validators/recipt.js'
export const getRecipts = async (req, res) => {
  try {
    const data = await Recipt.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getRecipt = async (req, res) => {
  const reciptId = req.params?.id;
  try {
    const data = await Recipt.findOne({
      where: {
        id: reciptId,
      },
    });
    res.json(data ? data : { status: "not found" })
  } catch (err) {
    res.status(500).json(err);
  }
};

export const registerRecipts = async (req, res) => {
    try{
        console.log(JSON.stringify(req.body, null, 2))
        const {error, value} = reciptSchema.validate(req.body)
        if (error){
            return res.status(400).json(error.details)
        }
        const data = await Recipt.create(value)
        res.status(201).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
};

export const readReports = (req, res) => {};
