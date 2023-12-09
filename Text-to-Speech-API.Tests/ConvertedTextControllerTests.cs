using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using text_to_speech_api.Controllers;
using text_to_speech_api.Models;
using Xunit;

namespace TextToSpeech.Tests
{
    public class ConvertedTextControllerTests
    {
        [Fact]
        public async Task GetConvertedTextItem_ReturnsOkResult()
        {
            // Arrange
            var mockContext = new Mock<ConvertedTextContext>();
            mockContext.Setup(context => context.ConvertedTextItem)
                .Returns(MockDbSet(new List<ConvertedTextItem>()));

            var controller = new ConvertedTextController(mockContext.Object);

            // Act
            var result = await controller.GetConvertedTextItem();

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
        }

        [Fact]
        public async Task GetConvertedTextItem_ReturnsNotFoundResult_WhenNoItems()
        {
            // Arrange
            var mockContext = new Mock<ConvertedTextContext>();
            mockContext.Setup(context => context.ConvertedTextItem)
                .Returns(MockDbSet(new List<ConvertedTextItem>()));

            var controller = new ConvertedTextController(mockContext.Object);

            // Act
            var result = await controller.GetConvertedTextItem();

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result.Result);
            Assert.Equal("No converted text items found.", notFoundResult.Value);
        }

        [Fact]
        public async Task GetConvertedTextItem_ReturnsItemsInDescendingOrder()
        {
            // Arrange
            var items = new List<ConvertedTextItem>
            {
                new ConvertedTextItem { Id = 1, CreatedAt = DateTime.UtcNow.AddMinutes(1) },
                new ConvertedTextItem { Id = 2, CreatedAt = DateTime.UtcNow.AddMinutes(2) },
                new ConvertedTextItem { Id = 3, CreatedAt = DateTime.UtcNow.AddMinutes(3) }
            };

            var mockContext = new Mock<ConvertedTextContext>();
            mockContext.Setup(context => context.ConvertedTextItem)
                .Returns(MockDbSet(items));

            var controller = new ConvertedTextController(mockContext.Object);

            // Act
            var result = await controller.GetConvertedTextItem();

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsAssignableFrom<IEnumerable<ConvertedTextItem>>(okObjectResult.Value);
            Assert.Equal(3, model.Count());
            Assert.Equal(3, model.First().Id); // Ensure items are in descending order
        }

        // Add more test methods for other actions...

        private static DbSet<T> MockDbSet<T>(List<T> items) where T : class
        {
            var queryable = items.AsQueryable();
            var mockSet = new Mock<DbSet<T>>();
            mockSet.As<IAsyncEnumerable<T>>()
                .Setup(m => m.GetAsyncEnumerator(It.IsAny<System.Threading.CancellationToken>()))
                .Returns(new TestAsyncEnumerator<T>(queryable.GetEnumerator()));
            mockSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(new TestAsyncQueryProvider<T>(queryable.Provider));
            mockSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            mockSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            mockSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(queryable.GetEnumerator());

            return mockSet.Object;
        }
    }
}
