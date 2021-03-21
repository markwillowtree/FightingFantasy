using FightingFantasy.Api.Controllers;
using FightingFantasy.Api.Integration.Tests.Factories;
using FightingFantasy.Api.Integration.Tests.Helpers;
using FightingFantasy.Mvc.ApiClients;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FightingFantasy.Api.Integration.Tests.EndpointTests
{
    [TestClass]
    public class BooksApiTests : BaseTest
    {
        [TestMethod]
        public async Task GetBooks_ShouldReturn12Books()
        {
            var books = await _apiClient.GetAllBooksAsync();

            Assert.AreEqual(12, books.Count);
        }

        [TestMethod]
        public async Task GetBook1_ShouldReturnBook1()
        {
            var book = await _apiClient.GetBookByIdAsync(1);

            Assert.IsNotNull(book);
            Assert.AreEqual(1, book.Id);
        }

        [TestMethod]
        public void GetBook13_ShouldReturnNotFound()
        {
            AssertException.Throws<ApiException<ProblemDetails>>(() =>
            _apiClient.GetBookByIdAsync(13), BaseController.BookNotFoundMsg);
        }
    }
}
