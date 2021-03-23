using FightingFantasy.Dal.Repositories;
using FightingFantasy.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : BaseController
    {
        public readonly static string UserAlreadyExists = "A user of that name already exists";
        public readonly static string UserCouldNotBeCreated = "Could not create user";
        public readonly static string PasswordCouldNotBeChanged = "Could not change password";

        private readonly UserManager<User> _userManager;

        public AccountController(UserManager<User> userManager, IRepository<User> userRepository) : base(userRepository)
        {
            this._userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPut(Name = "RegisterAccount")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> Register(string username, string password)
        {
            // check if user already exists
            var user = await _userManager.FindByNameAsync(username);
            if (user != null)
                return Conflict(new ProblemDetails
                {
                    Title = UserAlreadyExists
                });

            var result = await _userManager.CreateAsync(new Domain.User
            {
                UserName = username
            }, password);

            if (result.Succeeded)
                return Ok();
            else
                return UnprocessableEntity(new ProblemDetails
                {
                    Title = UserCouldNotBeCreated
                });
        }

        [HttpPost(Name = "ChangePassword")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status422UnprocessableEntity)]
        public async Task<IActionResult> ResetPassword(string oldPassword, string newPassword)
        {
            var user = await GetUser();

            var result = await _userManager.ChangePasswordAsync(user, oldPassword, newPassword);

            return result.Succeeded ? Ok(): UnprocessableEntity(new ProblemDetails
                                                                {
                                                                    Title = PasswordCouldNotBeChanged
                                                                });
        }
    }
}
