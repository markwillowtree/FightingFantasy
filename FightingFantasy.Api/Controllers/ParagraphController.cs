using FightingFantasy.Api.ViewModels;
using FightingFantasy.Dal.Repositories;
using FightingFantasy.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.Extensions.Logging;

namespace FightingFantasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParagraphController : BaseController
    {
        IRepository<Playthrough> _playthroughRepository;
        private readonly IRepository<PlaythroughParagraph> _paragraphRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ParagraphController(IUnitOfWork unitOfWork,
            IRepository<Book> bookRepository,
            IRepository<Playthrough> playthroughRepository,
            IRepository<PlaythroughParagraph> paragraphRepository,
            IRepository<User> userRepository) : base(userRepository)
        {
            _unitOfWork = unitOfWork;
            _playthroughRepository = playthroughRepository;
            _paragraphRepository = paragraphRepository;
        }

        [HttpPut("UpdateParagraph", Name = "UpdateParagraph")]
        [SwaggerResponse(StatusCodes.Status404NotFound)]
        [SwaggerResponse(StatusCodes.Status404NotFound)]
        [SwaggerResponse(StatusCodes.Status200OK)]
        public async Task<ActionResult> UpdateParagraph(long playthroughId, [FromBody] PlayThroughParagraphModel paragraph)
        {
            // get playthrough
            var playthrough = await getPlaythrough(playthroughId);
            if (playthrough == null)
                return NotFound(new ProblemDetails
                {
                    Title = PlaythroughNotFoundMsg
                });

            // get paragraph
            var dbParagraph = playthrough.GetParagraphs().SingleOrDefault(x => x.Id == paragraph.Id);          
            if (dbParagraph == null)
            {
                return NotFound(new ProblemDetails
                {
                    Title = ParagraphNotFoundMsg
                });
            }

            // validate stats
            if (!StatsAreValid(playthrough, paragraph))
                return NotFound(new ProblemDetails
                {
                    Title = InvalidStat
                });

            // update paragraph
            dbParagraph.Items = paragraph.Items;
            dbParagraph.Description = paragraph.Description;
            dbParagraph.ParagraphNumber = paragraph.Number;
            dbParagraph.ToParagraphId = paragraph.ToParagraphId;

            foreach (var stat in dbParagraph.PlaythroughStats)
            {
                var paraStat = paragraph.Stats.Single(x => x.Name == stat.Stat.StatName);
                stat.Value = paraStat.Value;
            }

            // commit
            try
            {
                _unitOfWork.BeginTransaction();
                _paragraphRepository.Update(dbParagraph);
                _unitOfWork.Commit();
            }
            catch (Exception e)
            {

                throw;
            }

            return Ok();
        }

        [HttpPost("AppendParagraph", Name = "AppendParagraph")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(long))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> AppendParagraph(long playthroughId, [FromBody] PlayThroughParagraphModel model)
        {
            // get playthrough
            var playthrough = await getPlaythrough(playthroughId);
            if (playthrough == null)
                return NotFound(new ProblemDetails
                {
                    Title = PlaythroughNotFoundMsg
                });

            // validate stats
            if (!StatsAreValid(playthrough, model))
                return NotFound(new ProblemDetails
                {
                    Title = InvalidStat
                });

            var lastParagraph = playthrough.GetParagraphs().LastOrDefault();

            var paragraph = new PlaythroughParagraph
            {
                Description = model.Description,
                Items = model.Items,
                ParagraphNumber = model.Number,
                PlaythroughStats = model.Stats.Select(x => new PlaythroughStat { StatId = x.StatId, Value = x.Value }).ToArray(),
            };

            try
            {
                _unitOfWork.BeginTransaction();
                lastParagraph.ToParagraph = paragraph;
                await _paragraphRepository.Add(paragraph);
                _paragraphRepository.Update(lastParagraph);
                _unitOfWork.Commit();
            }
            catch (Exception e)
            {

                throw;
            }

            return Ok(paragraph.Id);
        }

        [HttpDelete("DeleteParagraph/{playthroughId:long}", Name = "DeleteLastParagraph")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult> DeleteLastParagraph(long playthroughId)
        {
            var playthrough = await getPlaythrough(playthroughId);
            if (playthrough == null)
                return NotFound(new ProblemDetails
                {
                    Title = PlaythroughNotFoundMsg
                });

            // first paragraph cant be deleted
            if (playthrough.StartParagraph.ToParagraph == null)
                return Conflict(new ProblemDetails
                {
                    Title = CantDeleteFirstParagraphMsg
                });

            // get paragraph to be deleted and the one preceding it
            var paragraphs = playthrough.GetParagraphs().ToArray();
            var lastTwo = paragraphs.Skip(paragraphs.Length - 2).ToArray();

            PlaythroughParagraph prev = lastTwo[0];
            PlaythroughParagraph curr = lastTwo[1];

            prev.ToParagraph = null;
            prev.ToParagraphId = null;

            try
            {
                _unitOfWork.BeginTransaction();
                _paragraphRepository.Update(prev);
                _paragraphRepository.Delete(curr);
                _unitOfWork.Commit();
            }
            catch (Exception e)
            {

                throw;
            }

            return Ok();
        }

        private bool StatsAreValid(Playthrough playthrough, PlayThroughParagraphModel paragraph)
        {
            // validate stats
            foreach (var stat in paragraph.Stats)
            {
                if (!StatIsValid(playthrough, stat))
                {
                    return false;
                }
            }

            return true;
        }
        private bool StatIsValid(Playthrough playthrough, PlaythroughStatModel stat)
        {
            var bookStat = playthrough.Book.Stats.SingleOrDefault(x => x.StatName == stat.Name && x.Id == stat.StatId);

            return bookStat != null;
        }
    }
}
