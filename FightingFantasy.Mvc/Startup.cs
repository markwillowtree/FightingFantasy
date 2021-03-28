using FightingFantasy.Mvc.ApiClients;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.CookiePolicy;
using FightingFantasy.Infrastructure.Logging;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using FightingFantasy.Mvc.Middleware;
using Microsoft.AspNetCore.Identity;
using FightingFantasy.Domain;

namespace FightingFantasy.Mvc
{
    public class Startup
    {
        IConfiguration _configuration;
        public Startup(IConfiguration config)
        {
            _configuration = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();

            services.AddTransient<IClient>(x => new Client("https://localhost:44377/", new HttpClient()));

            JwtSecurityTokenHandler.DefaultMapInboundClaims = false;

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = "oidc";
            })
            .AddCookie(options =>
            {
                options.Cookie.Name = "mvccode";
            })
            .AddOpenIdConnect("oidc", options =>
            {
                options.Authority = "https://localhost:44370";
                options.RequireHttpsMetadata = false;

                options.ClientId = "CustomerMvcClient";
                options.ClientSecret = "CustomerMvcClientSecret";
                options.SignInScheme = "Cookies";
                options.ResponseType = "code";
                options.UsePkce = true;

                options.Scope.Add("CustomerScope");
                options.SaveTokens = true;

                // this is to handle the scenario where user clicks back button after logging in
                // and ends up being redirected to signin-oidc
                options.Events.OnRemoteFailure = context =>
                {
                    context.HandleResponse();
                    context.Response.Redirect("/");

                    return Task.FromResult(0);
                };
                
            });




            services.AddControllersWithViews()
                .AddRazorRuntimeCompilation()
                .AddNewtonsoftJson(options =>
                options.SerializerSettings.MaxDepth = 800 // books have maximum 400 paragraphs, doubling this for safety
            );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseErrorLogging();
            app.UseTokenExpired();


            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute().RequireAuthorization();
            });
        }
    }
}
