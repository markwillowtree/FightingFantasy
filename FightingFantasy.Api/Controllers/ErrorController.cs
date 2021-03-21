using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api.Controllers
{
    [ApiController]
    public class ErrorController : ControllerBase
    {
        private readonly ILogger _logger;
        public ErrorController(ILogger logger)
        {
            _logger = logger;
        }

        [Route("error")]
        IActionResult ErrorHandler()
        {
            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
            var exception = context.Error; // Your exception

            _logger.LogError(exception.ToString());

            return StatusCode(500, new ProblemDetails
            {
                Title = "Unknown error"
            });
        }
    }
}
