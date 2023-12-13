using System.ComponentModel.DataAnnotations;

namespace text_to_speech_api.Models
{
    public class ConvertedTextItem
    {
        [Key]
        [System.ComponentModel.DataAnnotations.Schema.DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required(ErrorMessage = "Text is required.")]
        [MaxLength(5000, ErrorMessage = "Text cannot exceed 5000 characters.")]
        public string? Text { get; set; }

        [CustomAnnotations.CustomValidationAttribute(maxLength: 100, isRequired: true, dataType: DataType.Text)]
        public string? UserName { get; set; }

        [Required(ErrorMessage = "CreatedAt is required.")]
        [DataType(DataType.DateTime)]
        public DateTime CreatedAt { get; set; }
    }

  public class UserDetailsModel
  {
    public string UserName { get; set; }
  }
}
