using FightingFantasy.Mvc.ApiClients;
using FightingFantasy.Mvc.Models.Home;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Controllers
{
    public class HomeController : BaseController
    {
        readonly string _bookCoversDir = "images/book_covers";
        readonly string[] _bookCoverImages;

        public HomeController(IClient apiClient, IWebHostEnvironment env) : base(apiClient)
        {
            _bookCoverImages = Directory.GetFileSystemEntries(Path.Combine(env.WebRootPath, _bookCoversDir))
                .Select(x => Path.GetFileName(x)).ToArray();
        }

        [AllowAnonymous]
        public async Task<IActionResult> Index()
        {
            var books = await _apiClient.GetAllBooksAsync();

            var vm = new IndexViewModel();
            foreach(var book in books)
            {
                vm.Books.Add(new BookViewModel
                {
                    BookCode = book.Code,
                    Description = book.Description,
                    Id = book.Id,
                    Title = book.Title,
                    ImageUrl = GetBookCoverPath(book)
                });
            }
            
            return View(vm);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Register()
        {
            var vm = new RegisterViewModel();

            return View(vm);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel vm)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _apiClient.RegisterAccountAsync(vm.Username, vm.Password);

                    return Challenge(new AuthenticationProperties
                    {
                        RedirectUri = "/"
                    });
                }
                catch (ApiException<ApiClients.ProblemDetails> e)
                {
                    vm.ErrorMsg = e.Result.Title;
                }
            }

            return View(vm);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Login()
        {
            return Challenge(new AuthenticationProperties
            {
                RedirectUri = "/"
            });
        }

        [HttpGet]
        public IActionResult ChangePassword()
        {
            return View(new ChangePasswordViewModel());
        }

        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await _apiClient.ChangePasswordAsync(model.CurrentPassword, model.NewPassword);
                    model.SuccessMsg = "Password changed";
                }
                catch (ApiException<ApiClients.ProblemDetails> e)
                {
                    model.ErrorMsg = e.Result.Title;
                }
            }

            return View(model);
        }

        public async Task<IActionResult> BookDetail(long bookId)
        {
            var vm = new BookDetailsViewModel();

            try
            {
                var book = await _apiClient.GetBookByIdAsync(bookId);
                var playthroughs = await _apiClient.GetPlaythroughsByBookIdAsync(bookId);
    
                vm.Book = new BookViewModel
                {
                    BookCode = book.Code,
                    Description = book.Description,
                    Id = book.Id,
                    ImageUrl = GetBookCoverPath(book),
                    Title = book.Title,
                };
                vm.Playthroughs = playthroughs.ToList();
            }
            catch (ApiException<ApiClients.ProblemDetails> e)
            {
                vm.ErrorMsg = e.Result.Title;
            }
            return View(vm);
        }

        private string GetBookCoverPath(BookModel book)
        {
            string coverFile = _bookCoverImages.Where(x => x.StartsWith(book.Code + "_")).FirstOrDefault();
            if (!String.IsNullOrEmpty(coverFile))
                return $"/{_bookCoversDir}/{coverFile}";

            return string.Empty;
        }

    }
}
