using Microsoft.EntityFrameworkCore.Migrations;

namespace webshop.Migrations
{
    public partial class orderBankAdd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Bank",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bank",
                table: "Orders");
        }
    }
}
