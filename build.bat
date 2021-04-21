cd FightingFantasy.Api
dotnet tool restore
cd ..
dotnet restore FightingFantasy.sln

cd FightingFantasy.Angular/ClientApp
call npm install
call npm audit fix
cd ../../

dotnet build FightingFantasy.sln