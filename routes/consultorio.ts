import { Router } from "express";
import Consultorio from "../models/Consultorio";

const router = Router();

//Básicos---------------------------------------------------------------------------------------------------------

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedConsultorio = await Consultorio.insertMany(req.body);
  res.json({ message: "Carga Satisfactoria" });
  // res.json(savedConsultorio);
});

// Crear un Solo Registro
router.post("/Save", async (req, res) => {
  const {
    // Generales
    no,
    userReg,
    userMod,
    // Entidad
    edificio,
    planta,
    descripcion,
    responsible,
    ultimoPago,
    notas,
    numero,
    monto,
  } = req.body;
  const newConsultorio = new Consultorio({
    // Generales
    no,
    userReg,
    userMod,
    // Entidad
    edificio,
    planta,
    descripcion,
    responsible,
    ultimoPago,
    notas,
    numero,
    monto,
  });
  const savedConsultorio = await newConsultorio.save((err: any) => {
    if (err) {
      return res.status(400).json({
        title: "Error",
        error: "Ya Existe una Consultorio Registrada con este Id",
      });
    }
    return res.status(200).json({
      title: "Empleado Registrado Exitosamente",
    });
  });
  // res.json(savedConsultorio);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const consultorios = await Consultorio.find().sort({
    no: -1,
  });
  res.json(consultorios);
});

//Leer un solo Registro por ID
router.get("/GetById/:id", async (req, res) => {
  const consultorios = await Consultorio.findById(req.params.id);
  res.json(consultorios);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const consultorios = await Consultorio.find()
    .sort({ createdAt: -1 })
    .limit(1);
  res.json(consultorios);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedConsultorio = await Consultorio.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedConsultorio);
});

//Actualizar todos los Registros
router.put("/Updatea", async (req, res) => {
  const updatedaConsultorio = await Consultorio.updateMany({
    $set: {
      estado: {
        consultoriodo: 0,
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
  res.json(updatedaConsultorio);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const consultorios = await Consultorio.findByIdAndDelete(req.params.id);
  res.json(consultorios);
});

//Eliminar todos los Registros
router.delete("/delete", async (req, res) => {
  const consultorios = await Consultorio.deleteMany({});
  res.json(consultorios);
});

//Reportes---------------------------------------------------------------------------------------------------------

// Get Consultorios Pendientes
router.get("/getMejPend", async (req, res) => {
  const consultorios = await Consultorio.aggregate([
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

  res.json(consultorios);
});

// Get Consultorios Por Estatus
router.get("/getGpedByStat", async (req, res) => {
  const consultorios = await Consultorio.aggregate([
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

  res.json(consultorios);
});

// Get Consultorios Por Clientes
router.get("/getfactsGpedByCli", async (req, res) => {
  const consultorios = await Consultorio.aggregate([
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

  res.json(consultorios);
});

//Funciones---------------------------------------------------------------------------------------------------------

//Actualizar Un Registro
router.post("/updateOne", async (req, res) => {
  const consultorio = await Consultorio.updateOne(
    {
      no: req.body.no,
    },
    { estatus: "Listo" }
  );
  res.json(consultorio);
});

// Leer todas las consultorios por Aseguradora
router.post("/GetByArs", async (req, res) => {
  const consultorios = await Consultorio.find({
    id_ars: req.body.aseguradoras,
    status: req.body.status,
  }).sort({
    no: 1,
  });
  res.json(consultorios);
});

export default router;
