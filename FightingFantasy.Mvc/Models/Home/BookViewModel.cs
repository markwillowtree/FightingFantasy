using FightingFantasy.Mvc.ApiClients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Models.Home
{
    public class BookViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public long Id { get; set; }

        public string BookCode { get; set; }
        public string ImageUrl { get; internal set; }
    }
}
