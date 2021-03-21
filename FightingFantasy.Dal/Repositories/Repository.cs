using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FightingFantasy.Domain;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.Query;

namespace FightingFantasy.Dal.Repositories
{
    public interface IRepository<TEntity> where TEntity : class, IBaseEntity
    {
        Task Add(TEntity entity);
        void Delete(TEntity entity);
        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter = null, 
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int? skip = null, 
            int? take = null);

        Task<TEntity> GetSingleAsync(Expression<Func<TEntity, bool>> filter = null, 
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null);

        void Update(TEntity entity);
    }

    public class Repository<TContext, TEntity> : IRepository<TEntity> where TContext : DbContext where TEntity : class, IBaseEntity
    {
        readonly TContext _context;

        public Repository(TContext context)
        {
            _context = context;
        }

        private IQueryable<TEntity> GetQueryable(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int? skip = null,
            int? take = null)
        {
            // filter
            IQueryable<TEntity> query = _context.Set<TEntity>();

            // include
            if (include != null)
            {
                query = include(query);
            }

            if (filter != null)
            {
                query = query.Where(filter);
            }

            

            // order
            if (orderBy != null)
            {
                query = orderBy(query);
            }

            // paginate
            if (skip.HasValue)
            {
                query = query.Skip(skip.Value);
            }
            if (take.HasValue)
            {
                query = query.Take(take.Value);
            }

            return query;
        }

        public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            int? skip = null,
            int? take = null)
        {
            return await GetQueryable(filter, orderBy, include, skip, take).ToListAsync();
        }

        public async Task<TEntity> GetSingleAsync(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null)
        {
            return await GetQueryable(filter, orderBy, include).SingleOrDefaultAsync();
        }

        public async Task Add(TEntity entity)
        {
            entity.DateCreated = DateTime.UtcNow;
            await _context.Set<TEntity>().AddAsync(entity);
        }

        public void Update(TEntity entity)
        {
            entity.ModifiedDate = DateTime.UtcNow;
            _context.Set<TEntity>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(TEntity entity)
        {
            var dbSet = _context.Set<TEntity>();
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                dbSet.Attach(entity);
            }

            dbSet.Remove(entity);
        }
    }
}
