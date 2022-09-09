import { Router } from "express";
import Usuario from "../models/Usuario";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// Get Usuarios
router.get("/getCantUsu", async (req, res) => {
  const usuarios = await Usuario.aggregate([
    {
      $group: {
        _id: {
          role: "$role",
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.role": -1,
      },
    },
  ]);

  res.json(usuarios);
});

//Crear Usuario
router.post("/signup", async (req, res, next) => {
  const newUsuario = new Usuario({
    no: req.body.no,
    email: req.body.email,
    nombre: req.body.nombre,
    grupo: req.body.grupo,
    puedeVer: req.body.puedeVer,
    aseguradoras: req.body.aseguradoras,
    role: req.body.role,
    estatus: "Activo",
    defaultStatus: "4 - Recibido por Reclamaciones Médicas",
    password: bcrypt.hashSync(req.body.password, 10),
  });
  newUsuario.save((err: any) => {
    if (err) {
      return res.status(400).json({
        title: "Error",
        error: "Ya Existe un Usuario Registrado con este Email",
      });
    }
    return res.status(200).json({
      title: "Signup Success",
    });
  });
});

//Iniciar Sesión
router.post("/login", (req, res, next) => {
  Usuario.findOne(
    { email: req.body.email },
    (err: any, usuario: { password: string; _id: any }) => {
      if (err)
        return res.status(500).json({
          title: "Server Error",
          error: err,
        });
      if (!usuario) {
        return res.status(401).json({
          title: "Usuario no Encontrado",
          error: "Usuario Inválido",
        });
      }
      //incorrect password
      if (!bcrypt.compareSync(req.body.password, usuario.password)) {
        return res.status(401).json({
          title: "login failed",
          error: "Credenciales Inválidas",
        });
      }
      //IF ALL IS GOOD create a token and send to frontend
      let token = jwt.sign({ usuarioId: usuario._id }, "secretkey");
      return res.status(200).json({
        title: "login sucess",
        token: token,
        usuario: usuario,
      });
    }
  );
});

// //grabbing(Fijar) user info
// router.get('/usuario', (req, res, next) => {
//   let token = req.headers.token; //token
//   jwt.verify(token as any, 'secretkey', (err: any, decoded: { usuarioId: any; }) => {
//     if (err) return res.status(401).json({
//       title: 'unauthorized'
//     })
//     //token is valid
//     Usuario.findOne({ _id: decoded.usuarioId }, (err: any, usuario: { email: any; name: any; }) => {
//       if (err) return console.log(err)
//       return res.status(200).json({
//         title: 'usuario grabbed',
//         usuario: {
//           email: usuario.email,
//           name: usuario.name
//         }
//       })
//     })

//   })
// })

// // Guardar Un Registro
// router.post("/Save", async (req, res) => {
//     const {
//       no,
//       email,
//       password,
//       role,
//       nombre,
//       estatus,
//     } = req.body;
//     const newUsuario = new Usuario({
//       no,
//       email,
//       password: bcrypt.hashSync(req.body.password, 10),
//       role,
//       nombre,
//       estatus,
//     });
//     const savedUsuario = await newUsuario.save();
//     res.json(savedUsuario);
//   });

//Leer un solo Registro
router.get("/GetById/:id", async (req, res) => {
  const usuarios = await Usuario.findById(req.params.id);
  res.json(usuarios);
});

//Leer el último Registro
router.get("/GetOne", async (req, res) => {
  const usuarios = await Usuario.find().sort({ createdAt: -1 }).limit(1);
  res.json(usuarios);
});

// Leer Todos los registros
router.get("/Get", async (req, res) => {
  const usuarios = await Usuario.find().sort({ no: 1 });
  res.json(usuarios);
});

// Leer Todos los registros por usuarios en array
router.post("/GetByUser", async (req, res) => {
  const usuario = await Usuario.find({
    puedeVer: req.body.nombre,
  }).sort({ no: 1 });
  res.json(usuario);
});

// Leer Todos los registros por Grupo
router.post("/GetByGroup", async (req, res) => {
  const usuario = await Usuario.find(
    {
      grupo: req.body.nombre,
    },
    { nombre: 1, _id: 0 }
  ).sort({ no: 1 });
  res.json(usuario);
});

//Actualizar un Registro
router.put("/Update/:id", async (req, res) => {
  const updatedUsuario = await Usuario.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.json(updatedUsuario);
});

//Eliminar un Registro
router.delete("/Delete/:id", async (req, res) => {
  const usuarios = await Usuario.findByIdAndDelete(req.params.id);
  res.json(usuarios);
});

//Cargar Registros
router.post("/Savea", async (req, res) => {
  const savedUsuario = await Usuario.insertMany(req.body.usuarios);
  res.json(savedUsuario);
});

//Eliminar todos los Registros
router.post("/delete", async (req, res) => {
  const usuarios = await Usuario.deleteMany({});
  res.json(usuarios);
});

export default router;
