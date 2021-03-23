# Fighting Fantasy App
## Introduction
Although this is a functioning and usable app, it is still a work in progress and some features have not been implemented yet. The primary purpose of this app is to serve as a learning tool for new technologies.

## Domain
Fighting Fantasy was a series of choose your own adventure books released in the 1980s and 1990s. This app is designed to be used by people who have a physical copy of a book. 

The user may enter their characters statistics (e.g. health, fighting skill, items carried) and create a map of their adventure as they play. Each map location stores the characters statistics at that point.  Common statistic types such as “health” are often shared across many books, but there are also unique statistics which are often included in only one book. 
## Getting Started
A user is seeded into the database with the username “username” and a password of “password”.

Running the project in VS should start the Api/AuthServer and MVC projects on IIS Express on localhost on ports 44377, 44370 and 44322 respectively. 

SQLite is used as a database so a local install of SQL server is not necessary.
A copy of an initialised SQLite database has been checked in so the user does not need to run the ef migrations tool.

Due to the certificate being self signed, the browser will ask for confirmation. They key can be added to the local machine certificate store to avoid this.

After logging in, select a book, enter your stats and start to create a map of your adventure, recording changes in stats as you go.

The database is located at FightingFantasy.Dal/DbContexts/context.db and can be accessed using this tool https://sqlitebrowser.org/ .
To refresh the database to its initial state, delete the context.db file, navigate to the solution folder and execute the following command.

`dotnet ef database update --startup-project FightingFantasy.AuthServer --project FightingFantasy.Dal --verbose`
## Technologies Used
    • ASP.NET Core MVC and JQuery
    • Entity Framework Core with SQLite – Code First with Migrations
    • ASP.NET Identity
    • Identity Server 
    • Swashbuckle – Used in API to produce Swagger config.
    • NSwag – used in MVC .csproj file to generate API HTTP client via the swagger config.
    • Serilog – Used with SQLite sink for logging.
    • MSTest 
    • WebMotions.Fake.Authentication.JwtBearer - For integraton testing with JWT tokens.
    • Cytoscope – A JS graphing utility used to produce the map
## Project Details
### FightingFantasy.Domain
This project uses POCOs to define the domain entities. It is a cross cutting concern which may be used by all other projects. However, these objects are not exposed to the front-end. DTOs are used instead. This also avoids issues caused by recursive relationships in the domain entities which can cause errors when serializing to JSON. 

The primary domain concepts are:
- Book 
  - Contains BookStats 
- Playthrough
  - Specific to a User and a Book
  - Contains a linked list of Paragraphs
- Paragraphs
  - Mappable locations a user moves between as they make choices within the book.
  - Contains instances of stats based on the relevant book in the owning Playthrough
- User
  - Owns a list of playthroughs.
  - Inherits from IdentityUser
### FightingFantasy.Dal
The DbContext defines the tables, foreign key relationships and the data to be seeded on database creation. 

A generic repository is provided along with a unit of work object in order to abstract transactions. 

Lazy loading is used by default but the generic repository does support eager loading.

Schema changes are handled via Entity Framework migrations.

### FightingFantasy.AuthServer
At the moment this defines one client, the MVC web front-end, which uses Authorization Code Flow with PKCE and JWTs. In the future this will support an Angular front-end and potentially third party authorisation via Google/Facebook etc. 
MVC users are redirected here to login via OIDC.

The primary key of the ASP.NET Identity entities has been changed to long for performance reasons.
### FightingFantasy.Api
This provides the business logic and CRUD operations to the frontend(s). 

The swagger document at https://localhost:44377/swagger/v1/swagger.json is copied to the MVC project. 

With the exception of viewing all books, users must be logged in to the system in order to use the app. The API retrieves the UserId from the claims in the token in order to enforce authorisation on Playthroughs.

### FightingFantasy.Mvc

The web front-end uses ASP.NET MVC, JQuery, Bootstrap, CSS and Cytoscape to provide the user experience. 

The swagger document referenced above is used during compilation by NSwag in order to generate an HttpClient. This is configured to derive from a custom base class which allows the JWT to be set in the Authorization header in every request sent to the API. 

Custom middleware is used in order to detect JWT expiration and log the user out of the system.

The most complex aspect of this project is the state management aspect of the map page. Here there are four elements that need to be kept in sync. The back-end store of the playthrough, the form that displays the stats, the Cytoscape map and the playthrough stored in the JS. 

A simple approach would be to retrieve the entire updated playthrough every time an attribute is changed, however, this would be very inefficient in terms of bandwidth consumption, particularly on large maps with potentially hundreds of locations. This aspect of the app would certainly benefit from a Redux style approach using something like NGRX.

### FightingFantasy.Infrastructure
This project is designed to contain services which are not specific to the domain. At the moment it only includes custom middleware which logs exceptions but could contain other domain agnostic functionality such as sending emails.

### FightingFantasy.Api.Integration.Tests
This project uses WebApplicationFactory with a Startup class derived from the API project.

### Future Work 
- Add animated dice control to map page to allow for  combat.
- Add character creation screen to initialise stats based on stat specific rules. Add these rules into the BookStat entity.
- Frontend testing using something like Selenium.
- Add .csproj command to the API that will retrieve the generated Swagger config on compilation and write it to the MVC project before it is compiled. This will remove the need for the developer to manually copy the config across every time the interface of the API is modified.
- An Angular customer front-end which will replicate the MVC functionality. This will use the Redux pattern with the NGRX library in order to simplify state management, make it more robust and also support time travel debugging.
- A Razor customer front-end.
- Introduction of a payment gateway so that customers have to pay for access to various books before they can use the app with them.
- Razor/MVC/Angular front-ends for admin users. This will allow new books and new types of stats to be added. Also tools to support customer payments if/when they are implemented.
- Potentially replace Cytoscape with a more suitable mapping package or create a custom JS library. Also make the mapping tool and the Playthrough entity more sophisticated such that multiple pathways and recursive routes will be possible.
- Have custom CSS for each book to reflect the different settings e.g. medieval/science fiction/modern day.