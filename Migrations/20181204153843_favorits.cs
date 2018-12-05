using Microsoft.EntityFrameworkCore.Migrations;

namespace webshop.Migrations
{
    public partial class favorits : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConfirmationMail_Users_UserId",
                table: "ConfirmationMail");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAuthentication_Users_UserId",
                table: "UserAuthentication");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAuthentication",
                table: "UserAuthentication");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ConfirmationMail",
                table: "ConfirmationMail");

            migrationBuilder.RenameTable(
                name: "UserAuthentication",
                newName: "UserAuthentications");

            migrationBuilder.RenameTable(
                name: "ConfirmationMail",
                newName: "ConfirmationMails");

            migrationBuilder.RenameIndex(
                name: "IX_UserAuthentication_UserId",
                table: "UserAuthentications",
                newName: "IX_UserAuthentications_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ConfirmationMail_UserId",
                table: "ConfirmationMails",
                newName: "IX_ConfirmationMails_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAuthentications",
                table: "UserAuthentications",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ConfirmationMails",
                table: "ConfirmationMails",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Favorits",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorits", x => new { x.UserId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_Favorits_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favorits_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Favorits_ProductId",
                table: "Favorits",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ConfirmationMails_Users_UserId",
                table: "ConfirmationMails",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAuthentications_Users_UserId",
                table: "UserAuthentications",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ConfirmationMails_Users_UserId",
                table: "ConfirmationMails");

            migrationBuilder.DropForeignKey(
                name: "FK_UserAuthentications_Users_UserId",
                table: "UserAuthentications");

            migrationBuilder.DropTable(
                name: "Favorits");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAuthentications",
                table: "UserAuthentications");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ConfirmationMails",
                table: "ConfirmationMails");

            migrationBuilder.RenameTable(
                name: "UserAuthentications",
                newName: "UserAuthentication");

            migrationBuilder.RenameTable(
                name: "ConfirmationMails",
                newName: "ConfirmationMail");

            migrationBuilder.RenameIndex(
                name: "IX_UserAuthentications_UserId",
                table: "UserAuthentication",
                newName: "IX_UserAuthentication_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ConfirmationMails_UserId",
                table: "ConfirmationMail",
                newName: "IX_ConfirmationMail_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAuthentication",
                table: "UserAuthentication",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ConfirmationMail",
                table: "ConfirmationMail",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ConfirmationMail_Users_UserId",
                table: "ConfirmationMail",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserAuthentication_Users_UserId",
                table: "UserAuthentication",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
