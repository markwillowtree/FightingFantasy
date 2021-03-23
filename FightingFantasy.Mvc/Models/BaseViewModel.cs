using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Models
{
    public abstract class BaseViewModel
    {
        public string SuccessMsg { get; set; }
        public string ErrorMsg { get; set; }
    }
}
