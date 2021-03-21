using FightingFantasy.Dal.DbContexts;
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
    public abstract class BaseDbContextTest
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
    }
}
