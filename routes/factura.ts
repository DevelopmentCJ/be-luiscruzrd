import { Router } from "express";
import Factura from "../models/Factura";

const router = Router();

//Básicos---------------------------------------------------------------------------------------------------------

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedFactura = await Factura.insertMany(req.body);
  res.json(savedFactura);
});

// Crear un Solo Registro
router.post("/Save", async (req, res) => {
  const {
    no,
    idfact,
    id_ars,
    nom,
    nro_autorizacion_salida,
    fecha,
    numero_afiliado,
    rnc,
    tipo_factura,
    cobertura,
    total_empleado,
    status,
    actividad,
  } = req.body;
  const newFactura = new Factura({
    no,
    idfact,
    id_ars,
    nom,
    nro_autorizacion_salida,
    fecha,
    numero_afiliado,
    rnc,
    tipo_factura,
    cobertura,
    total_empleado,
    status,
    actividad,
  });
  const savedFactura = await newFactura.save((err: any) => {
    if (err) {
      return res.status(400).json({
        title: "Error",
        error: "Ya Existe una Factura Registrada con este Id",
      });
    }
    return res.status(200).json({
      title: "Factura Registrada Exitosamente",
    });
  });
  // res.json(savedFactura);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const facturas = await Factura.find().sort({
    no: -1,
  });
  res.json(facturas);
});

//Leer un solo Registro por ID
router.get("/GetById/:id", async (req, res) => {
  const facturas = await Factura.findById(req.params.id);
  res.json(facturas);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const facturas = await Factura.find().sort({ createdAt: -1 }).limit(1);
  res.json(facturas);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedFactura = await Factura.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedFactura);
});

//Actualizar todos los Registros
router.put("/Updatea", async (req, res) => {
  const updatedaFactura = await Factura.updateMany({
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
  res.json(updatedaFactura);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const facturas = await Factura.findByIdAndDelete(req.params.id);
  res.json(facturas);
});

//Eliminar todos los Registros
router.delete("/delete", async (req, res) => {
  const facturas = await Factura.deleteMany({});
  res.json(facturas);
});

//Reportes---------------------------------------------------------------------------------------------------------

// Get Facturas Pendientes
router.get("/getMejPend", async (req, res) => {
  const facturas = await Factura.aggregate([
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

  res.json(facturas);
});

// Get Facturas Por Estatus
router.get("/getGpedByStat", async (req, res) => {
  const facturas = await Factura.aggregate([
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

  res.json(facturas);
});

// Get Facturas Por Clientes
router.get("/getfactsGpedByCli", async (req, res) => {
  const facturas = await Factura.aggregate([
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

  res.json(facturas);
});

//Funciones---------------------------------------------------------------------------------------------------------

//Actualizar Un Registro
router.post("/updateOne", async (req, res) => {
  const factura = await Factura.updateOne(
    {
      no: req.body.no,
    },
    { estatus: "Listo" }
  );
  res.json(factura);
});

// Leer todas las facturas por Aseguradora
router.post("/GetByArs", async (req, res) => {
  const facturas = await Factura.find({
    id_ars: req.body.aseguradoras,
    status: req.body.status,
  }).sort({
    no: 1,
  });
  res.json(facturas);
});

export default router;
