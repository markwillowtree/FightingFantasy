using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FightingFantasy.Mvc.ApiClients;
using FightingFantasy.Api.Controllers;
using FightingFantasy.Api.Integration.Tests.Helpers;
using Microsoft.Extensions.Configuration;

namespace FightingFantasy.Api.Integration.Tests.EndpointTests
{
    [TestClass]
    public class ParagraphApiTests : BaseTest
    {
        #region UpdateParagraph Tests
        [TestMethod]
        public async Task UpdateParagraph_ShouldUpdateParagraph()
        {
            SetUserId(1);

            long playThroughid = await _apiClient.CreatePlaythroughAsync(1);
            var playThrough = await _apiClient.GetPlaythroughAsync(playThroughid);
            var paragraph = playThrough.StartParagraph;

            string newDescription = "new description";
            string newItems = "new items";
            long newNumber = 999;

            var oldStats = paragraph.Stats.ToArray();
            var newStats = new PlaythroughStatModel[paragraph.Stats.Count];

            for (int i = 0; i < oldStats.Length; i++)
            {
                newStats[i] = new PlaythroughStatModel
                {
                    Name = oldStats[i].Name,
                    StatId = oldStats[i].StatId,
                    Value = 999
                };
            }

            await _apiClient.UpdateParagraphAsync(playThroughid, new PlayThroughParagraphModel
            {
                Description = newDescription,
                Id = paragraph.Id,
                Items = newItems,
                Stats = newStats,
                Number = newNumber
            });

            var updatedPlaythrough = await _apiClient.GetPlaythroughAsync(playThroughid);
            var updatedParagraph = updatedPlaythrough.StartParagraph;

            Assert.AreEqual(newDescription, updatedParagraph.Description);
            Assert.AreEqual(newItems, updatedParagraph.Items);
            Assert.AreEqual(newNumber, updatedParagraph.Number);

            var updatedStats = updatedParagraph.Stats.ToArray();
            for (int i = 0; i < updatedStats.Length; i++)
            {
                Assert.AreEqual(updatedStats[i].Value, 999);
            }
        }

        [TestMethod]
        public async Task UpdateParagraphOnNonExistentPlaythrough_ShouldReturnPlaythroughNotFound()
        {
            SetUserId(1);

            long playThroughid = await _apiClient.CreatePlaythroughAsync(1);
            var playThrough = await _apiClient.GetPlaythroughAsync(playThroughid);
            var paragraph = playThrough.StartParagraph;

            AssertException.Throws<ApiException<ProblemDetails>>(() =>
             _apiClient.UpdateParagraphAsync(long.MaxValue, paragraph), BaseController.PlaythroughNotFoundMsg);
        }

        [TestMethod]
        public async Task UpdateParagraphThatsNotInPlaythrough_ShouldReturnParagraphNotFound()
        {
            SetUserId(1);

            long playthroughid = await _apiClient.CreatePlaythroughAsync(1);
            var playthrough = await _apiClient.GetPlaythroughAsync(playthroughid);
            var paragraph = playthrough.StartParagraph;

            AssertException.Throws<ApiException<ProblemDetails>>(() =>
             _apiClient.UpdateParagraphAsync(playthroughid, new PlayThroughParagraphModel
             {
                 Id = long.MaxValue,
                 Description = paragraph.Description,
                 Items = paragraph.Items,
                 Number = paragraph.Number,
                 Stats = paragraph.Stats,
                 ToParagraph = paragraph.ToParagraph,
                 ToParagraphId = paragraph.ToParagraphId
             }), BaseController.ParagraphNotFoundMsg);
        }

