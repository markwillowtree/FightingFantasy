using FightingFantasy.Mvc.ApiClients;
using FightingFantasy.Mvc.Models.PlayThroughs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Controllers
{
    public class PlayThroughController : BaseController
    {
        public PlayThroughController(IClient apiClient) : base(apiClient)
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

            return RedirectToAction("Index", "PlayThrough", new { playThroughId = playThroughId });
        }

        [HttpPost]
        public async Task UpdateParagraph(long playthroughId, [FromBody] PlayThroughParagraphModel model)
        {
           await _apiClient.UpdateParagraphAsync(playthroughId, model);
        }

        [HttpPost]
        public async Task<long> AppendParagraph(long playthroughId, [FromBody] PlayThroughParagraphModel model)
        {
            long newId = await _apiClient.AppendParagraphAsync(playthroughId, model);

            return newId;
        }

        [HttpPost]
        public async Task DeleteLastParagraph(long playthroughId)
        {
            await _apiClient.DeleteLastParagraphAsync(playthroughId);
        }
    }
}
