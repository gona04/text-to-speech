using Microsoft.EntityFrameworkCore;
using text_to_speech_api.Models;


public class ConvertedTextContext : DbContext
{
    public ConvertedTextContext(DbContextOptions<ConvertedTextContext> options)
        : base(options)
    {
    }

    public DbSet<ConvertedTextItem> ConvertedTextItem { get; set; } = null!;
}
