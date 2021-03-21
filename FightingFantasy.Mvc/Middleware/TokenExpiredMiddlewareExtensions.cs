using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Middleware
{
    public static class TokenExpiredMiddlewareExtensions
    {
        public static IApplicationBuilder UseTokenExpired(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<TokenExpiredMiddleware>();
        }
    }
}
