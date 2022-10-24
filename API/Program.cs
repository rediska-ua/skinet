using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

public class WebApp
{
    public async static Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddScoped<IProductRepository, ProductRepository>();
        builder.Services.AddControllers();
        builder.Services.AddDbContext<StoreContext>(x =>
            x.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
        );
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            try
            {
                var context = services.GetRequiredService<StoreContext>();
                Console.WriteLine(context.Database);
                await context.Database.MigrateAsync();
                await StoreContextSeed.SeedAsync(context, loggerFactory);

            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<WebApp>();
                logger.LogError(ex, "An error occured during migration");
            }
        }
        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
