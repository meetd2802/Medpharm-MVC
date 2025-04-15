using Medpharm.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace Medpharm.Areas.AdminPanel.Controllers
{
    [Area("AdminPanel")]
    [Route("AdminPanel/[controller]/[action]")]
    [AdminAuthorization] // ✅ Ensures only authorized admins can access
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString("AdminId")))
            {
                return RedirectToAction("Login", "Admin", new { area = "AdminPanel" });
            }
            return View();
        }

        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Json(new { success = true, message = "Logged out successfully." });
        }

        [AllowAnonymous]
        public IActionResult AdminLogin()
        {
            return View("~/Areas/AdminPanel/Views/Home/AdminLogin.cshtml");
        }

        public IActionResult Profile()
        {
            var adminId = HttpContext.Session.GetString("AdminId");
            if (string.IsNullOrEmpty(adminId))
            {
                return RedirectToAction("Login", "Admin", new { area = "AdminPanel" });
            }

            ViewBag.AdminId = adminId;
            return View("~/Areas/AdminPanel/Views/Home/Profile.cshtml");
        }

        public IActionResult Admin()
        {
            var userRole = HttpContext.Session.GetString("AdminRole");

            if (userRole != "CEO" && userRole != "Manager")
            {
                return RedirectToAction("Index", "Home", new { area = "AdminPanel" });
            }

            return View("~/Areas/AdminPanel/Views/Home/Admin.cshtml");
        }

        public IActionResult AddAdmin()
        {
            return View("~/Areas/AdminPanel/Views/Home/AddAdmin.cshtml");
        }

        public IActionResult UpdateAdmin(int id)
        {
            var adminId = HttpContext.Session.GetString("AdminId");
            if (string.IsNullOrEmpty(adminId))
            {
                return RedirectToAction("Login", "Admin", new { area = "AdminPanel" });
            }

            ViewBag.AdminId = id;
            return View("~/Areas/AdminPanel/Views/Home/UpdateAdmin.cshtml");
        }

        public IActionResult ChangePassword(int? id)
        {
            var adminId = HttpContext.Session.GetString("AdminId");
            if (string.IsNullOrEmpty(adminId))
            {
                return RedirectToAction("Login", "Admin", new { area = "AdminPanel" });
            }

            if (!id.HasValue)
            {
                id = int.Parse(adminId);
            }

            ViewBag.TargetAdminId = id;
            return View("~/Areas/AdminPanel/Views/Home/ChangePassword.cshtml");
        }

        public IActionResult FrontDesk()
        {
            return View("~/Areas/AdminPanel/Views/Home/FrontDesk.cshtml");
        }

        public IActionResult Patient()
        {
            return View("~/Areas/AdminPanel/Views/Home/Patient.cshtml");
        }

        public IActionResult UpdateAppointment()
        {
            return View("~/Areas/AdminPanel/Views/Home/UpdateAppointment.cshtml");
        }

        [HttpGet]
        public IActionResult AddAppointment()
        {
            return View("~/Areas/AdminPanel/Views/Home/AddAppointment.cshtml");
        }

        public IActionResult AddPatientDetail()
        {
            return View("~/Areas/AdminPanel/Views/Home/AddPatientDetail.cshtml");
        }

        public IActionResult UpdatePatient()
        {
            return View("~/Areas/AdminPanel/Views/Home/UpdatePatient.cshtml");
        }

        public IActionResult Doctor()
        {
            return View("~/Areas/AdminPanel/Views/Home/Doctor.cshtml");
        }

        public IActionResult AddDoctor()
        {
            return View("~/Areas/AdminPanel/Views/Home/AddDoctor.cshtml");
        }

        public IActionResult UpdateDoctor()
        {
            return View("~/Areas/AdminPanel/Views/Home/UpdateDoctor.cshtml");
        }

        public IActionResult MedicalUpdates()
        {
            return View("~/Areas/AdminPanel/Views/Home/MedicalUpdates.cshtml");
        }

        public IActionResult AddUpdates()
        {
            return View("~/Areas/AdminPanel/Views/Home/AddUpdates.cshtml");
        }

        public IActionResult UpdateMedicalUpdate()
        {
            return View("~/Areas/AdminPanel/Views/Home/UpdateMedical.cshtml");
        }

        public IActionResult Users()
        {
            return View("~/Areas/AdminPanel/Views/Home/Users.cshtml");
        }

        public IActionResult Services()
        {
            return View("~/Areas/AdminPanel/Views/Home/Services.cshtml");
        }

        public IActionResult HealthTip()
        {
            return View("~/Areas/AdminPanel/Views/Home/HealthTip.cshtml");
        }

        public IActionResult Waitlist()
        {
            return View("~/Areas/AdminPanel/Views/Home/Waitlist.cshtml");
        }

        public IActionResult ContactUs()
        {
            return View("~/Areas/AdminPanel/Views/Home/ContactUs.cshtml");
        }

        public IActionResult AddServices()
        {
            return View("~/Areas/AdminPanel/Views/Home/AddServices.cshtml");
        }

        public IActionResult UpdateServices()
        {
            return View("~/Areas/AdminPanel/Views/Home/UpdateServices.cshtml");
        }

        public IActionResult AddHealthTip()
        {
            return View("~/Areas/AdminPanel/Views/Home/AddHealthTip.cshtml");
        }

        public IActionResult UpdateHealthTip()
        {
            return View("~/Areas/AdminPanel/Views/Home/UpdateHealthTip.cshtml");
        }

        public IActionResult Payments()
        {
            return View();
        }
    }
}
