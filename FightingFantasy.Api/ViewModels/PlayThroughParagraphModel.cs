using FightingFantasy.Domain;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api.ViewModels
{
    public class PlayThroughParagraphModel
    {
        [JsonConstructor]
        public PlayThroughParagraphModel() { }

        
        public PlayThroughParagraphModel(PlaythroughParagraph playThroughParagraph)
        {
            Id = playThroughParagraph.Id;
            Number = playThroughParagraph.ParagraphNumber;
            Items = playThroughParagraph.Items;
            Description = playThroughParagraph.Description;

            if (playThroughParagraph.ToParagraph != null)
                ToParagraph = new PlayThroughParagraphModel(playThroughParagraph.ToParagraph);

            Stats = playThroughParagraph.PlaythroughStats.Select(x => new PlaythroughStatModel(x)).ToList();

            XPos = playThroughParagraph.XPos;
            YPos = playThroughParagraph.YPos;
        }

        public long Id { get; set; }
        public long Number { get; set; }
        public string Items { get; set; }
        public string Description { get; set; }

        public long? ToParagraphId { get; set; }

        public PlayThroughParagraphModel ToParagraph { get; set; }

        public List<PlaythroughStatModel> Stats { get; set; }
        public double XPos { get; set; }
        public double YPos { get; set; }
    }
}
