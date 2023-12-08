using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace text_to_speech_api.Models
{
    public class ConvertedTextItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required(ErrorMessage = "Text is required.")]
        [MaxLength(5000, ErrorMessage = "Text cannot exceed 5000 characters.")]
        public string? Text { get; set; }

        [MaxLength(100, ErrorMessage = "Username cannot exceed 100 characters.")]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "CreatedAt is required.")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }
    }
}
