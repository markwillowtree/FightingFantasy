using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FightingFantasy.Mvc.ApiClients;
using WebMotions.Fake.Authentication.JwtBearer;
using System.Net;
using System.Net.Http;
using FightingFantasy.Api.Integration.Tests.Helpers;
using FightingFantasy.Api;
using FightingFantasy.Api.Controllers;
using Microsoft.Extensions.Configuration;

namespace FightingFantasy.Api.Integration.Tests.EndpointTests
{
    [TestClass]
    public class PlaythroughsApiTests : BaseTest
    {
        [TestMethod]
        public async Task CreatePlaythrough_ShouldReturnGreaterThan0()
        {
            SetUserId(1);

            long playThroughid = await _apiClient.CreatePlaythroughAsync(1);

            Assert.IsTrue(playThroughid > 0);
        }

        [TestMethod]
        public async Task CreatePlaythroughGetPlaythrough_ShouldCreatePlaythrough()
        {
            SetUserId(1);

            long playThroughid = await _apiClient.CreatePlaythroughAsync(1);
            var  playThrough = await _apiClient.GetPlaythroughAsync(playThroughid);

            Assert.IsTrue(playThrough.Id == playThroughid);
            Assert.IsNotNull(playThrough.StartParagraph);
            Assert.IsNull(playThrough.StartParagraph.ToParagraph);
        }

        [TestMethod]
        public async Task User1CreatesPlaythroughThenAttemptsGet_ShouldReturnPlaythrough()
        {
            SetUserId(1);
            long playThroughid = await _apiClient.CreatePlaythroughAsync(1);
            
            var playthrough = await _apiClient.GetPlaythroughAsync(playThroughid);

            Assert.IsNotNull(playthrough);
        }

        [TestMethod]
        public async Task User1CreatesPlaythroughUser2AttemptsGet_ShouldReturnNotFound()
        {
            SetUserId(1);
            long playThroughid = await _apiClient.CreatePlaythroughAsync(1);

            SetUserId(2);

            AssertException.Throws<ApiException<ProblemDetails>>(() => 
            _apiClient.GetPlaythroughAsync(playThroughid), BaseController.PlaythroughNotFoundMsg);
            //await Assert.ThrowsExceptionAsync<ApiException<PlaythroughNotFoundProblem>>
            //    (() => _apiClient.GetPlaythroughAsync(playThroughid));
        }
    }
}
