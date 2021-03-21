using System;
using System.Collections.Generic;
using System.Text;

namespace FightingFantasy.Domain
{
    public interface IBaseEntity
    {
        public long Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ModifiedDate { get; set; }
    }

    public abstract class BaseEntity : IBaseEntity
    {
        public long Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
