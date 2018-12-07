using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using webshop.Models;


namespace webshop.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly DbConnectionContext _context;
        public UserController(DbConnectionContext context)
        {
            this._context = context;
        }

        // GET api/Products
        [HttpGet]
        public IActionResult Get()
        {
            var result = this._context.Users.Select(user => new
            {
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email
            });

            return new OkObjectResult(result);
        }

<<<<<<< HEAD
        [HttpGet("{id}")]
        public IQueryable Get(int id)
        {
            var result = this._context.Users.Select(user => new
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                BirthDate = user.BirthDate,
                Email = user.Email
            }).Where(user => user.Id == id);      
            
            return result;
        }
        
        [HttpGet("getdata/{id}")]
        public IActionResult GetData(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            return new ObjectResult(user);
        }



=======
        [HttpGet("confirmation/{token}")]
        public IActionResult CheckRegisterConfirmationToken(string token)
        {
            //Check if confirmation token exists && that token is not turned in yet
            ConfirmationMail result = _context.ConfirmationMails.FirstOrDefault(cMail => cMail.ConfirmationToken == token && cMail.AccountStatus == 0);
            if (result != null)
            {
                result.AccountStatus = 1;
                _context.SaveChanges();

                return new OkObjectResult(true);
            }
            
            return new OkObjectResult(false);
        }

>>>>>>> 4be5a797de42c8a2ef13954836fe9a79b05ad01e
		[HttpPost]
        public IActionResult Post([FromBody]UserAddress u)//Check of email al bestaat, Kijk hoe je email kan versturen (Smtp client)
        {
            if (u != null)
            {
                string confirmationTokenGuid = Guid.NewGuid().ToString();

                var emailAlreadyExists = _context.Users.Any(user => user.Email.ToLower() == u.User.Email.ToLower());
                if (!emailAlreadyExists)
                {
                    StringBuilder sb = new StringBuilder();
                    sb.Append("<html><head><title>Confirmation mail:</title></head><body>");
                    sb.Append("<p>TO: " + u.User.FirstName + " " + u.User.LastName + "/" + "</p><br/>");

                    sb.Append("<p>Here is the link:</p><br/>");
                    sb.Append("<p>" + "<a href=" + "https://localhost:5001/confirmation/" + confirmationTokenGuid + ""+">" + "Confirmation link" +"</a></p><br/>");  
                    sb.Append("PLEASE DO NOT REPLY TO THIS MESSAGE AS IT IS FROM AN UNATTENDED MAILBOX. ANY REPLIES TO THIS EMAIL WILL NOT BE RESPONDED TO OR FORWARDED. THIS SERVICE IS USED FOR OUTGOING EMAILS ONLY AND CANNOT RESPOND TO INQUIRIES.");

                    SmtpClient SmtpServer = new SmtpClient("smtp.live.com");
                    var mail = new MailMessage();
                    mail.From = new MailAddress("mediamaniawebshop@hotmail.com");
                    mail.To.Add("0946586@hr.nl");
                    mail.Subject = "confirmation mail";
                    mail.IsBodyHtml = true;
                    string htmlBody;
                    htmlBody = "@ Hello! " + u.User.FirstName + "\n your MediaMania account is about to be created, please click the following activation link: \n " + "<a href=\"www.google.com\">login</a>";
                    mail.Body = sb.ToString();
                    SmtpServer.Port = 587;
                    SmtpServer.UseDefaultCredentials = false;
                    SmtpServer.Credentials = new System.Net.NetworkCredential("mediamaniawebshop@hotmail.com", "mediamania1!");
                    SmtpServer.EnableSsl = true;
                    SmtpServer.Send(mail);


                    ConfirmationMail confirmationMail = new ConfirmationMail();
                    confirmationMail.User = u.User;
                    confirmationMail.AccountStatus = 0;// eerst 0, als hij in de mail link klikt dan 1
                    confirmationMail.ConfirmationToken = confirmationTokenGuid;

                    u.User.ConfirmationMail = confirmationMail;

                    u.Current = 1;
                    _context.UserAddresses.Add(u);
                    
                    _context.SaveChanges();
                    
                    return Ok();
                }

                //User already exists

            }
            
            return NoContent();
        }
        
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}