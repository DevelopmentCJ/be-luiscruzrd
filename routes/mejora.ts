import { Router } from "express";
import Mejora from "../models/Mejora";

const router = Router();


//Básicos---------------------------------------------------------------------------------------------------------

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedMejora = await Mejora.insertMany([]);
  res.json(savedMejora);
});

// Crear un Solo Registro
router.post("/Save", async (req, res) => {
  const { no, order, title, description, type, userReg, userMod, estatus } =
    req.body;
  const newMejora = new Mejora({
    no,
    order,
    title,
    description,
    type,
    userReg,
    userMod,
    estatus,
  });
  const savedMejora = await newMejora.save();
  res.json(savedMejora);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const mejoras = await Mejora.find({ estatus: "Pendiente" }).sort({ no: 1 });
  res.json(mejoras);
});

//Leer un solo Registro por ID
router.get("/GetById/:id", async (req, res) => {
  const mejoras = await Mejora.findById(req.params.id);
  res.json(mejoras);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const mejoras = await Mejora.find().sort({ createdAt: -1 }).limit(1);
  res.json(mejoras);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedMejora = await Mejora.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedMejora);
});

//Actualizar todos los Registros
router.put("/Updatea", async (req, res) => {
  const updatedaMejora = await Mejora.updateMany({
    $set: {
      estado: {
        facturado: 0,
        pagado: 0,
        retension: 0,
        ingresos: 0,
        porCobrar: 0,
        glosa: 0,
        reenviado: 0,
        recuperado: 0,
      },
    },
  });
  res.json(updatedaMejora);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const mejoras = await Mejora.findByIdAndDelete(req.params.id);
  res.json(mejoras);
});

//Eliminar todos los Registros
router.post("/delete", async (req, res) => {
  const mejoras = await Mejora.deleteMany({});
  res.json(mejoras);
});

//Reportes---------------------------------------------------------------------------------------------------------

// Get Mejoras Pendientes
router.get("/getMejPend", async (req, res) => {
  const mejoras = await Mejora.aggregate([
    {
      $group: {
        _id: {
          estatus: "$estatus",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.estatus": -1,
      },
    },
  ]);

  res.json(mejoras);
});

//Funciones---------------------------------------------------------------------------------------------------------

//Actualizar Un Registro
router.post("/updateOne", async (req, res) => {
  const mejora = await Mejora.updateOne(
    {
      no: req.body.no,
    },
    { estatus: "Listo" }
  );
  res.json(mejora);
});

export default router;
