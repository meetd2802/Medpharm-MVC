using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Medpharm.Models;
using Newtonsoft.Json;

namespace Medpharm.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly HttpClient _httpClient;

        public HomeController(ILogger<HomeController> logger, HttpClient httpClient)
        {
            _logger = logger;
            _httpClient = httpClient;
        }

        public IActionResult Index() => View();
        public IActionResult Appointment() => View();
        public IActionResult MedicalUpdates() => View();
        public IActionResult Doctors() => View();
        public IActionResult Contact() => View();
        public IActionResult Login() => View();
        public IActionResult Register() => View();
        public IActionResult Services() => View();
        public IActionResult Privacy() => View();

        public IActionResult Appointmentdetails() => View();

        public IActionResult Changepassword() => View();
        
        public IActionResult UserProfile()
        {
            var adminId = HttpContext.Session.GetString("AdminId");
            if (string.IsNullOrEmpty(adminId))
            {
                return View("UserProfile");
            }

            ViewBag.AdminId = adminId;
            return View("UserProfile");
        }

        [HttpPost]
        public async Task<IActionResult> Login(AdminLoginModel model)
        {
            var apiUrl = "http://localhost:5071/api/Admin/login"; // API login endpoint

            var jsonData = JsonConvert.SerializeObject(model);
            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(apiUrl, content);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                var adminData = JsonConvert.DeserializeObject<dynamic>(responseData);

                // Store admin info in session
                HttpContext.Session.SetString("AdminData", JsonConvert.SerializeObject(new
                {
                    id = adminData.admin.id,
                    fullName = adminData.admin.fullName,
                    userName = adminData.admin.userName,
                    email = adminData.admin.email
                }));

                return Json(new { success = true, message = "Login successful" });
            }
            else
            {
                return Json(new { success = false, message = "Invalid credentials" });
            }
        }

        [HttpPost]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Json(new { success = true, message = "Logged out successfully" });
        }

        [HttpGet]
        public IActionResult CheckSession()
        {
            var adminId = HttpContext.Session.GetString("AdminId");
            var adminUsername = HttpContext.Session.GetString("AdminUsername");

            if (string.IsNullOrEmpty(adminId))
            {
                return Json(new { loggedIn = false, message = "Admin not logged in." });
            }

            return Json(new { loggedIn = true, adminId, adminUsername });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }

    public class AdminLoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}