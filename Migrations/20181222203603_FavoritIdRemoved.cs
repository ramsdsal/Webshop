using Microsoft.EntityFrameworkCore.Migrations;

namespace webshop.Migrations
{
    public partial class FavoritIdRemoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "Favorits");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Favorits",
                nullable: false,
                defaultValue: 0);
        }
    }
}
