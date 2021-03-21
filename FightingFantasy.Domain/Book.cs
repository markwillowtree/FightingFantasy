using System;
using System.Collections.Generic;
using System.Text;

namespace FightingFantasy.Domain
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code { get; set; }
        public virtual ICollection<Stat> Stats { get; set; } = new List<Stat>();
    }
}
