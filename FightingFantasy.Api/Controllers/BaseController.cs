using FightingFantasy.Dal.Repositories;
using FightingFantasy.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api.Controllers
{
    public abstract class BaseController : ControllerBase
    {
        private readonly IRepository<User> _userRepository;

        public static readonly string BookNotFoundMsg = "Book not found";
        public static readonly string ParagraphNotFoundMsg = "Paragraph not found";
        public static readonly string PlaythroughNotFoundMsg = "Playthrough not found";
        public static readonly string CantDeleteFirstParagraphMsg = "First paragraph cannot be deleted";
        public static readonly string InvalidStat = "Invalid stat";

        public BaseController(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        protected async Task<Playthrough> getPlaythrough(long playthroughId)
        {
            var user = await GetUser();
            var playthrough = user.PlayThroughs.SingleOrDefault(x => x.Id == playthroughId);

            return playthrough;
        }

        protected async Task<User> GetUser()
        {
            // get user
            var userId = HttpContext.User.Claims.Single(x => x.Type == "UserId").Value;
            var user = await _userRepository.GetSingleAsync(x => x.Id == long.Parse(userId));
            return user;
        }
    }
}
