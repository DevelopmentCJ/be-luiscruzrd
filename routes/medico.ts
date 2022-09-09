import { Router } from "express";
import Medico from "../models/Medico";

const router = Router();

//Básicos---------------------------------------------------------------------------------------------------------

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedMedico = await Medico.insertMany(req.body);
  res.json({ message: "Carga Satisfactoria" });
  // res.json(savedMedico);
});

// Crear un Solo Registro
router.post("/Save", async (req, res) => {
  const {
    // Generales
    no,
    // Entidad
    edificio,
    consultorio,
    medico,
    especialidad,
    diasConsulta,
    horario,
    telefono,
    secretaria,
    precios,
    telSecretaria,
    telConsultorio,
    procedimientos,
    preciosPrivado,
    preciosDiferencia,
    preciosProcedimientos,
    notas,
  } = req.body;
  const newMedico = new Medico({
    // Generales
    no,
    // Entidad
    edificio,
    consultorio,
    medico,
    especialidad,
    diasConsulta,
    horario,
    telefono,
    secretaria,
    precios,
    telSecretaria,
    telConsultorio,
    procedimientos,
    preciosPrivado,
    preciosDiferencia,
    preciosProcedimientos,
    notas,
  });
  const savedMedico = await newMedico.save((err: any) => {
    if (err) {
      return res.status(400).json({
        title: "Error",
        error: "Ya Existe una Medico Registrada con este Id",
      });
    }
    return res.status(200).json({
      title: "Medico Registrado Exitosamente",
    });
  });
  // res.json(savedMedico);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const medicos = await Medico.find().sort({
    no: -1,
  });
  res.json(medicos);
});

//Leer un solo Registro por ID
router.get("/GetById/:id", async (req, res) => {
  const medicos = await Medico.findById(req.params.id);
  res.json(medicos);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const medicos = await Medico.find().sort({ createdAt: -1 }).limit(1);
  res.json(medicos);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedMedico = await Medico.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedMedico);
});

//Actualizar todos los Registros
router.put("/Updatea", async (req, res) => {
  const updatedaMedico = await Medico.updateMany({
    $set: {
      estado: {
        medicodo: 0,
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
  res.json(updatedaMedico);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const medicos = await Medico.findByIdAndDelete(req.params.id);
  res.json(medicos);
});

//Eliminar todos los Registros
router.delete("/delete", async (req, res) => {
  const medicos = await Medico.deleteMany({});
  res.json(medicos);
});

//Reportes---------------------------------------------------------------------------------------------------------

// Get Medicos Pendientes
router.get("/getMejPend", async (req, res) => {
  const medicos = await Medico.aggregate([
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

  res.json(medicos);
});

// Get Medicos Por Estatus
router.get("/getGpedByStat", async (req, res) => {
  const medicos = await Medico.aggregate([
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

  res.json(medicos);
});

// Get Medicos Por Clientes
router.get("/getfactsGpedByCli", async (req, res) => {
  const medicos = await Medico.aggregate([
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

  res.json(medicos);
});

//Funciones---------------------------------------------------------------------------------------------------------

//Actualizar Un Registro
router.post("/updateOne", async (req, res) => {
  const medico = await Medico.updateOne(
    {
      no: req.body.no,
    },
    { estatus: "Listo" }
  );
  res.json(medico);
});

// Leer todas las medicos por Aseguradora
router.post("/GetByArs", async (req, res) => {
  const medicos = await Medico.find({
    id_ars: req.body.aseguradoras,
    status: req.body.status,
  }).sort({
    no: 1,
  });
  res.json(medicos);
});

export default router;
