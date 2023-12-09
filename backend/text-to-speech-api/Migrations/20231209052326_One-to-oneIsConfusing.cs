using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace texttospeechapi.Migrations
{
    /// <inheritdoc />
    public partial class OnetooneIsConfusing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SentimentAnalyserItems_ConvertedTextItem_ConvertedTextId",
                table: "SentimentAnalyserItems");

            migrationBuilder.DropIndex(
                name: "IX_SentimentAnalyserItems_ConvertedTextId",
                table: "SentimentAnalyserItems");

            migrationBuilder.DropColumn(
                name: "SentimentAnalyserItemId",
                table: "ConvertedTextItem");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "SentimentAnalyserItemId",
                table: "ConvertedTextItem",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_SentimentAnalyserItems_ConvertedTextId",
                table: "SentimentAnalyserItems",
                column: "ConvertedTextId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SentimentAnalyserItems_ConvertedTextItem_ConvertedTextId",
                table: "SentimentAnalyserItems",
                column: "ConvertedTextId",
                principalTable: "ConvertedTextItem",
                principalColumn: "Id");
        }
    }
}
