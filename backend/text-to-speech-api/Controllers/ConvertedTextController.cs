using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using text_to_speech_api.Models;

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

    // GET: api/ConvertedText
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ConvertedTextItem>>> GetConvertedTextItem()
    {
      if (_context.ConvertedTextItem == null)
      {
        return NotFound();
      }

      return await _context.ConvertedTextItem.ToListAsync();
    }

    // GET: api/ConvertedText/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ConvertedTextItem>> GetConvertedTextItem(long id)
    {
      if (_context.ConvertedTextItem == null)
      {
        return NotFound();
      }

      var convertedTextItem = await _context.ConvertedTextItem.FindAsync(id);

      if (convertedTextItem == null)
      {
        return NotFound();
      }

      return convertedTextItem;
    }

    // PUT: api/ConvertedText/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> PutConvertedTextItem(long id, ConvertedTextItem convertedTextItem)
    {
      if (id != convertedTextItem.Id)
      {
        return BadRequest();
      }

      // Set the updated date
      convertedTextItem.CreatedAt = DateTime.UtcNow;

      _context.Entry(convertedTextItem).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!ConvertedTextItemExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/ConvertedText
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ConvertedTextItem>> PostConvertedTextItem(ConvertedTextItem convertedTextItem)
    {
      if (_context.ConvertedTextItem == null)
      {
        return Problem("Entity set 'ConvertedTextContext.ConvertedTextItem'  is null.");
      }

      // Set the created date
      convertedTextItem.CreatedAt = DateTime.UtcNow;

      _context.ConvertedTextItem.Add(convertedTextItem);
      await _context.SaveChangesAsync();

      return CreatedAtAction(nameof(GetConvertedTextItem), new { id = convertedTextItem.Id }, convertedTextItem);
    }

    // DELETE: api/ConvertedText/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteConvertedTextItem(long id)
    {
      if (_context.ConvertedTextItem == null)
      {
        return NotFound();
      }

      var convertedTextItem = await _context.ConvertedTextItem.FindAsync(id);
      if (convertedTextItem == null)
      {
        return NotFound();
      }

      _context.ConvertedTextItem.Remove(convertedTextItem);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool ConvertedTextItemExists(long id)
    {
      return (_context.ConvertedTextItem?.Any(e => e.Id == id)).GetValueOrDefault();
    }
  }

}
