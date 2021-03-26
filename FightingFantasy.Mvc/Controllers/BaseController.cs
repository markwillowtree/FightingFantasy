using FightingFantasy.Mvc.ApiClients;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Controllers
{
    public abstract class BaseController : Controller
    {
        readonly string _bookCoversDir = "images/book_covers";
        readonly string[] _bookCoverImages;
        readonly protected IClient _apiClient;

        public BaseController(IClient apiClient, IWebHostEnvironment env)
        {
            _apiClient = apiClient ?? throw new ArgumentNullException(nameof(apiClient));

            _bookCoverImages = Directory.GetFileSystemEntries(Path.Combine(env.WebRootPath, _bookCoversDir))
                .Select(x => Path.GetFileName(x)).ToArray();
        }

        protected string GetBookCoverPath(BookModel book)
        {
            string coverFile = _bookCoverImages.Where(x => x.StartsWith(book.Code + "_")).FirstOrDefault();
            if (!String.IsNullOrEmpty(coverFile))
                return $"/{_bookCoversDir}/{coverFile}";

            return string.Empty;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var accessToken = HttpContext.GetTokenAsync("access_token").GetAwaiter().GetResult();
            _apiClient.SetBearerToken(accessToken);

            base.OnActionExecuting(context);
        }
    }
}
