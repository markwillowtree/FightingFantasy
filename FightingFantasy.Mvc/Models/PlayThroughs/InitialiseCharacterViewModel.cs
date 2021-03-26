using FightingFantasy.Mvc.ApiClients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Models.PlayThroughs
{
    public class InitialiseCharacterViewModel : BaseViewModel
    {
        public List<PlaythroughStatModel> Stats { get; set; }
        public string BookImageUrl { get; set; }
        public long PlaythroughId { get; set; }
    }
}
