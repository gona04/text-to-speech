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
    public class SentimentAnalyserController : ControllerBase
    {
        private readonly ConvertedTextContext _context;

        public SentimentAnalyserController(ConvertedTextContext context)
        {
            _context = context;
        }

        // GET: api/SentimentAnalyser
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SentimentAnalyserItem>>> GetSentimentAnalyserItems()
        {
          if (_context.SentimentAnalyserItems == null)
          {
              return NotFound();
          }
            return await _context.SentimentAnalyserItems.ToListAsync();
        }

        // GET: api/SentimentAnalyser/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SentimentAnalyserItem>> GetSentimentAnalyserItem(long id)
        {
          if (_context.SentimentAnalyserItems == null)
          {
              return NotFound();
          }
            var sentimentAnalyserItem = await _context.SentimentAnalyserItems.FindAsync(id);

            if (sentimentAnalyserItem == null)
            {
                return NotFound();
            }

            return sentimentAnalyserItem;
        }

        // PUT: api/SentimentAnalyser/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSentimentAnalyserItem(long id, SentimentAnalyserItem sentimentAnalyserItem)
        {
            if (id != sentimentAnalyserItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(sentimentAnalyserItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SentimentAnalyserItemExists(id))
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

        // POST: api/SentimentAnalyser
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SentimentAnalyserItem>> PostSentimentAnalyserItem(SentimentAnalyserItem sentimentAnalyserItem)
        {
          if (_context.SentimentAnalyserItems == null)
          {
              return Problem("Entity set 'ConvertedTextContext.SentimentAnalyserItems'  is null.");
          }
            _context.SentimentAnalyserItems.Add(sentimentAnalyserItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSentimentAnalyserItem", new { id = sentimentAnalyserItem.Id }, sentimentAnalyserItem);
        }

        // DELETE: api/SentimentAnalyser/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSentimentAnalyserItem(long id)
        {
            if (_context.SentimentAnalyserItems == null)
            {
                return NotFound();
            }
            var sentimentAnalyserItem = await _context.SentimentAnalyserItems.FindAsync(id);
            if (sentimentAnalyserItem == null)
            {
                return NotFound();
            }

            _context.SentimentAnalyserItems.Remove(sentimentAnalyserItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SentimentAnalyserItemExists(long id)
        {
            return (_context.SentimentAnalyserItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
