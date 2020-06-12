using System.ComponentModel.DataAnnotations;

namespace InnoscriptaPizza.Persistence.Models
{
    public partial class Pizza
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double PriceInEur { get; set; }
        [StringLength(50)]
        public string Type { get; set; }
    }
}
