using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.Models.Home
{
    public class ChangePasswordViewModel : BaseViewModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
