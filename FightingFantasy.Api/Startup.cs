using FightingFantasy.Dal.DbContexts;
using FightingFantasy.Dal.Repositories;
using FightingFantasy.Domain;
using FightingFantasy.Infrastructure.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api
{
    public class Startup
    {
        public IConfiguration _configuration { get; }

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();

            AddSecurityServices(services);
            AddDatabaseServices(services);
            AddRepositoryServices(services);
            AddControllerServices(services);
        }

        protected virtual void AddRepositoryServices(IServiceCollection services)
        {
            services.AddTransient<IRepository<User>, Repository<FightingFantasyDbContext, User>>();
            services.AddTransient<IRepository<Book>, Repository<FightingFantasyDbContext, Book>>();
            services.AddTransient<IRepository<Playthrough>, Repository<FightingFantasyDbContext, Playthrough>>();
            services.AddTransient<IRepository<PlaythroughParagraph>, Repository<FightingFantasyDbContext, PlaythroughParagraph>>();
            services.AddTransient<IRepository<PlaythroughStat>, Repository<FightingFantasyDbContext, PlaythroughStat>>();
            services.AddTransient<IUnitOfWork, UnitOfWork>();
        }

        protected virtual void AddDatabaseServices(IServiceCollection services)
        {
            services
                .AddEntityFrameworkSqlite()
                .AddEntityFrameworkProxies()
                .AddDbContext<FightingFantasyDbContext>(options =>
                {
                    options.UseLazyLoadingProxies();
                    options.UseSqlite(_configuration.GetConnectionString("DefaultConnection"));
                });
                    
        }

        protected virtual void AddSecurityServices(IServiceCollection services)
        {
            IdentityModelEventSource.ShowPII = true;

            services.AddIdentityCore<User>(options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<FightingFantasyDbContext>();

            services.AddAuthentication("Bearer")
                            .AddJwtBearer("Bearer", options =>
                            {
                                options.Authority = "https://localhost:44370";

                                options.TokenValidationParameters = new TokenValidationParameters
                                {
                                    //ClockSkew = new TimeSpan(0), // useful for forcing token expiration during testing
                                    ValidateAudience = false
                                };
                            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy("ApiScope", policy =>
                {
                    policy.RequireAuthenticatedUser();
                    policy.RequireClaim("scope", "CustomerScope");
                });
            });

            services.AddCors(options =>
            {
                options.AddPolicy("default", policy =>
                {
                    policy.WithOrigins("https://localhost:44322")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
        }

        protected virtual void AddControllerServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ApiTemplate", Version = "v1" });

                // required to have properties marked as nullable in swagger JSON
                c.UseAllOfToExtendReferenceSchemas();
                c.UseOneOfForPolymorphism();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public virtual void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseExceptionHandler("/error");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ApiTemplate v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers().RequireAuthorization();
            });
        }
    }
}
