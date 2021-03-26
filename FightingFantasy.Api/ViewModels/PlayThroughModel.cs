using FightingFantasy.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api.ViewModels
{
    public class PlayThroughModel
    {
        public PlayThroughModel(Playthrough playThrough)
        {
            Id = playThrough.Id;
            StartParagraph = new PlayThroughParagraphModel(playThrough.StartParagraph);
            Created = playThrough.DateCreated;
            Book = new BookModel(playThrough.Book);                
        }

        public long Id { get; set; }
        public PlayThroughParagraphModel StartParagraph { get; set; }
        public BookModel Book { get; set; }
        public DateTime Created { get; set; }
    }
}
