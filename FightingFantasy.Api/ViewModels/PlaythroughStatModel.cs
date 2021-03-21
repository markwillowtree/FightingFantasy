using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using FightingFantasy.Domain;

namespace FightingFantasy.Api.ViewModels
{
    public class PlaythroughStatModel
    {
        public string Name { get; set; }
        public int Value { get; set; }
        public long StatId { get; set; }

        [JsonConstructor]
        public PlaythroughStatModel() { }

        public PlaythroughStatModel(PlaythroughStat stat)
        {
            Name = stat.Stat.StatName;
            Value = stat.Value;
            StatId = stat.StatId;
        }
    }
}
