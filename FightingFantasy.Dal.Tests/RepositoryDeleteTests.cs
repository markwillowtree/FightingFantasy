using FightingFantasy.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FightingFantasy.Dal.Integration.Tests
{
    [TestClass]
    public class RepositoryDeleteTests : BaseRepositoryTest
    {
        [TestMethod]
        public async Task TwoParagraphs_Delete_ShouldDeleteParagraphAndStats()
        {
            // get book 
            var book = await _bookRepository.GetSingleAsync(
                filter: x => x.Id == 1,
                include: book => book.Include(x => x.Stats));

            // create playthrough
            var playThrough = new Playthrough(book);
            _unitOfWork.BeginTransaction();
            await _playthroughRepository.Add(playThrough);
            _unitOfWork.Commit();

            // add second paragraph
            var paragraph = AddParagraph(playThrough, "second");


            // delete it
            _unitOfWork.BeginTransaction();
            _paragraphRepository.Delete(paragraph);
            _unitOfWork.Commit();

            // ensure it has been deleted
            Assert.IsNull(playThrough.StartParagraph.ToParagraph);
        }

        [TestMethod]
        public async Task ThreeParagraphs_DeleteOne_ShouldDeleteParagraphAndStats()
        {
            // get book 
            var book = await _bookRepository.GetSingleAsync(
                filter: x => x.Id == 1,
                include: book => book.Include(x => x.Stats));

            // create playthrough
            var playThrough = new Playthrough(book);
            _unitOfWork.BeginTransaction();
            await _playthroughRepository.Add(playThrough);
            _unitOfWork.Commit();

            // add two paragraphs
            var secondParagraph = AddParagraph(playThrough, "second");
            var thirdParagraph = AddParagraph(playThrough, "third");


            // delete it
            _unitOfWork.BeginTransaction();
            _paragraphRepository.Delete(thirdParagraph);
            _unitOfWork.Commit();

            // ensure it has been deleted
            Assert.IsNull(playThrough.StartParagraph.ToParagraph.ToParagraph);

            // ensure last paragraph is second one added
            Assert.AreEqual(playThrough.StartParagraph.ToParagraph.Description, secondParagraph.Description);
        }

        [TestMethod]
        public async Task ThreeParagraphs_DeleteTwo_ShouldDeleteParagraphs()
        {
            // get book 
            var book = await _bookRepository.GetSingleAsync(
                filter: x => x.Id == 1,
                include: book => book.Include(x => x.Stats));

            // create playthrough
            var playThrough = new Playthrough(book);
            _unitOfWork.BeginTransaction();
            await _playthroughRepository.Add(playThrough);
            _unitOfWork.Commit();

            // add two paragraphs
            var secondParagraph = AddParagraph(playThrough, "second");
            var thirdParagraph = AddParagraph(playThrough, "third");


            // delete third paragraph
            _unitOfWork.BeginTransaction();
            _paragraphRepository.Delete(thirdParagraph);
            _unitOfWork.Commit();

            // delete second paragraph
            _unitOfWork.BeginTransaction();
            _paragraphRepository.Delete(secondParagraph);
            _unitOfWork.Commit();

            // ensure both paragraphs have been deleted
            Assert.IsNull(playThrough.StartParagraph.ToParagraph);
        }


        [TestMethod]
        public async Task FourParagraphs_DeleteOne_ShouldDeleteLastParagraph()
        {
            // get book 
            var book = await _bookRepository.GetSingleAsync(
                filter: x => x.Id == 1,
                include: book => book.Include(x => x.Stats));

            // create playthrough
            var playThrough = new Playthrough(book);
            _unitOfWork.BeginTransaction();
            await _playthroughRepository.Add(playThrough);
            _unitOfWork.Commit();

            // add three paragraphs
            var secondParagraph = AddParagraph(playThrough, "second");
            var thirdParagraph = AddParagraph(playThrough, "third");
            var fourthParagraph = AddParagraph(playThrough, "fourth");

            // delete it
            _unitOfWork.BeginTransaction();
            _paragraphRepository.Delete(fourthParagraph);
            _unitOfWork.Commit();

            // ensure it has been deleted
            Assert.IsNull(playThrough.StartParagraph.ToParagraph.ToParagraph.ToParagraph);

            // ensure last paragraph is second one added
            Assert.AreEqual(playThrough.StartParagraph.ToParagraph.ToParagraph.Description, thirdParagraph.Description);
        }



        private PlaythroughParagraph AddParagraph(Playthrough playThrough, string paragraphDescription)
        {
            // add second paragraph
            var lastParagraph = GetLastParagraph(playThrough);
            var paragraph = new PlaythroughParagraph
            {
                Description = paragraphDescription,
                PlaythroughStats = lastParagraph.PlaythroughStats.Select(x => new PlaythroughStat
                {
                    Stat = x.Stat,
                    StatId = x.StatId,
                    Value = x.Value
                }).ToArray(),
            };
            lastParagraph.ToParagraph = paragraph;
            _unitOfWork.BeginTransaction();
            _playthroughRepository.Update(playThrough);
            _unitOfWork.Commit();

            return paragraph;
        }

        private PlaythroughParagraph GetLastParagraph(Playthrough playThrough)
        {
            var curr = playThrough.StartParagraph;
            while(curr.ToParagraph != null)
            {
                if (curr.ToParagraph != null)
                    curr = curr.ToParagraph;
            }

            return curr;
        }
    }
}
