using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NuevoCrud.Controllers
{
    public class CrudController : Controller
    {
        // GET: Crud
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listar()
        {
            nuevoEntities db = new nuevoEntities();
            var listar = db.cruds.Where(p => p.active.Equals(1))
                .Select(p => new { p.id, p.firstName, p.lastName, p.age }).ToList();

            return Json(listar, JsonRequestBehavior.AllowGet);
        }

        public JsonResult recuperarInfo(int id)
        {
            nuevoEntities db = new nuevoEntities();
            var lista = db.cruds.Where(p=> p.active.Equals(1) && p.id.Equals(id))
                .Select(p => new { p.id, p.firstName, p.lastName, p.age }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int save(crud iForm)
        {
            nuevoEntities db = new nuevoEntities();
            var nRegistrosAfectados = 0;
            try
            {
                if (iForm.id == 0)
                {
                    //crud iForm = new crud();
                    db.cruds.Add(iForm);
                    db.SaveChanges();
                    nRegistrosAfectados = 1;
                }
                else
                {
                    crud iData = db.cruds.Where(p => p.id.Equals(iForm.id)).First();
                    iData.firstName = iForm.firstName;
                    iData.lastName = iForm.lastName;
                    iData.age = iForm.age;
                    iData.active = iForm.active;
                    db.SaveChanges();
                    nRegistrosAfectados = 1;
                }
            }
            catch(Exception ex)
            {
                nRegistrosAfectados = 0;
            }
            return nRegistrosAfectados;
        }

        public int eliminar(int id)
        {
            nuevoEntities db = new nuevoEntities();
            var nRegistrosAfectados = 0;
            try
            {
                
                crud iData = db.cruds.Where(p => p.id.Equals(id)).First();
                iData.active = 0;
                db.SaveChanges();
                nRegistrosAfectados = 1;
            }
            catch(Exception ex)
            {
                nRegistrosAfectados = 0;
            }
            return nRegistrosAfectados;
        }
    }
}