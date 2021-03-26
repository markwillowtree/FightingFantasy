using FightingFantasy.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FightingFantasy.Dal.DbContexts
{
    public class FightingFantasyDbContext : IdentityDbContext<IdentityUser<long>, IdentityRole<long>, long>
    {
        public DbSet<Book> Books { get; set; }
        public DbSet<PlaythroughParagraph> PlayThroughParagraphs {get;set;}
        public DbSet<Playthrough> PlayThroughs { get; set; }

        public DbSet<Stat> BookStats { get; set; }

        public FightingFantasyDbContext(){ }
        public FightingFantasyDbContext(DbContextOptions<FightingFantasyDbContext> options)
            : base(options)
        {
            this.Database.GetConnectionString();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            DefineTableRelationships(builder);

            SeedData(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected virtual void SeedData(ModelBuilder builder)
        {
            Stat skillStat           = new Stat 
            { 
                Id = 1, 
                StatName = "Skill",
                InitNumDice = 1,
                InitModifier = 6
            };
            Stat staminaStat         = new Stat 
            { 
                Id = 2, 
                StatName = "Stamina",
                InitNumDice = 2,
                InitModifier = 12
            };
            Stat luckStat            = new Stat 
            { 
                Id = 3, 
                StatName = "Luck",
                InitNumDice = 1,
                InitModifier = 6
            };

            Stat provisionsStat      = new Stat { Id = 4, StatName = "Provisions" };
            Stat magicStat           = new Stat 
            { 
                Id = 5, 
                StatName = "Magic",
                InitNumDice = 2,
                InitModifier = 6
            };

            Stat weaponsStrengthStat = new Stat 
            { 
                Id = 6, 
                StatName = "Weapons Strength",
                InitNumDice = 1,
                InitModifier = 6
            };

            Stat shieldsStat         = new Stat 
            { 
                Id = 7, 
                StatName = "Shields",
                InitNumDice = 1,
                InitModifier = 12
            };

            Stat goldStat            = new Stat { Id = 8, StatName = "Gold" };
            Stat fearStat            = new Stat 
            { 
                Id = 9, 
                StatName = "Fear",
                InitNumDice = 1,
                InitModifier = 6
            };
            Stat pepPillsStat        = new Stat 
            { 
                Id = 10, 
                StatName = "Pep Pills",
                InitNumDice = 0,
                InitModifier = 4
            };

            Stat armourStat = new Stat
            {
                Id = 11,
                StatName = "Armour",
                InitNumDice = 1,
                InitModifier = 6
            };

            builder.Entity<Stat>().HasData(
                skillStat,
                staminaStat,
                luckStat,
                provisionsStat,
                magicStat,
                weaponsStrengthStat,
                shieldsStat,
                goldStat,
                fearStat,
                pepPillsStat,
                armourStat
                );

            builder.Entity<Book>().HasData(
                new Book
                {
                    Id = 1,
                    Title = "Warlock of Firetop Mountain",
                    Code = "FF1",
                    Description =
                                 @"<p>Your quest is to find the Warlock's treasure, hidden deep within a dungeon populated with a multitude
                                 of terrifying monsters. You will need courage, determination and a fair amount of luck if you are to survive all the traps
                                 and battles, and reach your goal — the innermost chambers of the Warlock's domain.</p>"
                });

            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 1L, StatId = skillStat.Id },
                        new { BookId = 1L, StatId = staminaStat.Id },
                        new { BookId = 1L, StatId = luckStat.Id },
                        new { BookId = 1L, StatId = provisionsStat.Id }
                        );
                });


            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 2,
                Title = "Citadel of Chaos",
                Code = "FF2",
                Description =
                @"<p>Who knows what monstrous creatures lie in wait in the Citadel of Chaos?</p> 
                <p>The Citadel holds a dark and dangerous peril for anyone foolhardy enough to venture through its gruesome gates. 
                And yet venture you must, for your mission lies at the heart of the Citadel, with the dread sorceror, Balthus Dire!</p>",
            });

            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 2L, StatId = skillStat.Id },
                        new { BookId = 2L, StatId = staminaStat.Id },
                        new { BookId = 2L, StatId = luckStat.Id },
                        new { BookId = 2L, StatId = magicStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 3,
                Title = "Forest of Doom",
                Code = "FF3",
                Description =
                @"<p>Who knows what monstrous creatures lurk in Darkwood forest?</p>
                <p>Only the foolhardy would risk an encounter with the unknown perils that lurk in the murky depths of Darkwood Forest. 
                Yet there is no alternative, for your quest is a desperate race against time to find the missing pieces of the 
                legendary Hammer of Stonebridge — fashioned by Dwarfs to protect the villagers of Stonebridge against their ancient doom.</p>",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 3L, StatId = skillStat.Id },
                        new { BookId = 3L, StatId = staminaStat.Id },
                        new { BookId = 3L, StatId = luckStat.Id },
                        new { BookId = 3L, StatId = provisionsStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 4,
                Title = "Starship Traveller",
                Code = "FF4",
                Description =
                @"<p>The fate of the Starship Traveller and her crew lies in YOUR hands!</p>

                <p>Sucked through the nightmare of the Seltsian Void, the starship Traveller emerges at the other side of the black hole into an unknown universe. 
                YOU are the captain of the Traveller and her fate depends on YOU! Will you be able to discover the way back to Earth from the alien 
                peoples and planets you encounter, or will the starship be doomed to roam uncharted space forever?</p>",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 4L, StatId = skillStat.Id },
                        new { BookId = 4L, StatId = staminaStat.Id },
                        new { BookId = 4L, StatId = luckStat.Id },
                        new { BookId = 4L, StatId = provisionsStat.Id },
                        new { BookId = 4L, StatId = weaponsStrengthStat.Id },
                        new { BookId = 4L, StatId = shieldsStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 5,
                Title = "City of Thieves",
                Code = "FF5",
                Description =
                @"<p>Terror stalks the night in Silverton!</p>
                <p>The prosperous town of Silverton is being held to ransom by Zanbar Bone and his bloodthirsty Moon Dogs. 
                YOU are an adventurer, and the merchants of Silverton turn to you in their hour of need.</p>

                <p>Your mission takes you along dark, twisting streets where thieves, vagabonds and creatures of the night lie in wait to trap 
                the unwary traveller. And beyond lies the most fearsome adventure of them all — the tower stronghold of the infamous Zanbar Bone!</p>",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 5L, StatId = skillStat.Id },
                        new { BookId = 5L, StatId = staminaStat.Id },
                        new { BookId = 5L, StatId = luckStat.Id },
                        new { BookId = 5L, StatId = provisionsStat.Id },
                        new { BookId = 5L, StatId = goldStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 6,
                Title = "Deathtrap Dungeon",
                Code = "FF6",
                Description =
                @"<p>Down in the dark twisting labyrinth of Fang, unknown horrors await you!</p>
                <p>Countless adventurers before you have taken up the challenge of the Trial of Champions, but not one has survived.
                Devised by the devilish mind of Baron Sukumvit,the labyrinth is riddled with fiendish traps and hideous creatures of darkness 
                to trick and test you almost beyond the limits of endurance!",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 6L, StatId = skillStat.Id },
                        new { BookId = 6L, StatId = staminaStat.Id },
                        new { BookId = 6L, StatId = luckStat.Id },
                        new { BookId = 6L, StatId = provisionsStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 7,
                Title = "Island of the Lizard King",
                Code = "FF7",
                Description =
                @"<p>Can you save the young men of Oyster Bay from the evil Lizard Men?</p>
                <p>Kidnapped by a vicious race of Lizard Men from Fire Island, the young men of Oyster Bay face a grim future of slavery, starvation 
                and a lingering death. Their new master is the mad and dangerous Lizard King, who holds sway over his land of mutants by the eerie 
                powers of black magic and voodoo. YOU are the only one who can hope to rescue the suffering prisoners, but do you have the courage 
                to risk this dangerous mission?</p>",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 7L, StatId = skillStat.Id },
                        new { BookId = 7L, StatId = staminaStat.Id },
                        new { BookId = 7L, StatId = luckStat.Id },
                        new { BookId = 7L, StatId = provisionsStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 8,
                Title = "Scorpion Swamp",
                Code = "FF8",
                Description =
                @"<p>Nightmarish creatures lurk in the slimy depths of Scorpion Swamp!</p>

                <p>You're no fool. All your life you've heard tales of Scorpion Swamp and how it is criss-crossed with treacherous paths leading to the 
                haunts of its disgusting denizens. One step out of place spells a certain and lingering death. But now, the swamp holds out the lure of 
                treasure and glory - and you cannot resist the challenge!</p>",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 8L, StatId = skillStat.Id },
                        new { BookId = 8L, StatId = staminaStat.Id },
                        new { BookId = 8L, StatId = luckStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 9,
                Title = "Caverns of the Snow Witch",
                Code = "FF9",
                Description =
                @"<p>The dreaded Snow Witch of Allansia plans to dominate the world!</p>

                <p>Deep within the Crystal Caves of the Icefinger Mountains, the dreaded Snow Witch is plotting to bring on a new ice age. 
                A brave trapper dies in your arms and lays the burden of his mission on your shoulders. 
                But time is running out — will YOU take up the challenge?</p>",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 9L, StatId = skillStat.Id },
                        new { BookId = 9L, StatId = staminaStat.Id },
                        new { BookId = 9L, StatId = luckStat.Id },
                        new { BookId = 9L, StatId = provisionsStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 10,
                Title = "House of Hell",
                Code = "FF10",
                Description =
                @"<p>Taking refuge in the infamous House of Hell has to be the worst mistake of your life!</p>

                <p>The dangers of the torrential storm outside are nothing compared to the blood-curdling adventures that await you inside. 
                Who knows how many hapless wanderers like yourself have perished within its gruesome walls? Be warned! Tonight is going to be a 
                night to remember ...</p>",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 10L, StatId = skillStat.Id },
                        new { BookId = 10L, StatId = staminaStat.Id },
                        new { BookId = 10L, StatId = luckStat.Id },
                        new { BookId = 10L, StatId = provisionsStat.Id },
                        new { BookId = 10L, StatId = fearStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 11,
                Title = "Talisman of Death",
                Code = "FF11",
                Description =
                @"<p>The once-peaceful world of Orb is in terrible danger!</p>

                <p>Dark forces are at work to unleash the awesome might of the Evil One, but their plans cannot be completed without the legendary 
                Talisman of Death. YOU are the one who carries the Talisman, and only YOU can stop the Dark forces. YOUR mission is to destroy the 
                Talisman before the dark lord's minions reach you. But beware! Time is running out!</p>",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 11L, StatId = skillStat.Id },
                        new { BookId = 11L, StatId = staminaStat.Id },
                        new { BookId = 11L, StatId = luckStat.Id },
                        new { BookId = 11L, StatId = provisionsStat.Id }
                        );
                });

            builder.Entity<Book>().HasData(
            new Book
            {
                Id = 12,
                Title = "Space Assassin",
                Code = "FF12",
                Description =
                @"<p>A tyrannical despot is bent on destroying the world!</p>

                <p>Looming above your home planet is the vast hulk of the starship Vandervecken. Aboard, the crazed scientist Cyrus is planning to 
                unleash a gruesome experiment upon your world, which will destroy all life as it is known, leaving only hideous mutations in its wake. 
                YOU are an assassin, and your mission is to stop him - before it is too late!</p>",
            });
            builder.Entity<Book>()
                .HasMany(x => x.Stats)
                .WithMany(x => x.Books)
                .UsingEntity<Dictionary<string, object>>(
                "BookStat",
                r => r.HasOne<Stat>().WithMany().HasForeignKey("StatId"),
                l => l.HasOne<Book>().WithMany().HasForeignKey("BookId"),
                je =>
                {
                    je.HasKey("BookId", "StatId");
                    je.HasData(
                        new { BookId = 12L, StatId = skillStat.Id },
                        new { BookId = 12L, StatId = staminaStat.Id },
                        new { BookId = 12L, StatId = luckStat.Id },
                        new { BookId = 12L, StatId = pepPillsStat.Id },
                        new { BookId = 12L, StatId = armourStat.Id }
                        );
                });

        }

        private static void DefineTableRelationships(ModelBuilder builder)
        {
            builder.Entity<User>()
                .HasMany(x => x.PlayThroughs)
                .WithOne().HasForeignKey("UserId");

            builder.Entity<Playthrough>()
                .HasOne(x => x.Book);

            builder.Entity<Playthrough>()
                .HasOne(x => x.StartParagraph);

            builder.Entity<PlaythroughParagraph>()
                .HasOne(x => x.ToParagraph)
                .WithOne()
                .HasForeignKey(typeof(PlaythroughParagraph), "ToParagraphId")
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<PlaythroughParagraph>()
                .HasMany(x => x.PlaythroughStats).WithOne().OnDelete(DeleteBehavior.Cascade);

            builder.Entity<PlaythroughStat>()
                .HasOne(x => x.Stat)
                .WithMany()
                .HasForeignKey(x => x.StatId);
        }
    }
}
