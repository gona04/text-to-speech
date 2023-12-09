using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace text_to_speech_api.Models
{
    public class SentimentAnalyserItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Range(0, 100, ErrorMessage = "Value must be between 0 and 100.")]
        public int Positive { get; set; }

        [Range(0, 100, ErrorMessage = "Value must be between 0 and 100.")]
        public int Negative { get; set; }

        [Range(0, 100, ErrorMessage = "Value must be between 0 and 100.")]
        public int Neutral { get; set; }

        [Required]
        public string? sentiment { get; set; }

        [Required]
        [ForeignKey("ConvertedTextItem")]
        public long ConvertedTextId { get; set; }
  }
}
