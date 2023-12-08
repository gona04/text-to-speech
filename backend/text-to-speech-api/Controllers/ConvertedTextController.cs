using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using text_to_speech_api.Models;
using Validations;

using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

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
            var convertedTextItems = await _context.ConvertedTextItem
                .OrderByDescending(item => item.CreatedAt)
                .ToListAsync();

            if (convertedTextItems == null || !convertedTextItems.Any())
            {
                return NotFound(new { message = "No converted text items found." });
            }

            return Ok(convertedTextItems);
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
            if (id != convertedTextItem.Id)
            {
                return BadRequest(new { message = "Invalid ID in the request body." });
            }

            if (ValidationLibrary.IsTextEmpty(convertedTextItem.Text))
            {
                return BadRequest(new { message = "Text cannot be empty." });
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
                    return NotFound(new { message = "Converted text item not found." });
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<ConvertedTextItem>> PostConvertedTextItem(ConvertedTextItem convertedTextItem)
        {
            if (ValidationLibrary.IsTextEmpty(convertedTextItem.Text))
            {
                return BadRequest(new { message = "Text cannot be empty." });
            }

            convertedTextItem.CreatedAt = DateTime.UtcNow;

            _context.ConvertedTextItem.Add(convertedTextItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetConvertedTextItem), new { id = convertedTextItem.Id }, convertedTextItem);
        }

        private bool ConvertedTextItemExists(long id)
        {
            return (_context.ConvertedTextItem?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
