import { Router } from "express";
import Area from "../models/Area";

const router = Router();

// Guardar Un Registro
router.post("/Save", async (req, res) => {
  const { no, superior, description, type, userReg, userMod } = req.body;
  const newArea = new Area({
    no,
    superior,
    description,
    type,
    userReg,
    userMod,
  });
  const savedArea = await newArea.save();
  res.json(savedArea);
});

//Leer un solo Registro
router.get("/GetById/:id", async (req, res) => {
  const areas = await Area.findById(req.params.id);
  res.json(areas);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const areas = await Area.find().sort({ createdAt: -1 }).limit(1);
  res.json(areas);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const areas = await Area.find().sort({ superior: 1, no: 1 });
  res.json(areas);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedArea = await Area.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedArea);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const areas = await Area.findByIdAndDelete(req.params.id);
  res.json(areas);
});

//Actualizar todos los Registros
router.put("/Updatea", async (req, res) => {
  const updatedaArea = await Area.updateMany({
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
  res.json(updatedaArea);
});

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedArea = await Area.insertMany([]);
  res.json(savedArea);
});

//Eliminar todos los Registros
router.post("/delete", async (req, res) => {
  const areas = await Area.deleteMany({});
  res.json(areas);
});

//Actualizar Un Registro
router.post("/updateOne", async (req, res) => {
  const area = await Area.updateOne(
    {
      no: req.body.no,
    },
    { estatus: "Listo" }
  );
  res.json(area);
});

//Obtener por No Principal
router.post("/getbyprincipal", async (req, res) => {
  const area = await Area.find({
    superior: req.body.no,
  });
  res.json(area);
});
export default router;
