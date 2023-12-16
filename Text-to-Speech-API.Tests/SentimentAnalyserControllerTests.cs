using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using text_to_speech_api.Controllers;
using text_to_speech_api.Models;

namespace YourNamespace.Tests
{
    public class SentimentAnalyserControllerTests
    {
        // Mock DbContext
        private readonly Mock<ConvertedTextContext> _mockContext;

        public SentimentAnalyserControllerTests()
        {
            _mockContext = new Mock<ConvertedTextContext>();
        }

        [Fact]
        public async Task GetSentimentAnalyserItems_ReturnsCorrectType()
        {
            // Arrange
            var controller = new SentimentAnalyserController(_mockContext.Object);

            // Act
            var result = await controller.GetSentimentAnalyserItems();

            // Assert
            Assert.IsType<ActionResult<IEnumerable<SentimentAnalyserItem>>>(result);
        }

        [Fact]
        public async Task GetSentimentAnalyserItems_ReturnsItems()
        {
            // Arrange
            var testData = new List<SentimentAnalyserItem>
            {
                new SentimentAnalyserItem { Id = 1, /* other properties */ },
                new SentimentAnalyserItem { Id = 2, /* other properties */ },
            };

            _mockContext.Setup(m => m.SentimentAnalyserItems).ReturnsDbSet(testData);
            var controller = new SentimentAnalyserController(_mockContext.Object);

            // Act
            var result = await controller.GetSentimentAnalyserItems();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<SentimentAnalyserItem>>>(result);
            var model = Assert.IsType<List<SentimentAnalyserItem>>(actionResult.Value);
            Assert.Equal(testData.Count, model.Count);
        }

        // Add more tests for other controller actions (e.g., GetSentimentAnalyserItem, PutSentimentAnalyserItem, etc.)
    }

    // Extension method to set up a mock DbSet using a collection of data
    public static class DbSetExtensions
    {
        public static Mock<DbSet<T>> ReturnsDbSet<T>(this Mock<ConvertedTextContext> mockContext, List<T> data) where T : class
        {
            var queryable = data.AsQueryable();
            var dbSet = new Mock<DbSet<T>>();
            dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
            mockContext.Setup(x => x.Set<T>()).Returns(dbSet.Object);
            return dbSet;
        }
    }
}
