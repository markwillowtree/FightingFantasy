using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Models.Home
{
    public class IndexViewModel
    {
        public List<BookViewModel> Books { get; set; } = new List<BookViewModel>();
    }
}
