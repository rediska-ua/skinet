﻿using Core.Entities;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Data;

public class StoreContextSeed
{
    public static async Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
    {
        try
        {
            if (!context.ProductBrands.Any())
            {
                var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                foreach (var brand in brands)
                {
                    context.ProductBrands.Add(brand);
                }
                Console.WriteLine("In brands");
                await context.SaveChangesAsync();
            }

            if (!context.ProductTypes.Any())
            {
                var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                foreach (var type in types)
                {
                    context.ProductTypes.Add(type);
                }
                Console.WriteLine("In types");
                await context.SaveChangesAsync();
            }

            if (!context.Products.Any())
            {
                var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                foreach (var product in products)
                {
                    context.Products.Add(product);
                }
                Console.WriteLine("In products");
                await context.SaveChangesAsync();
            }
        } catch (Exception ex)
        {
            var logger = loggerFactory.CreateLogger<StoreContextSeed>();
            logger.LogError(ex.Message);
        }
    }
}
