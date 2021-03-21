using System;
using System.Collections.Generic;
using System.Text;

namespace FightingFantasy.Domain
{
    public class PlaythroughStat : BaseEntity
    {
        public virtual Stat Stat { get; set; }
        public long StatId { get; set; }
        public int Value { get; set; }
    }
}
