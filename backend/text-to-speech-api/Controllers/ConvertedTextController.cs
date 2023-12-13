using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using text_to_speech_api.Models;
using Validations;

namespace text_to_speech_api.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ConvertedTextController : ControllerBase
  {
    private readonly ConvertedTextContext _context;

    public ConvertedTextController(ConvertedTextContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ConvertedTextItem>>> GetConvertedTextItem()
    {
      var query = from ci in _context.ConvertedTextItem
                  join sa in _context.SentimentAnalyserItems
                  on ci.Id equals sa.ConvertedTextId
                  orderby ci.CreatedAt descending
                  select new
                  {
                    ci.Id,
                    ci.Text,
                    ci.UserName,
                    ci.CreatedAt,
                    sa.Negative,
                    sa.Neutral,
                    sa.Positive,
                    sa.sentiment
                  };

      var result = await query.ToListAsync();

      if (result == null || !result.Any())
      {
        return NotFound(new { message = "No converted text items found." });
      }

      return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ConvertedTextItem>> GetConvertedTextItem(long id)
    {
      var convertedTextItem = await _context.ConvertedTextItem
          .FirstOrDefaultAsync(item => item.Id == id);

      if (convertedTextItem == null)
      {
        return NotFound(new { message = $"Converted text item with ID {id} not found." });
      }

      return Ok(convertedTextItem);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteConvertedTextItem(long id)
    {
      var convertedTextItem = await _context.ConvertedTextItem
          .FirstOrDefaultAsync(item => item.Id == id);

      if (convertedTextItem == null)
      {
        return NotFound(new { message = $"Converted text item with ID {id} not found." });
      }

      _context.ConvertedTextItem.Remove(convertedTextItem);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutConvertedTextItem(long id, ConvertedTextItem convertedTextItem)
    {
      // ... (existing code)

      return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<ConvertedTextItem>> PostConvertedTextItem(ConvertedTextItem convertedTextItem)
    {
      // ... (existing code)

      return CreatedAtAction(nameof(GetConvertedTextItem), new { id = convertedTextItem.Id }, convertedTextItem);
    }

    private bool ConvertedTextItemExists(long id)
    {
      return (_context.ConvertedTextItem?.Any(e => e.Id == id)).GetValueOrDefault();
    }

    [HttpPost("user-details")]
    public async Task<ActionResult<object>> GetUserDetails([FromBody] UserDetailsModel userDetails)
    {
      if (string.IsNullOrEmpty(userDetails.UserName))
      {
        return BadRequest(new { message = "Invalid request. Please provide a valid user name." });
      }

      var query = from ci in _context.ConvertedTextItem
                  join sa in _context.SentimentAnalyserItems
                  on ci.Id equals sa.ConvertedTextId
                  where ci.UserName == userDetails.UserName
                  group new { ci, sa } by ci.UserName into userGroup
                  select new
                  {
                    UserName = userGroup.Key,
                    TotalItems = userGroup.Count(),
                    Sentiment = userGroup.Max(entry => entry.sa.sentiment),
                    Positive = userGroup.Average(entry => entry.sa.Positive),
                    Negative = userGroup.Average(entry => entry.sa.Negative),
                    Neutral = userGroup.Average(entry => entry.sa.Neutral)
                  };

      var result = await query.FirstOrDefaultAsync();

      if (result == null)
      {
        return NotFound(new { message = $"User details for '{userDetails.UserName}' not found." });
      }

      return Ok(result);
    }


  }
}
