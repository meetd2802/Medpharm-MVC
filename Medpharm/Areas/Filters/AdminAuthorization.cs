using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using System;

namespace Medpharm.Filters
{
    public class AdminAuthorization : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var adminSession = context.HttpContext.Session.GetString("AdminUsername");

            // ✅ Allow access to AdminLogin & Logout without authentication
            var actionName = context.ActionDescriptor.RouteValues["action"];
            if (actionName == "AdminLogin" || actionName == "Logout")
            {
                return;
            }

            // 🔹 Redirect to Login if session is missing
            if (string.IsNullOrEmpty(adminSession))
            {
                context.Result = new RedirectToRouteResult(new
                {
                    area = "AdminPanel",
                    controller = "Home",
                    action = "AdminLogin"
                });
            }
        }
    }
}