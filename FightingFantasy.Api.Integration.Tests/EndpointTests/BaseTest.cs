using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FightingFantasy.Mvc.ApiClients;
using FightingFantasy.Api.Integration.Tests.Factories;
using System.Net.Http;
using System.Net;
using Microsoft.Extensions.Configuration;

namespace FightingFantasy.Api.Integration.Tests
{
    [TestClass]
    public abstract class BaseTest
    {
        protected ApiWebApplicationFactory _apiFactory;
        protected Client _apiClient;
        protected HttpClient _client;
        protected HttpClient _authClient;
        protected IConfiguration _configuration;

        private readonly string _connectionString = $"DataSource=../../../context.db";

        public BaseTest()
        {
            _configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            _apiFactory = new ApiWebApplicationFactory(_configuration);

            _client = _apiFactory.CreateClient();
            _apiClient = new Client(_apiFactory.ClientOptions.BaseAddress.AbsoluteUri, _client);
            //{
            //    BaseUrl = _apiFactory.ClientOptions.BaseAddress.AbsoluteUri
            //};
        }


        protected void SetUserId(long id)
        {
            dynamic token = new System.Dynamic.ExpandoObject();
            token.UserId = id.ToString();
            _client.SetFakeBearerToken((object)token);
        }

        protected void AssertPlaythroughsAreEqual(PlayThroughModel first, PlayThroughModel second)
        {
            Assert.AreEqual(first.Id, second.Id);

            for (PlayThroughParagraphModel firstPara = first.StartParagraph, secondPara = second.StartParagraph;
                firstPara.ToParagraph != null;
                firstPara = firstPara.ToParagraph, secondPara = secondPara.ToParagraph)
            {
                AssertParagraphsAreEqual(firstPara, secondPara);
            }
        }

        protected void AssertParagraphsAreEqual(PlayThroughParagraphModel first, PlayThroughParagraphModel second)
        {
            Assert.AreEqual(first.Id, second.Id);
            Assert.AreEqual(first.Items, second.Items);
            Assert.AreEqual(first.Number, second.Number);

            var firstStats = first.Stats.ToArray();
            var secondStatss = second.Stats.ToArray();

            for (int i = 0; i < firstStats.Length; i++)
            {
                Assert.AreEqual(firstStats[i].Name, secondStatss[i].Name);
                Assert.AreEqual(firstStats[i].StatId, secondStatss[i].StatId);
                Assert.AreEqual(firstStats[i].Value, secondStatss[i].Value);
            }

        }
    }
}
