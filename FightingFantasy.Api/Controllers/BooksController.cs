using FightingFantasy.Api.ViewModels;
using FightingFantasy.Dal.DbContexts;
using FightingFantasy.Dal.Repositories;
using FightingFantasy.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : BaseController
    {
        private readonly IRepository<Book> _bookRepository;
        private readonly ILogger<Book> _logger;

        public BooksController(IRepository<User> userRepo, IRepository<Book> bookRepository, ILogger<Book> logger) : base(userRepo)
        {
            _bookRepository = bookRepository;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet(Name = "GetAllBooks")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<BookModel>))]
        public async Task<IEnumerable<BookModel>> Get()
        {
            var books = await _bookRepository.GetAsync(
                include: book => book
                .Include(x => x.Stats));

            return books.Select(x => new BookModel(x));
        }

        [HttpGet("{bookId:long}", Name = "GetBookById")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(BookModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(long bookId)
        {
            var book = await _bookRepository.GetSingleAsync(
                filter: x => x.Id == bookId,
                include: book => book
                .Include(x => x.Stats));
            
            return book != null ? 
                Ok(new BookModel(book)) : 
                NotFound(new ProblemDetails 
                {
                    Title = BaseController.BookNotFoundMsg
                });
        }
    }
}
