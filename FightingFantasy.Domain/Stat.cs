using System;
using System.Collections.Generic;
using System.Text;

namespace FightingFantasy.Domain
{

    public class Stat : BaseEntity
    {
        public virtual ICollection<Book> Books { get; set; } = new List<Book>();
        public string StatName { get; set; }
        public int InitNumDice { get; set; }
        public int InitModifier { get; set; }
    }
}
