using FightingFantasy.Dal.DbContexts;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.DependencyInjection;
using FightingFantasy.Domain;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace FightingFantasy.Dal.Tests
{
    [TestClass]
    public class DbContextTests
    {
        FightingFantasyDbContext _context;
        [TestInitialize]
        public void Init()
        {
            var serviceProvider = new ServiceCollection()
            .AddEntityFrameworkSqlite()
            .BuildServiceProvider();

            var builder = new DbContextOptionsBuilder<FightingFantasyDbContext>();

            builder.UseSqlite($"Data Source={Guid.NewGuid()}.db")
                    .UseInternalServiceProvider(serviceProvider);

            _context = new FightingFantasyDbContext(builder.Options);
            _context.Database.Migrate();
        }

        [TestMethod]
        public async Task BookCreated_MustHaveCorrectStats()
        {
            var stats = new List<Stat>
            {
                new Stat { Id = 111, StatName = "TestStat1" }
            };

            var book = new Book
            {
                Id = 111,
                Title = "Test book 1",
                Code = "FF111",
                Description = @"<p>A test book</p>",
                Stats = stats
            };

            _context.Set<Book>().Add(book);
            _context.SaveChanges();

            // check stat was created
            var dbStat = await _context.Set<Stat>().SingleOrDefaultAsync(x => x.Id == 111);

            Assert.IsNotNull(dbStat);
            Assert.AreEqual(111, dbStat.Id);
        }

        [TestMethod]
        public async Task PlaythroughCreated_MustHaveCorrectProperties()
        {
            var stats = new List<Stat>
            {
                new Stat { Id = 111, StatName = "TestStat1" }
            };

            var book = new Book
            {
                Id = 111,
                Title = "Test book 1",
                Code = "FF111",
                Description = @"<p>A test book</p>",
                Stats = stats
            };

            _context.Set<Book>().Add(book);
            _context.SaveChanges();

            var playthrough = new Playthrough(book);
            _context.Set<Playthrough>().Add(playthrough);
            _context.SaveChanges();

            // check playthrough was created correctly
            var dbPlaythrough = await _context.Set<Playthrough>().SingleOrDefaultAsync(x => x.Id == playthrough.Id);

            // check playthru properties
            Assert.IsNotNull(dbPlaythrough);
            Assert.IsNotNull(dbPlaythrough.Book);
            Assert.IsNotNull(dbPlaythrough.StartParagraph);

            // check start paragraph properties
            Assert.IsNull(dbPlaythrough.StartParagraph.ToParagraph);
            Assert.AreEqual(dbPlaythrough.StartParagraph.ParagraphNumber, 1);
            Assert.IsNotNull(dbPlaythrough.StartParagraph.PlaythroughStats);

            // check playthrough stats properties
            Assert.AreEqual(dbPlaythrough.StartParagraph.PlaythroughStats.Count, 1);
            Assert.IsNotNull(dbPlaythrough.StartParagraph.PlaythroughStats.First().Stat);
            Assert.AreEqual(dbPlaythrough.StartParagraph.PlaythroughStats.First().Value, 0);

        }
    }
}
