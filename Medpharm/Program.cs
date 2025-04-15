using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Register services.
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();

// ✅ Add session services
builder.Services.AddDistributedMemoryCache(); // Enables in-memory session storage
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Session expires after 30 minutes
    options.Cookie.HttpOnly = true; // Security setting for cookies
    options.Cookie.IsEssential = true; // Required for session persistence
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Shows detailed exception page for debugging
}
else
{
    app.UseExceptionHandler("/Home/Error"); // Redirect to error page in production
    app.UseHsts(); // Add HTTP Strict Transport Security for security
}

// Middlewares for request handling
app.UseHttpsRedirection(); // Redirect HTTP to HTTPS
app.UseStaticFiles(); // Enable static files (images, CSS, JS, etc.)

app.UseRouting(); // Set up routing middleware

// ✅ Enable session middleware before authorization
app.UseSession();

app.UseAuthorization(); // Enable authorization

// Map API controllers for the MVC app (if using Web API controllers separately)
app.MapControllers();

// Ensure Default Route
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Ensure Appointment Routes Work
app.MapControllerRoute(
    name: "appointment",
    pattern: "Appointment/{action=Index}/{id?}",
    defaults: new { controller = "Appointment" });

// Ensure Routing for Areas (this will fix 404 for `/AdminPanel/AddAppointment/...`)
app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.Run();