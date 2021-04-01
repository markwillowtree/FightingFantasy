using IdentityServer4;
using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FightingFantasy.AuthServer
{
    public static class Clients
    {
        public static IEnumerable<Client> Get()
        {
            return new List<Client>
            {
                new Client
                {
                    ClientId = "CustomerMvcClient",
                    ClientName = "MVC app which can be used by customers",
                    AllowedGrantTypes = GrantTypes.Code,
                    ClientSecrets = new List<Secret>{new Secret("CustomerMvcClientSecret".Sha256())},
                    AllowedScopes = new List<string>
                    { 
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "CustomerScope" 
                    },

                    // useful for forcing token expiration during testing 
                    //AccessTokenLifetime = 1,
                    //IdentityTokenLifetime = 1,
                    //SlidingRefreshTokenLifetime = 1,
                    RedirectUris = new List<string>{ "https://localhost:44322/signin-oidc" },
                    PostLogoutRedirectUris = new List<string>{"https://localhost:44322/signout-callback-oidc" }
                },
                new Client
                {
                    ClientId = "CustomerAngularClient",
                    ClientName = "Angular app which can be used by customers",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,
                    AllowedScopes = new List<string>
                    {
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile,
                        "CustomerScope"
                    },
                    RedirectUris = new List<string>{ "https://localhost:44321" },
                    PostLogoutRedirectUris = new List<string>{ "https://localhost:44321/" }
                }
            };
        }
    }
}
