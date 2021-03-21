using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FightingFantasy.Domain
{
    public class User : IdentityUser<long>, IBaseEntity
    {
        public virtual ICollection<Playthrough> PlayThroughs { get; set; } = new List<Playthrough>();
        
        public DateTime DateCreated { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
