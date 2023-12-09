using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace texttospeechapi.Migrations
{
    /// <inheritdoc />
    public partial class MadeSmallChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SentimentAnalyserItems_ConvertedTextItem_ConvertedTextId",
                table: "SentimentAnalyserItems");

            migrationBuilder.AddColumn<long>(
                name: "SentimentAnalyserItemId",
                table: "ConvertedTextItem",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddForeignKey(
                name: "FK_SentimentAnalyserItems_ConvertedTextItem_ConvertedTextId",
                table: "SentimentAnalyserItems",
                column: "ConvertedTextId",
                principalTable: "ConvertedTextItem",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SentimentAnalyserItems_ConvertedTextItem_ConvertedTextId",
                table: "SentimentAnalyserItems");

            migrationBuilder.DropColumn(
                name: "SentimentAnalyserItemId",
                table: "ConvertedTextItem");

            migrationBuilder.AddForeignKey(
                name: "FK_SentimentAnalyserItems_ConvertedTextItem_ConvertedTextId",
                table: "SentimentAnalyserItems",
                column: "ConvertedTextId",
                principalTable: "ConvertedTextItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
