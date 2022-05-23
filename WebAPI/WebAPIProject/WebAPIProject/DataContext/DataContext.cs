using Microsoft.EntityFrameworkCore;
using WebAPIProject.Models;

namespace WebAPIProject.DataContext
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
