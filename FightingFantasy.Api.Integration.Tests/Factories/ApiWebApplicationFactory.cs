using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using FightingFantasy.Dal.DbContexts;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc.Testing;
using System.IO;
using Microsoft.Extensions.PlatformAbstractions;
using WebMotions.Fake.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using FightingFantasy.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FightingFantasy.Api.Integration.Tests.Factories
{
    public class ApiWebApplicationFactory : WebApplicationFactory<TestStartup>
    {
        private readonly IConfiguration _configuration; 
        public ApiWebApplicationFactory(IConfiguration config)
        {
            _configuration = config;
            //_connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        protected override IWebHostBuilder CreateWebHostBuilder()
        {

            return WebHost.CreateDefaultBuilder()
                .UseStartup<TestStartup>();
        }


        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services
                    .AddEntityFrameworkSqlite()
                    .AddEntityFrameworkProxies()
                    .AddDbContext<FightingFantasyDbContext>(options =>
                    {
                        options.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
                        options.UseInternalServiceProvider(services.BuildServiceProvider());
                        options.UseLazyLoadingProxies();
                    })
                    .AddAuthentication(FakeJwtBearerDefaults.AuthenticationScheme).AddFakeJwtBearer();

                //services.AddIdentity<User, IdentityRole<long>>(o =>
                // {
                //     o.Password.RequireDigit = false;
                //     o.Password.RequireUppercase = false;
                //     o.Password.RequireNonAlphanumeric = false;
                // }).AddEntityFrameworkStores<FightingFantasyDbContext>();

                services.AddTransient<UserManager<User>, UserManager<User>>();
                services.AddTransient<IUserStore<User>, UserStore<User, IdentityRole<long>, FightingFantasyDbContext, long>>();
                services.AddTransient<IPasswordHasher<User>, PasswordHasher<User>>();
                services.AddTransient<ILookupNormalizer, UpperInvariantLookupNormalizer>();
                services.AddTransient<IdentityErrorDescriber, IdentityErrorDescriber>();

                var sp = services.BuildServiceProvider();

                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var db = scopedServices.GetRequiredService<FightingFantasyDbContext>();
                    db.Database.EnsureDeleted();
                    db.Database.EnsureCreated();

                    var userManager = scopedServices.GetRequiredService<UserManager<User>>();
                    if (!userManager.Users.Any())
                    {
                        var user = new User
                        {
                            UserName = "username",
                            NormalizedUserName = "username"
                        };

                        userManager.CreateAsync(user, "password").Wait();

                        var user2 = new User
                        {
                            UserName = "username2",
                            NormalizedUserName = "username2"
                        };

                        userManager.CreateAsync(user2, "password").Wait();
                    }
                }
            });
        }
    }
}
