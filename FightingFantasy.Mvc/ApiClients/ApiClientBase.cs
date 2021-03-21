using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;

namespace FightingFantasy.Mvc.ApiClients
{
    public interface IApiClientBase
    {
        public void SetBearerToken(string token);
        public Task<HttpRequestMessage> CreateHttpRequestMessageAsync(CancellationToken cancellationToken);
    }
    public class ApiClientBase : IApiClientBase
    {
        protected HttpClient _httpClient;
        string bearerToken = string.Empty;


        public ApiClientBase(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public ApiClientBase() { }

        public async Task<HttpRequestMessage> CreateHttpRequestMessageAsync(CancellationToken cancellationToken)
        {
            var msg = new HttpRequestMessage();
            await Task.CompletedTask;

            if (!string.IsNullOrEmpty(bearerToken))
                msg.Headers.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
            return msg;
        }

        public void SetBearerToken(string token)
        {
            bearerToken = token;
        }
    }
}
