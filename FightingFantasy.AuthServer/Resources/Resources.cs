using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.AuthServer
{
    public static class Resources
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            { 
                new IdentityResources.OpenId(),
                new IdentityResources.Profile()
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource
                {
                    Name = "BooksApi",
                    DisplayName = "Books API",
                    Description = "Retrieve and purchase books",
                    Scopes = new List<string>{"CustomerScope"}
                },
                new ApiResource
                {
                    Name = "PlaythroughsApi",
                    DisplayName = "Playthroughs API",
                    Description = "CRUD for playthroughs",
                    Scopes = new List<string>{"CustomerScope"}
                }
            };
        }

        public static IEnumerable<ApiScope> GetApiScopes()
        {
            return new[]
            {
                new ApiScope("CustomerScope", "Access to APIs which fulfil customer requirements")
            };
        }
    }
}
