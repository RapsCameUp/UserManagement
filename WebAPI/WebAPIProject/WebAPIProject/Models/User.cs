using System.ComponentModel.DataAnnotations;

namespace WebAPIProject.Models
{
    public class User
    {
        [Key]
        [Required]
        public Guid ID { get; set; }

        [StringLength(250)]
        public string FirstName { get; set; }

        [StringLength(250)]
        public string LastName { get; set; }

        [StringLength(250)]
        public string Email { get; set; }

        public string DateOfBirth { get; set; }

        public string Status { get; set; } = "1";
        public string Image { get; set; }

        [Required]
        public string Password { get; set; }
        public string PhoneNumbers { get; set; }

        public DateTime DateAdded { get; set; } = DateTime.Now;
    }
}
