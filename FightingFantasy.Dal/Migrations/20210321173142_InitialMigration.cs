using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FightingFantasy.Dal.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Code = table.Column<string>(type: "TEXT", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BookStats",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StatName = table.Column<string>(type: "TEXT", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookStats", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PlayThroughParagraphs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ParagraphNumber = table.Column<long>(type: "INTEGER", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    ToParagraphId = table.Column<long>(type: "INTEGER", nullable: true),
                    Items = table.Column<string>(type: "TEXT", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayThroughParagraphs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlayThroughParagraphs_PlayThroughParagraphs_ToParagraphId",
                        column: x => x.ToParagraphId,
                        principalTable: "PlayThroughParagraphs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoleId = table.Column<long>(type: "INTEGER", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<long>(type: "INTEGER", nullable: false),
                    ClaimType = table.Column<string>(type: "TEXT", nullable: true),
                    ClaimValue = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderKey = table.Column<string>(type: "TEXT", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "TEXT", nullable: true),
                    UserId = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "INTEGER", nullable: false),
                    RoleId = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "INTEGER", nullable: false),
                    LoginProvider = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BookStat",
                columns: table => new
                {
                    BookId = table.Column<long>(type: "INTEGER", nullable: false),
                    StatId = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookStat", x => new { x.BookId, x.StatId });
                    table.ForeignKey(
                        name: "FK_BookStat_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BookStat_BookStats_StatId",
                        column: x => x.StatId,
                        principalTable: "BookStats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayThroughs",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BookId = table.Column<long>(type: "INTEGER", nullable: true),
                    StartParagraphId = table.Column<long>(type: "INTEGER", nullable: true),
                    UserId = table.Column<long>(type: "INTEGER", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayThroughs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlayThroughs_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PlayThroughs_Books_BookId",
                        column: x => x.BookId,
                        principalTable: "Books",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PlayThroughs_PlayThroughParagraphs_StartParagraphId",
                        column: x => x.StartParagraphId,
                        principalTable: "PlayThroughParagraphs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PlaythroughStat",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StatId = table.Column<long>(type: "INTEGER", nullable: false),
                    Value = table.Column<int>(type: "INTEGER", nullable: false),
                    PlaythroughParagraphId = table.Column<long>(type: "INTEGER", nullable: true),
                    DateCreated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ModifiedDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaythroughStat", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaythroughStat_BookStats_StatId",
                        column: x => x.StatId,
                        principalTable: "BookStats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlaythroughStat_PlayThroughParagraphs_PlaythroughParagraphId",
                        column: x => x.PlaythroughParagraphId,
                        principalTable: "PlayThroughParagraphs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 10L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Pep Pills" });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 8L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Gold" });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 7L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Shields" });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 6L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Weapons Strength" });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 5L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Magic" });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 4L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Provisions" });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 3L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Luck" });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 2L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Stamina" });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 1L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Skill" });

            migrationBuilder.InsertData(
                table: "BookStats",
                columns: new[] { "Id", "DateCreated", "ModifiedDate", "StatName" },
                values: new object[] { 9L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Fear" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 12L, "FF12", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>A tyrannical despot is bent on destroying the world!</p>\r\n\r\n                <p>Looming above your home planet is the vast hulk of the starship Vandervecken. Aboard, the crazed scientist Cyrus is planning to \r\n                unleash a gruesome experiment upon your world, which will destroy all life as it is known, leaving only hideous mutations in its wake. \r\n                YOU are an assassin, and your mission is to stop him - before it is too late!</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Space Assassin" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 11L, "FF11", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>The once-peaceful world of Orb is in terrible danger!</p>\r\n\r\n                <p>Dark forces are at work to unleash the awesome might of the Evil One, but their plans cannot be completed without the legendary \r\n                Talisman of Death. YOU are the one who carries the Talisman, and only YOU can stop the Dark forces. YOUR mission is to destroy the \r\n                Talisman before the dark lord's minions reach you. But beware! Time is running out!</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Talisman of Death" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 9L, "FF9", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>The dreaded Snow Witch of Allansia plans to dominate the world!</p>\r\n\r\n                <p>Deep within the Crystal Caves of the Icefinger Mountains, the dreaded Snow Witch is plotting to bring on a new ice age. \r\n                A brave trapper dies in your arms and lays the burden of his mission on your shoulders. \r\n                But time is running out — will YOU take up the challenge?</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Caverns of the Snow Witch" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 8L, "FF8", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>Nightmarish creatures lurk in the slimy depths of Scorpion Swamp!</p>\r\n\r\n                <p>You're no fool. All your life you've heard tales of Scorpion Swamp and how it is criss-crossed with treacherous paths leading to the \r\n                haunts of its disgusting denizens. One step out of place spells a certain and lingering death. But now, the swamp holds out the lure of \r\n                treasure and glory - and you cannot resist the challenge!</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Scorpion Swamp" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 7L, "FF7", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>Can you save the young men of Oyster Bay from the evil Lizard Men?</p>\r\n                <p>Kidnapped by a vicious race of Lizard Men from Fire Island, the young men of Oyster Bay face a grim future of slavery, starvation \r\n                and a lingering death. Their new master is the mad and dangerous Lizard King, who holds sway over his land of mutants by the eerie \r\n                powers of black magic and voodoo. YOU are the only one who can hope to rescue the suffering prisoners, but do you have the courage \r\n                to risk this dangerous mission?</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Island of the Lizard King" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 6L, "FF6", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>Down in the dark twisting labyrinth of Fang, unknown horrors await you!</p>\r\n                <p>Countless adventurers before you have taken up the challenge of the Trial of Champions, but not one has survived.\r\n                Devised by the devilish mind of Baron Sukumvit,the labyrinth is riddled with fiendish traps and hideous creatures of darkness \r\n                to trick and test you almost beyond the limits of endurance!", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Deathtrap Dungeon" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 5L, "FF5", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>Terror stalks the night in Silverton!</p>\r\n                <p>The prosperous town of Silverton is being held to ransom by Zanbar Bone and his bloodthirsty Moon Dogs. \r\n                YOU are an adventurer, and the merchants of Silverton turn to you in their hour of need.</p>\r\n\r\n                <p>Your mission takes you along dark, twisting streets where thieves, vagabonds and creatures of the night lie in wait to trap \r\n                the unwary traveller. And beyond lies the most fearsome adventure of them all — the tower stronghold of the infamous Zanbar Bone!</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "City of Thieves" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 4L, "FF4", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>The fate of the Starship Traveller and her crew lies in YOUR hands!</p>\r\n\r\n                <p>Sucked through the nightmare of the Seltsian Void, the starship Traveller emerges at the other side of the black hole into an unknown universe. \r\n                YOU are the captain of the Traveller and her fate depends on YOU! Will you be able to discover the way back to Earth from the alien \r\n                peoples and planets you encounter, or will the starship be doomed to roam uncharted space forever?</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Starship Traveller" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 3L, "FF3", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>Who knows what monstrous creatures lurk in Darkwood forest?</p>\r\n                <p>Only the foolhardy would risk an encounter with the unknown perils that lurk in the murky depths of Darkwood Forest. \r\n                Yet there is no alternative, for your quest is a desperate race against time to find the missing pieces of the \r\n                legendary Hammer of Stonebridge — fashioned by Dwarfs to protect the villagers of Stonebridge against their ancient doom.</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Forest of Doom" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 2L, "FF2", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>Who knows what monstrous creatures lie in wait in the Citadel of Chaos?</p> \r\n                <p>The Citadel holds a dark and dangerous peril for anyone foolhardy enough to venture through its gruesome gates. \r\n                And yet venture you must, for your mission lies at the heart of the Citadel, with the dread sorceror, Balthus Dire!</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Citadel of Chaos" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 10L, "FF10", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>Taking refuge in the infamous House of Hell has to be the worst mistake of your life!</p>\r\n\r\n                <p>The dangers of the torrential storm outside are nothing compared to the blood-curdling adventures that await you inside. \r\n                Who knows how many hapless wanderers like yourself have perished within its gruesome walls? Be warned! Tonight is going to be a \r\n                night to remember ...</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "House of Hell" });

            migrationBuilder.InsertData(
                table: "Books",
                columns: new[] { "Id", "Code", "DateCreated", "Description", "ModifiedDate", "Title" },
                values: new object[] { 1L, "FF1", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "<p>Your quest is to find the Warlock's treasure, hidden deep within a dungeon populated with a multitude\r\n                                 of terrifying monsters. You will need courage, determination and a fair amount of luck if you are to survive all the traps\r\n                                 and battles, and reach your goal — the innermost chambers of the Warlock's domain.</p>", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Warlock of Firetop Mountain" });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 1L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 4L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 5L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 6L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 7L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 8L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 9L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 10L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 11L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 12L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 1L, 4L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 3L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 3L, 4L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 5L, 4L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 6L, 4L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 7L, 4L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 9L, 4L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 10L, 4L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 11L, 4L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 2L, 5L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 4L, 6L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 4L, 7L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 5L, 8L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 4L, 4L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 10L, 9L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 2L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 12L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 2L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 3L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 4L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 5L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 6L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 7L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 8L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 9L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 10L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 11L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 1L, 3L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 12L, 1L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 2L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 3L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 4L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 5L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 6L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 7L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 8L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 9L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 10L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 11L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 1L, 2L });

            migrationBuilder.InsertData(
                table: "BookStat",
                columns: new[] { "BookId", "StatId" },
                values: new object[] { 12L, 10L });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookStat_StatId",
                table: "BookStat",
                column: "StatId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayThroughParagraphs_ToParagraphId",
                table: "PlayThroughParagraphs",
                column: "ToParagraphId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlayThroughs_BookId",
                table: "PlayThroughs",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayThroughs_StartParagraphId",
                table: "PlayThroughs",
                column: "StartParagraphId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayThroughs_UserId",
                table: "PlayThroughs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaythroughStat_PlaythroughParagraphId",
                table: "PlaythroughStat",
                column: "PlaythroughParagraphId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaythroughStat_StatId",
                table: "PlaythroughStat",
                column: "StatId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "BookStat");

            migrationBuilder.DropTable(
                name: "PlayThroughs");

            migrationBuilder.DropTable(
                name: "PlaythroughStat");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Books");

            migrationBuilder.DropTable(
                name: "BookStats");

            migrationBuilder.DropTable(
                name: "PlayThroughParagraphs");
        }
    }
}
