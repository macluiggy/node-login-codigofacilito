import { Router } from "express";
import { hello } from "../controllers/index.controller";
import passport from "passport";
const router = Router();

router.route("/api/hello").get(hello);
router.route("/").get((req, res) => {
  // si ya iniciamos mostrar bienvenida
  // Si no hermos iniciado sesion redireccionar a /login
});
router
  .route("/login")
  .get((req, res) => {
    res.render("login");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    }),
    (req, res) => {
      res.send("hola mundo");
    }
  );
export default router;
