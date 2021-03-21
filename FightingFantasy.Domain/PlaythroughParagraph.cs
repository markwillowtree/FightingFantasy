using System;
using System.Collections.Generic;
using System.Text;

namespace FightingFantasy.Domain
{
    public class PlaythroughParagraph : BaseEntity
    {
        public long ParagraphNumber { get; set; }
        public string Description { get; set; }

        public virtual ICollection<PlaythroughStat> PlaythroughStats { get; set; } = new List<PlaythroughStat>();

        public long? ToParagraphId { get; set; }
        public virtual PlaythroughParagraph ToParagraph { get; set; }

        public string Items { get; set; } = string.Empty;
    }
}
