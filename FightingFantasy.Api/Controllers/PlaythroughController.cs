using FightingFantasy.Api.ViewModels;
using FightingFantasy.Dal.Repositories;
using FightingFantasy.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaythroughController : BaseController
    {
        private readonly IRepository<Book> _bookRepository;
        private readonly IRepository<Playthrough> _playthroughRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IUnitOfWork _unitOfWork;

        public PlaythroughController(IUnitOfWork unitOfWork,
            IRepository<Book> bookRepository,
            IRepository<Playthrough> playthroughRepository,
            IRepository<User> userRepository) : base(userRepository)
        {
            _unitOfWork = unitOfWork;
            _bookRepository = bookRepository;
            _playthroughRepository = playthroughRepository;
            _userRepository = userRepository;
        }


        [HttpGet("ByBookId/{bookId:long}", Name = "GetPlaythroughsByBookId")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<PlayThroughModel>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPlaythroughByBookId(long bookId)
        {
            User user = await GetUser();

            Book book = await _bookRepository.GetSingleAsync(x => x.Id == bookId);
            if (book == null)
            {
                return NotFound(new ProblemDetails
                {
                    Title = BookNotFoundMsg
                });
            }

            var playthroughs = user.PlayThroughs
                .Where(x => x.Book.Id == book.Id)
                .Select(x => new PlayThroughModel(x)).ToList();

            return Ok(playthroughs);
        }

        [HttpGet("{playthroughId:long}", Name = "GetPlaythrough")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(PlayThroughModel))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPlaythrough(long playthroughId)
        {
            var playthrough = await getPlaythrough(playthroughId);

            return playthrough != null ? 
                Ok(new PlayThroughModel(playthrough)) :
                NotFound(new ProblemDetails
                {
                    Title = PlaythroughNotFoundMsg
                });
        }

        [HttpPost("{bookId:long}", Name = "CreatePlaythrough")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(long))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> CreatePlaythrough(long bookId)
        {
            User user = await GetUser();

            // get book 
            var book = await _bookRepository.GetSingleAsync(filter: x => x.Id == bookId);
            if (book == null)
                return NotFound(new ProblemDetails
                {
                    Title = BookNotFoundMsg
                });

            // create playthrough and add it to user
            var playThrough = new Playthrough(book);
            user.PlayThroughs.Add(playThrough);

            _unitOfWork.BeginTransaction();
            await _playthroughRepository.Add(playThrough);
            _userRepository.Update(user);
            _unitOfWork.Commit();

            return Ok(playThrough.Id);
        }

        //private async Task<User> GetUser()
        //{
        //    // get user
        //    var userId = HttpContext.User.Claims.Single(x => x.Type == "UserId").Value;
        //    var user = await _userRepository.GetSingleAsync(x => x.Id == long.Parse(userId));
        //    return user;
        //}
    }
}
