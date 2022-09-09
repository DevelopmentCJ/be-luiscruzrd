import { Router } from "express";
import Producto from "../models/Producto";

const router = Router();

//Básicos---------------------------------------------------------------------------------------------------------

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedProducto = await Producto.insertMany(req.body);
  res.json({ message: "Carga Satisfactoria" });
  // res.json(savedProducto);
});

// Crear un Solo Registro
router.post("/Save", async (req, res) => {
  const {
    // Generales
    no,
    userReg,
    userMod,
    // Entidad
    fecha,
    division,
    lineaGrupo,
    codigo,
    present,
    desc,
    ref,
    vence,
    mesVenc,
    anoVenc,
    lote,
    barcode,
    farmaco,
    fab,
    supdr,
    regInd,
    regSan,
    precVenta,
    precCaja,
    itbis,
    costoUnit,
    costCaja,
    solPor,
    autPor,
    almacn,
    subAlmacn,
    cant,
    uniMed,
    equiv,
  } = req.body;
  const newProducto = new Producto({
    // Generales
    no,
    userReg,
    userMod,
    // Entidad
    fecha,
    division,
    lineaGrupo,
    codigo,
    present,
    desc,
    ref,
    vence,
    mesVenc,
    anoVenc,
    lote,
    barcode,
    farmaco,
    fab,
    supdr,
    regInd,
    regSan,
    precVenta,
    precCaja,
    itbis,
    costoUnit,
    costCaja,
    solPor,
    autPor,
    almacn,
    subAlmacn,
    cant,
    uniMed,
    equiv,
  });
  const savedProducto = await newProducto.save((err: any) => {
    if (err) {
      return res.status(400).json({
        title: "Error",
        error: "Ya Existe un Producto Registrada con este Id",
      });
    }
    return res.status(200).json({
      title: "Producto Registrado Exitosamente",
    });
  });
  // res.json(savedProducto);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const productos = await Producto.find().sort({
    no: -1,
  });
  res.json(productos);
});

//Leer un solo Registro por ID
router.get("/GetById/:id", async (req, res) => {
  const productos = await Producto.findById(req.params.id);
  res.json(productos);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const productos = await Producto.find().sort({ createdAt: -1 }).limit(1);
  res.json(productos);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedProducto = await Producto.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedProducto);
});

//Actualizar todos los Registros
router.put("/Updatea", async (req, res) => {
  const updatedaProducto = await Producto.updateMany({
    $set: {
      estado: {
        productodo: 0,
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
  res.json(updatedaProducto);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const productos = await Producto.findByIdAndDelete(req.params.id);
  res.json(productos);
});

//Eliminar todos los Registros
router.delete("/delete", async (req, res) => {
  const productos = await Producto.deleteMany({});
  res.json(productos);
});

//Reportes---------------------------------------------------------------------------------------------------------

// Obtener Productos por Día
router.get("/getproddayli", async (req, res) => {
  const productos = await Producto.aggregate([
    {
      $group: {
        _id: {
          day: { $dateToString: { format: "%m/%d/%Y", date: "$fecha" } },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.day": -1,
      },
    },
  ]);

  res.json(productos);
});

// Get Productos Pendientes
router.get("/getMejPend", async (req, res) => {
  const productos = await Producto.aggregate([
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

  res.json(productos);
});

// Get Productos Por Estatus
router.get("/getGpedByStat", async (req, res) => {
  const productos = await Producto.aggregate([
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
        total_producto: {
          $sum: "$total_producto",
        },
      },
    },
    {
      $sort: {
        "_id.status": 1,
      },
    },
  ]);

  res.json(productos);
});

// Get Productos Por Clientes
router.get("/getfactsGpedByCli", async (req, res) => {
  const productos = await Producto.aggregate([
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
        total_producto: {
          $sum: "$total_producto",
        },
      },
    },
    {
      $sort: {
        "_id.status": 1,
      },
    },
  ]);

  res.json(productos);
});

//Funciones---------------------------------------------------------------------------------------------------------

//Actualizar Un Registro
router.post("/updateOne", async (req, res) => {
  const producto = await Producto.updateOne(
    {
      no: req.body.no,
    },
    { estatus: "Listo" }
  );
  res.json(producto);
});

// Leer todas las productos por Aseguradora
router.post("/GetByArs", async (req, res) => {
  const productos = await Producto.find({
    id_ars: req.body.aseguradoras,
    status: req.body.status,
  }).sort({
    no: 1,
  });
  res.json(productos);
});

export default router;
