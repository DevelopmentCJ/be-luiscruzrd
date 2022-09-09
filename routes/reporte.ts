import { Router } from "express";
import Reporte from "../models/Reporte";

const router = Router();

// Get Reportes por Tipo
router.get("/getCantRep", async (req, res) => {
  const reportes = await Reporte.aggregate([
    {
      $group: {
        _id: {
          type: "$type",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.type": -1,
      },
    },
  ]);

  res.json(reportes);
});

// Guardar Un Registro
router.post("/Save", async (req, res) => {
  const {
    no,
    solicitante,
    solicitado,
    solicitadoAll,
    description,
    detalles,
    type,
    status,
    userReg,
    userMod,
  } = req.body;
  const newReporte = new Reporte({
    no,
    solicitante,
    solicitado,
    solicitadoAll,
    description,
    detalles,
    type,
    status,
    userReg,
    userMod,
  });
  const savedReporte = await newReporte.save();
  res.json(savedReporte);
});

//Leer un solo Registro
router.get("/GetById/:id", async (req, res) => {
  const reportes = await Reporte.findById(req.params.id);
  res.json(reportes);
});

//Leer un solo Registro ELIMINAR ESTA DUPLICADA
router.get("/GetById2/:id", async (req, res) => {
  const reportes = await Reporte.findById(req.params.id);
  res.json(reportes);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const reportes = await Reporte.find().sort({ createdAt: -1 }).limit(1);
  res.json(reportes);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const reportes = await Reporte.find().sort({ superior: 1, no: 1 });
  res.json(reportes);
});

// Obtener Reportes por Usuario
router.post("/GetByUser", async (req, res) => {
  const reporte = await Reporte.find({
    solicitante: req.body.nombre,
  }).sort({ no: 1 });
  res.json(reporte);
});

// Obtener Reportes por Usuario2
router.post("/GetByUser2", async (req, res) => {
  const reporte = await Reporte.find({
    solicitadoAll: req.body.nombre,
  }).sort({ no: 1 });
  res.json(reporte);
});

// Obtener Reportes por No
router.post("/GetByNo", async (req, res) => {
  const reporte = await Reporte.find({
    no: req.body.no,
  });
  res.json(reporte);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedReporte = await Reporte.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedReporte);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const reportes = await Reporte.findByIdAndDelete(req.params.id);
  res.json(reportes);
});

//Actualizar todos los Registros
router.put("/Updatea", async (req, res) => {
  const updatedaReporte = await Reporte.updateMany({
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
  res.json(updatedaReporte);
});

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedReporte = await Reporte.insertMany([]);
  res.json(savedReporte);
});

//Eliminar todos los Registros
router.post("/delete", async (req, res) => {
  const reportes = await Reporte.deleteMany({});
  res.json(reportes);
});

//Actualizar Un Registro
router.post("/updateOne", async (req, res) => {
  const reporte = await Reporte.updateOne(
    {
      no: req.body.no,
    },
    { estatus: "Listo" }
  );
  res.json(reporte);
});

//Obtener por No Principal
router.post("/getbyprincipal", async (req, res) => {
  const reporte = await Reporte.find({
    superior: req.body.no,
  });
  res.json(reporte);
});
export default router;
