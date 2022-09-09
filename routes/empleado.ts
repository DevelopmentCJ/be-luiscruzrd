import { Router } from "express";
import Empleado from "../models/Empleado";

const router = Router();

//Básicos---------------------------------------------------------------------------------------------------------

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedEmpleado = await Empleado.insertMany(req.body);
  res.json({ message: "Carga Satisfactoria" });
  // res.json(savedEmpleado);
});

// Crear un Solo Registro
router.post("/Save", async (req, res) => {
  const {
    // Generales
    no,
    userReg,
    userMod,
    // Entidad
    nomb,
    nacio,
    apell,
    telef,
    pass,
    cedu,
    sex,
    stat,
    emp,
    puest,
    ars,
    suc,
    otrsIngs,
    finVac,
    iniVac,
    noDepe,
    turn,
    cod,
    dpto,
    fechaNac,
    fechaCont,
    salario,
    cuenta,
    edad,
    acciones,
    notas,
    supervisor,
    direccion,
  } = req.body;
  const newEmpleado = new Empleado({
    // Generales
    no,
    userReg,
    userMod,
    // Entidad
    nomb,
    nacio,
    apell,
    telef,
    pass,
    cedu,
    sex,
    stat,
    emp,
    puest,
    ars,
    suc,
    otrsIngs,
    finVac,
    iniVac,
    noDepe,
    turn,
    cod,
    dpto,
    fechaNac,
    fechaCont,
    salario,
    cuenta,
    edad,
    acciones,
    notas,
    supervisor,
    direccion,
  });
  const savedEmpleado = await newEmpleado.save((err: any) => {
    if (err) {
      return res.status(400).json({
        title: "Error",
        error: "Ya Existe un Empleado Registrada con este Id",
      });
    }
    return res.status(200).json({
      title: "Empleado Registrado Exitosamente",
    });
  });
  // res.json(savedEmpleado);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const empleados = await Empleado.find().sort({
    no: -1,
  });
  res.json(empleados);
});

//Leer un solo Registro por ID
router.get("/GetById/:id", async (req, res) => {
  const empleados = await Empleado.findById(req.params.id);
  res.json(empleados);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const empleados = await Empleado.find().sort({ createdAt: -1 }).limit(1);
  res.json(empleados);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedEmpleado = await Empleado.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedEmpleado);
});

//Actualizar todos los Registros
router.put("/Updatea", async (req, res) => {
  const updatedaEmpleado = await Empleado.updateMany({
    $set: {
      estado: {
        empleadodo: 0,
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
  res.json(updatedaEmpleado);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const empleados = await Empleado.findByIdAndDelete(req.params.id);
  res.json(empleados);
});

//Eliminar todos los Registros
router.delete("/delete", async (req, res) => {
  const empleados = await Empleado.deleteMany({});
  res.json(empleados);
});

//Reportes---------------------------------------------------------------------------------------------------------

// Get Empleados Pendientes
router.get("/getMejPend", async (req, res) => {
  const empleados = await Empleado.aggregate([
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

  res.json(empleados);
});

// Get Empleados Por Estatus
router.get("/getGpedByStat", async (req, res) => {
  const empleados = await Empleado.aggregate([
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

  res.json(empleados);
});

// Get Empleados Por Clientes
router.get("/getfactsGpedByCli", async (req, res) => {
  const empleados = await Empleado.aggregate([
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

  res.json(empleados);
});

//Funciones---------------------------------------------------------------------------------------------------------

//Actualizar Un Registro
router.post("/updateOne", async (req, res) => {
  const empleado = await Empleado.updateOne(
    {
      no: req.body.no,
    },
    { estatus: "Listo" }
  );
  res.json(empleado);
});

// Leer todas las empleados por Aseguradora
router.post("/GetByArs", async (req, res) => {
  const empleados = await Empleado.find({
    id_ars: req.body.aseguradoras,
    status: req.body.status,
  }).sort({
    no: 1,
  });
  res.json(empleados);
});

export default router;
