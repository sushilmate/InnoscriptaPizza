using InnoscriptaPizza.Persistence.Models;
using Microsoft.EntityFrameworkCore;

namespace InnoscriptaPizza.Persistence
{
    public partial class InnoscriptaPizzaDBContext : DbContext
    {
        public InnoscriptaPizzaDBContext()
        {
        }

        public InnoscriptaPizzaDBContext(DbContextOptions<InnoscriptaPizzaDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<OrderDetails> OrderDetails { get; set; }
        public virtual DbSet<Pizza> Pizza { get; set; }
        public virtual DbSet<UserLoginDetails> UserLoginDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=tcp:innoscriptapizza-database-server.database.windows.net,1433;Initial Catalog=InnoscriptaPizzaDB;Persist Security Info=False;User ID=sushil;Password=innoscriptapizza@123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderDetails>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.OrderDescription).IsUnicode(false);

                entity.Property(e => e.Status).IsUnicode(false);

                entity.Property(e => e.UserName).IsUnicode(false);
            });

            modelBuilder.Entity<Pizza>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description).IsUnicode(false);

                entity.Property(e => e.ImageUrl).IsUnicode(false);

                entity.Property(e => e.Name).IsUnicode(false);

                entity.Property(e => e.Type).IsUnicode(false);
            });

            modelBuilder.Entity<UserLoginDetails>(entity =>
            {
                entity.Property(e => e.UserName).IsUnicode(false);

                entity.Property(e => e.Password).IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
