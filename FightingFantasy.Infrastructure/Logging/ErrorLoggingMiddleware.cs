using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FightingFantasy.Infrastructure.Logging
{
    public class ErrorLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorLoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, ILogger<ErrorLoggingMiddleware> logger)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                logger.LogError($"The following error happened: {e.ToString()}");
                throw;
            }
        }
    }
}
