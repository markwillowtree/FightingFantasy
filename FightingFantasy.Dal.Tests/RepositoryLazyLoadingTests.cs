using FightingFantasy.Dal.DbContexts;
using FightingFantasy.Dal.Repositories;
using FightingFantasy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FightingFantasy.Dal.Integration.Tests
{
    [TestClass]
    public class RepositoryLazyLoadingTests : BaseRepositoryTest
    {
        [TestMethod]
        public async Task CreatePlaythrough_MustHaveCorrectProperties()
        {
            // get book 
            var book = await _bookRepository.GetSingleAsync(
                filter: x => x.Id == 1,
                include: book => book.Include(x => x.Stats));

            // create playthrough
            var playThrough = new Playthrough(book);

            // add playthrough
            _unitOfWork.BeginTransaction();
            await _playthroughRepository.Add(playThrough);
            _unitOfWork.Commit();

            // get playthrough
            var dbPlaythrough = await _playthroughRepository.GetSingleAsync(
                filter: plthru => plthru.Id == playThrough.Id);

            Assert.IsNotNull(dbPlaythrough);
            Assert.IsNotNull(dbPlaythrough.Book);
            Assert.IsNotNull(dbPlaythrough.StartParagraph);

            Assert.AreEqual(dbPlaythrough.StartParagraph.ParagraphNumber, 1);
            Assert.IsNull(dbPlaythrough.StartParagraph.ToParagraph);
            Assert.IsNotNull(dbPlaythrough.StartParagraph.PlaythroughStats);
            Assert.IsTrue(dbPlaythrough.StartParagraph.PlaythroughStats.Count > 0);
        }

        [TestMethod]
        public async Task GetPlaythrough_MustHaveAllLevelsOfParagraphs()
        {
            // get book 
            var book = await _bookRepository.GetSingleAsync(
                filter: x => x.Id == 1,
                include: book => book.Include(x => x.Stats));

            // create playthrough with 4 levels of recursive paragraphs
            var playThrough = new Playthrough(book);
            var currParagraph = playThrough.StartParagraph;

            for (int i = 0; i < 3; i++)
            {
                var newParagraph = new PlaythroughParagraph
                {
                    Description = "2nd paragraph"
                };


                foreach (var stat in currParagraph.PlaythroughStats)
                {
                    newParagraph.PlaythroughStats.Add(new PlaythroughStat
                    {
                        Stat = stat.Stat,
                        Value = stat.Value
                    });
                }

                currParagraph.ToParagraph = newParagraph;
                currParagraph = newParagraph;
            }

            _unitOfWork.BeginTransaction();
            await _playthroughRepository.Add(playThrough);
            _unitOfWork.Commit();

            var dbPlayThrough = await _playthroughRepository.GetSingleAsync(
                filter: plthru => plthru.Id == playThrough.Id);

            Assert.IsNotNull(dbPlayThrough.StartParagraph);
            Assert.IsNotNull(dbPlayThrough.StartParagraph.ToParagraph);
            Assert.IsNotNull(dbPlayThrough.StartParagraph.ToParagraph.ToParagraph);
            Assert.IsNotNull(dbPlayThrough.StartParagraph.ToParagraph.ToParagraph.ToParagraph);
        }
    }
}
