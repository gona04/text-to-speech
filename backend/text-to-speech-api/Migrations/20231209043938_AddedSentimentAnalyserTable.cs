using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace texttospeechapi.Migrations
{
    /// <inheritdoc />
    public partial class AddedSentimentAnalyserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SentimentAnalyserItems",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Positive = table.Column<int>(type: "int", nullable: false),
                    Negative = table.Column<int>(type: "int", nullable: false),
                    Neutral = table.Column<int>(type: "int", nullable: false),
                    sentiment = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ConvertedTextId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SentimentAnalyserItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SentimentAnalyserItems_ConvertedTextItem_ConvertedTextId",
                        column: x => x.ConvertedTextId,
                        principalTable: "ConvertedTextItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_SentimentAnalyserItems_ConvertedTextId",
                table: "SentimentAnalyserItems",
                column: "ConvertedTextId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SentimentAnalyserItems");
        }
    }
}
