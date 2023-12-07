using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace text_to_speech_api.Models;

public class ConvertedTextItem
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string? Text { get; set; }
    /*
    This Username will then be connected to a database that will
    be generated from AZURE sso login
    */
    public string? UserName {get; set;}
    public DateTime CreatedAt { get; set; }
}
