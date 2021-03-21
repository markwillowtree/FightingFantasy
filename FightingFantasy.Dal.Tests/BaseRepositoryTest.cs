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
    public abstract class BaseRepositoryTest
    {
        protected FightingFantasyDbContext _context;
        protected Repository<FightingFantasyDbContext, Playthrough> _playthroughRepository;
        protected Repository<FightingFantasyDbContext, Book> _bookRepository;
        protected Repository<FightingFantasyDbContext, PlaythroughParagraph> _paragraphRepository;

        protected UnitOfWork _unitOfWork;

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

            _playthroughRepository = new Repository<FightingFantasyDbContext, Playthrough>(_context);
            _bookRepository = new Repository<FightingFantasyDbContext, Book>(_context);
            _paragraphRepository = new Repository<FightingFantasyDbContext, PlaythroughParagraph>(_context);
            _unitOfWork = new UnitOfWork(_context);
        }

    }
}
