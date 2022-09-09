import { Router } from "express";
import Activo from "../models/Activo";

const router = Router();

//Básicos---------------------------------------------------------------------------------------------------------

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedActivo = await Activo.insertMany(req.body);
  res.json({ message: "Carga Satisfactoria" });
  // res.json(savedActivo);
});

// Crear un Solo Registro
router.post("/Save", async (req, res) => {
  const {
    no,
    busqueda,
    categoria,
    ubicacion,
    departamentoArea,
    tipoActivo,
    descripcion,
    marca,
    modelo,
    serie,
    color,
    asignadoA,
  } = req.body;
  const newActivo = new Activo({
    no,
    busqueda,
    categoria,
    ubicacion,
    departamentoArea,
    tipoActivo,
    descripcion,
    marca,
    modelo,
    serie,
    color,
    asignadoA,
  });
  const savedActivo = await newActivo.save((err: any) => {
    if (err) {
      return res.status(400).json({
        title: "Error",
        error: "Ya Existe una Activo Registrada con este Id",
      });
    }
    return res.status(200).json({
      title: "Activo Registrado Exitosamente",
    });
  });
  // res.json(savedActivo);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const activos = await Activo.find().sort({
    no: -1,
  });
  res.json(activos);
});

//Leer un solo Registro por ID
router.get("/GetById/:id", async (req, res) => {
  const activos = await Activo.findById(req.params.id);
  res.json(activos);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const activos = await Activo.find().sort({ createdAt: -1 }).limit(1);
  res.json(activos);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedActivo = await Activo.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedActivo);
});

//Actualizar todos los Registros
router.put("/Updatea", async (req, res) => {
  const updatedaActivo = await Activo.updateMany({
    $set: {
      estado: {
        activodo: 0,
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
  res.json(updatedaActivo);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const activos = await Activo.findByIdAndDelete(req.params.id);
  res.json(activos);
});

//Eliminar todos los Registros
router.delete("/delete", async (req, res) => {
  const activos = await Activo.deleteMany({});
  res.json(activos);
});

//Reportes---------------------------------------------------------------------------------------------------------

// Get Activos Pendientes
router.get("/getMejPend", async (req, res) => {
  const activos = await Activo.aggregate([
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

  res.json(activos);
});

// Get Activos Por Estatus
router.get("/getGpedByStat", async (req, res) => {
  const activos = await Activo.aggregate([
    {
      $group: {
        _id: {
          status: "$status",
        },
        count: {
          $sum: 1,
        },
        cobertura: {
          $sum: "$cobertura",
        },
        total_empleado: {
          $sum: "$total_empleado",
        },
      },
    },
    {
      $sort: {
        "_id.status": 1,
      },
    },
  ]);

  res.json(activos);
});

// Get Activos Por Clientes
router.get("/getfactsGpedByCli", async (req, res) => {
  const activos = await Activo.aggregate([
    {
      $group: {
        _id: {
          status: "$id_ars",
        },
        count: {
          $sum: 1,
        },
        cobertura: {
          $sum: "$cobertura",
        },
        total_empleado: {
          $sum: "$total_empleado",
        },
      },
    },
    {
      $sort: {
        "_id.status": 1,
      },
    },
  ]);

  res.json(activos);
});

//Funciones---------------------------------------------------------------------------------------------------------

//Actualizar Un Registro
router.post("/updateOne", async (req, res) => {
  const activo = await Activo.updateOne(
    {
      no: req.body.no,
    },
    { estatus: "Listo" }
  );
  res.json(activo);
});

// Leer todas las activos por Aseguradora
router.post("/GetByArs", async (req, res) => {
  const activos = await Activo.find({
    id_ars: req.body.aseguradoras,
    status: req.body.status,
  }).sort({
    no: 1,
  });
  res.json(activos);
});

export default router;
