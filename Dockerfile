FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# copy csproj and restore
COPY ./JewelryShop.sln ./
COPY ./JewelryShop.Api/JewelryShop.Api.csproj ./JewelryShop.Api/
COPY ./JewelryShop.Application/JewelryShop.Application.csproj ./JewelryShop.Application/
COPY ./JewelryShop.Domain/JewelryShop.Domain.csproj ./JewelryShop.Domain/
COPY ./JewelryShop.Infrastructure/JewelryShop.Infrastructure.csproj ./JewelryShop.Infrastructure/

RUN dotnet restore JewelryShop.sln

# copy everything else and build
COPY . .
WORKDIR /src/JewelryShop.Api
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "JewelryShop.Api.dll"]
