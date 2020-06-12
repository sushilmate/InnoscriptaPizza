using System.ComponentModel.DataAnnotations;

namespace InnoscriptaPizza.Persistence.Models
{
    public partial class UserLoginDetails
    {
        [Key]
        [StringLength(50)]
        public string UserName { get; set; }
        [Required]
        [StringLength(100)]
        public string Password { get; set; }
    }
}
