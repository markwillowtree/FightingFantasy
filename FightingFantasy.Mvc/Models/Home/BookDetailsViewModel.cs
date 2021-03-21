using FightingFantasy.Mvc.ApiClients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Models.Home
{
    public class BookDetailsViewModel
    {
        public BookViewModel Book { get; set; }
        public List<PlayThroughModel> Playthroughs { get; set; }
    }
}
