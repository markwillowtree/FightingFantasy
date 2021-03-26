using FightingFantasy.Api.ViewModels;
using FightingFantasy.Dal.Repositories;
using FightingFantasy.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaythroughStatController : BaseController
    {
        IRepository<PlaythroughStat> _statRepo;
        IUnitOfWork _unitOfWork;
        public PlaythroughStatController(IRepository<User> userRepo, IUnitOfWork unitOfWork, IRepository<PlaythroughStat> statRepo) : base(userRepo)
        {
            _statRepo = statRepo;
            _unitOfWork = unitOfWork;
        }

        public string StatNotFoundMsg { get; private set; } = "Stat not found";
        public string UpdateFailedMsg { get; private set; } = "Update failed";

        [HttpPut(Name = "UpdateStat")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> UpdateStat(PlaythroughStatModel stat)
        {
            var dbStat = await _statRepo.GetSingleAsync(x => x.Id == stat.StatId);
            if (dbStat == null)
                return NotFound(new ProblemDetails
                {
                    Title = StatNotFoundMsg
                });

            dbStat.Value = stat.Value;
            try
            {
                _unitOfWork.BeginTransaction();
                _statRepo.Update(dbStat);
                _unitOfWork.Commit();

                return Ok();
            }
            catch (Exception e)
            {
                return Conflict(new ProblemDetails
                {
                    Title = UpdateFailedMsg
                });
            }
        }
    }
}
