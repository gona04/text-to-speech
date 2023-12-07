using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using text_to_speech_api.Models;
using UtilityLibraries;

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
            var convertedTextItems = await _context.ConvertedTextItem
                .OrderByDescending(item => item.CreatedAt)
                .ToListAsync();

            if (convertedTextItems == null)
            {
                return NotFound();
            }

            return Ok(convertedTextItems);
        }

        // GET: api/ConvertedText/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ConvertedTextItem>> GetConvertedTextItem(long id)
        {
            var convertedTextItem = await _context.ConvertedTextItem
                .FirstOrDefaultAsync(item => item.Id == id);

            if (convertedTextItem == null)
            {
                return NotFound();
            }

            return Ok(convertedTextItem);
        }

        // PUT: api/ConvertedText/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConvertedTextItem(long id, ConvertedTextItem convertedTextItem)
        {
            if (id != convertedTextItem.Id)
            {
                return BadRequest("Invalid ID in the request body.");
            }

            // Additional server-side validation
            if (string.IsNullOrEmpty(convertedTextItem.Text))
            {
                return BadRequest("Text cannot be empty.");
            }

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
          String input = convertedTextItem.Text;
           Console.WriteLine("Begins with uppercase? " +
                 $"{(input.StartsWithUpper() ? "Yes" : "No")}");
            // Additional server-side validation
            if (string.IsNullOrEmpty(convertedTextItem.Text))
            {
                return BadRequest("Text cannot be empty.");
            }

            convertedTextItem.CreatedAt = DateTime.UtcNow;

            _context.ConvertedTextItem.Add(convertedTextItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConvertedTextItem), new { id = convertedTextItem.Id }, convertedTextItem);
        }

        // DELETE: api/ConvertedText/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConvertedTextItem(long id)
        {
            var convertedTextItem = await _context.ConvertedTextItem
                .FirstOrDefaultAsync(item => item.Id == id);

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
