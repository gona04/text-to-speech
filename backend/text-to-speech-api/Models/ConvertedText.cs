namespace text_to_speech_api.Models;


public class ConvertedText
{
    public long Id { get; set; }
    public string? Text { get; set; }
    public bool Language { get; set; }
    public string? UserName {get; set;}
}
