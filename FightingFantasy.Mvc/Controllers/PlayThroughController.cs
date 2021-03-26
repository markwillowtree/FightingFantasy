using FightingFantasy.Mvc.ApiClients;
using FightingFantasy.Mvc.Models.PlayThroughs;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Controllers
{
    public class PlayThroughController : BaseController
    {
        public PlayThroughController(IClient apiClient, IWebHostEnvironment env) : base(apiClient, env)
        {
        }

        public async Task<IActionResult> Index(long playThroughId)
        {
            var playThrough = await _apiClient.GetPlaythroughAsync(playThroughId);

            var vm = new IndexViewModel(playThrough);

            return View(vm);
        }

        public async Task<IActionResult> Create(long bookId)
        {
            long playThroughId = await _apiClient.CreatePlaythroughAsync(bookId); ;

            return RedirectToAction("InitialiseCharacter", "PlayThrough", new { playThroughId = playThroughId });
        }

        [HttpGet]
        public async Task<IActionResult> InitialiseCharacter(long playthroughId)
        {
            var playthrough = await _apiClient.GetPlaythroughAsync(playthroughId);

            var vm = new InitialiseCharacterViewModel
            {
                Stats = playthrough.StartParagraph.Stats.ToList(),
                BookImageUrl = GetBookCoverPath(playthrough.Book),
                PlaythroughId = playthrough.Id
            };

            return View(vm);
        }

        [HttpPost]
        public async Task<IActionResult> InitialiseCharacter(InitialiseCharacterViewModel vm)
        {
            foreach (var stat in vm.Stats)
            {
                await _apiClient.UpdateStatAsync(stat);
            }

            return RedirectToAction("Index", "PlayThrough", new { playThroughId = vm.PlaythroughId });
        }

        [HttpPost]
        public async Task UpdateParagraph(long playthroughId, [FromBody] PlayThroughParagraphModel model)
        {
           await _apiClient.UpdateParagraphAsync(playthroughId, model);
        }

        [HttpPost]
        public async Task<PlayThroughParagraphModel> AppendParagraph(long playthroughId, [FromBody] PlayThroughParagraphModel model)
        {
            PlayThroughParagraphModel paragraph = await _apiClient.AppendParagraphAsync(playthroughId, model);

            return paragraph;
        }

        [HttpPost]
        public async Task DeleteLastParagraph(long playthroughId)
        {
            await _apiClient.DeleteLastParagraphAsync(playthroughId);
        }
    }
}
