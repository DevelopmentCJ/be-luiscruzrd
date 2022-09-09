import Router from "express";
const router = Router();

import usuariosRoutes from "./usuario";
import mejorasRoutes from "./mejora";
import facturasRoutes from "./factura";
import activosRoutes from "./activo";
import areasRoutes from "./area";
import reportesRoutes from "./reporte";
import pushersRoutes from "./pusher";
import medicosRoutes from "./medico";
import consultoriosRoutes from "./consultorio";
import empleadosRoutes from "./empleado";
import productosRoutes from "./producto";

router.use("/usuarios", usuariosRoutes);
router.use("/mejoras", mejorasRoutes);
router.use("/facturas", facturasRoutes);
router.use("/activos", activosRoutes);
router.use("/areas", areasRoutes);
router.use("/reportes", reportesRoutes);
router.use("/pushers", pushersRoutes);
router.use("/medicos", medicosRoutes);
router.use("/consultorios", consultoriosRoutes);
router.use("/empleados", empleadosRoutes);
router.use("/productos", productosRoutes);

export default router;