        [TestMethod]
        public async Task UpdateParagraphWithInvalidStats_ShouldReturnInvalidStat()
        {
            SetUserId(1);

            long playthroughid = await _apiClient.CreatePlaythroughAsync(1);
            var playthrough = await _apiClient.GetPlaythroughAsync(playthroughid);
            var paragraph = playthrough.StartParagraph;

            paragraph.Stats.Add(new PlaythroughStatModel
            {
                Name = "New stat",
                StatId = long.MaxValue,
                Value = int.MaxValue
            });

            AssertException.Throws<ApiException<ProblemDetails>>(() =>
            _apiClient.UpdateParagraphAsync(playthroughid, paragraph), BaseController.InvalidStat);
        }
        #endregion

        #region AppendParagraph Tests
        [TestMethod]
        public async Task AppendParagraph_ShouldCreateAndAppendParagraph()
        {
            SetUserId(1);

            long playThroughid = await _apiClient.CreatePlaythroughAsync(1);
            var playThrough = await _apiClient.GetPlaythroughAsync(playThroughid);

            string description = "second paragraph";
            string items = "sword";
            long number = 2;

            await _apiClient.AppendParagraphAsync(playThroughid, new PlayThroughParagraphModel
            {
                Description = description,
                Items = items,
                Stats = playThrough.StartParagraph.Stats.ToList(),
                Number = number
            });

            playThrough = await _apiClient.GetPlaythroughAsync(playThroughid);

            Assert.IsNotNull(playThrough.StartParagraph.ToParagraph);

            var paragraph = playThrough.StartParagraph.ToParagraph;

            Assert.AreEqual(paragraph.Number, number);
            Assert.AreEqual(paragraph.Description, description);
            Assert.AreEqual(paragraph.Items, items);
        }

        [TestMethod]
        public async Task AppendThenDeleteParagraph_ShouldLeavePlaythroughUnchanged()
        {
            SetUserId(1);

            long playThroughid = await _apiClient.CreatePlaythroughAsync(1);
            var playThrough = await _apiClient.GetPlaythroughAsync(playThroughid);

            string description = "second paragraph";
            string items = "sword";
            long number = 2;

            await _apiClient.AppendParagraphAsync(playThroughid, new PlayThroughParagraphModel
            {
                Description = description,
                Items = items,
                Stats = playThrough.StartParagraph.Stats.ToArray(),
                Number = number
            });

            await _apiClient.DeleteLastParagraphAsync(playThroughid);

            var postPlaythrough = await _apiClient.GetPlaythroughAsync(playThroughid);

            AssertPlaythroughsAreEqual(playThrough, postPlaythrough);
        }

        [TestMethod]
        public async Task AppendThenDelete2Paragraphs_ShouldLeavePlaythroughUnchanged()
        {
            SetUserId(1);

            // create playthrough
            long playThroughid = await _apiClient.CreatePlaythroughAsync(1);
            var playThrough = await _apiClient.GetPlaythroughAsync(playThroughid);

            var addedParagraphIds = new List<long>();
            for (int i = 0; i < 2; i++)
            {
                long newParagraphId = await _apiClient.AppendParagraphAsync(playThroughid, new PlayThroughParagraphModel
                {
                    Description = i.ToString(),
                    Items = i.ToString(),
                    Stats = playThrough.StartParagraph.Stats.ToArray(),
                    Number = i
                });

                addedParagraphIds.Add(newParagraphId);
            }

            addedParagraphIds.Reverse();
            foreach (var id in addedParagraphIds)
            {
                await _apiClient.DeleteLastParagraphAsync(playThroughid);
            }

            var postPlaythrough = await _apiClient.GetPlaythroughAsync(playThroughid);

            AssertPlaythroughsAreEqual(playThrough, postPlaythrough);
        }
        #endregion

        [TestMethod]
        public async Task DeleteStartParagraph_ShouldReturnCantDeleteFirstParagraph()
        {
            SetUserId(1);

            var playthroughId = await _apiClient.CreatePlaythroughAsync(1);

            AssertException.Throws<ApiException<ProblemDetails>>(() =>
             _apiClient.DeleteLastParagraphAsync(playthroughId), BaseController.CantDeleteFirstParagraphMsg);
        }
    
    }
}
