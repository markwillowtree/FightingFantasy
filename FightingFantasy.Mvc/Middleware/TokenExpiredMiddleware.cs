using FightingFantasy.Domain;
using FightingFantasy.Mvc.ApiClients;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Middleware
{
    public class TokenExpiredMiddleware
    {
        private readonly RequestDelegate _next;
        public TokenExpiredMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, ILogger<TokenExpiredMiddleware> logger)
        {
            try
            {
                await _next(context);
            }
            catch (ApiException e) when (e.StatusCode == 401)
            {
                logger.LogError($"401 error from API, logging user out and redirecting to Home/Index");
                await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                // after signout this will redirect to your provided target
                await context.SignOutAsync("oidc", new AuthenticationProperties
                {
                    RedirectUri = "/"
                });
            }
        }
    }
}
