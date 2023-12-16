using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// Add these using directives
using System.ComponentModel;

// SentimentAnalyserItem.cs
using SentimentValidationAnnotations = CustomAnnotationsSentimentAnalysis;

namespace text_to_speech_api.Models
{
    public class SentimentAnalyserItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Range(0, 100, ErrorMessage = "Value must be between 0 and 100.")]
        [SentimentValidationAnnotations.MaxLengthAndTypeValidationAttribute(100, true, DataType.Text)] // Use DataType.Text for int
        public int Positive { get; set; }

        [Range(0, 100, ErrorMessage = "Value must be between 0 and 100.")]
        [SentimentValidationAnnotations.MaxLengthAndTypeValidationAttribute(100, true, DataType.Text)] // Use DataType.Text for int
        public int Negative { get; set; }

        [Range(0, 100, ErrorMessage = "Value must be between 0 and 100.")]
        [SentimentValidationAnnotations.MaxLengthAndTypeValidationAttribute(100, true, DataType.Text)] // Use DataType.Text for int
        public int Neutral { get; set; }

        [Required(ErrorMessage = "Sentiment is required")]
        [SentimentValidationAnnotations.MaxLengthAndTypeValidationAttribute(int.MaxValue, true, DataType.Text)]
        public string? sentiment { get; set; }

        [Required]
        [ForeignKey("ConvertedTextItem")]
        public long ConvertedTextId { get; set; }
    }
}
