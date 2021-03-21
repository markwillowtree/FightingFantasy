using FightingFantasy.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.Api.ViewModels
{
    public class BookModel
    {


        public BookModel(Book book)
        {
            Code = book.Code;
            Description = book.Description;
            Id = book.Id;
            Stats = book.Stats.Select(x => x.StatName).ToList();
            Title = book.Title;
        }

        public string Code { get; }
        public string Description { get; }
        public long Id { get; }
        public List<string> Stats { get; }
        public string Title { get; }
    }
}
