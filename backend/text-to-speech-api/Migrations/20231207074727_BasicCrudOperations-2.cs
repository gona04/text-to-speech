using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace texttospeechapi.Migrations
{
    /// <inheritdoc />
    public partial class BasicCrudOperations2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Language",
                table: "ConvertedTextItem");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Language",
                table: "ConvertedTextItem",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }
    }
}
