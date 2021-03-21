using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FightingFantasy.Domain
{
    public class Playthrough : BaseEntity
    {
        public virtual Book Book { get; set; }
        public virtual PlaythroughParagraph StartParagraph { get; set; }
        public long Id { get; set; }

        public Playthrough()
        {

        }

        public Playthrough(Book book)
        {
            Book = book;
            StartParagraph = new PlaythroughParagraph
            {
                ParagraphNumber = 1,
                Description = "Start"
            };

            foreach (var stat in book.Stats)
            {
                StartParagraph.PlaythroughStats.Add(new PlaythroughStat
                {
                    Stat = stat,
                    Value = 0,
                });
            } 
        }

        public IEnumerable<PlaythroughParagraph> GetParagraphs()
        {
            var stack = new Stack<PlaythroughParagraph>(new PlaythroughParagraph[] { this.StartParagraph });

            while (stack.Any())
            {
                var next = stack.Pop();
                if (next != null)
                {
                    yield return next;
                    stack.Push(next.ToParagraph);
                }
            }         
        }
    }
}
