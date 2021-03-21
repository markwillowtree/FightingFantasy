using FightingFantasy.Mvc.ApiClients;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Controllers
{
    public abstract class BaseController : Controller
    {
        readonly protected IClient _apiClient;

        public BaseController(IClient apiClient)
        {
            _apiClient = apiClient ?? throw new ArgumentNullException(nameof(apiClient));

            
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var accessToken = HttpContext.GetTokenAsync("access_token").GetAwaiter().GetResult();
            _apiClient.SetBearerToken(accessToken);

            base.OnActionExecuting(context);
        }
    }
}
