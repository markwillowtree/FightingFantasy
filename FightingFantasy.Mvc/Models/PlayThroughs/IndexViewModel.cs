using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FightingFantasy.Mvc.ApiClients;
using Newtonsoft.Json;

namespace FightingFantasy.Mvc.Models.PlayThroughs
{
    public class IndexViewModel : BaseViewModel
    {
        public string PlayThroughJson { get; set; }
        public PlayThroughModel Playthrough { get; set; }
        public PlayThroughParagraphModel SelectedParagraph { get; set; }

        public IndexViewModel(PlayThroughModel playThrough)
        {
            //PlayThroughJson = JsonConvert.SerializeObject(playThrough);
            Playthrough = playThrough;

            PlayThroughParagraphModel currentParagraph = Playthrough.StartParagraph;
            SelectedParagraph = currentParagraph;
            while (currentParagraph.ToParagraph != null)
            {
                currentParagraph = currentParagraph.ToParagraph;
            }
        }
    }
}
