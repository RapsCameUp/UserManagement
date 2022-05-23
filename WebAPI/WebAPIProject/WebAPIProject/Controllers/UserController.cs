using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIProject.Models;

namespace WebAPIProject.Controllers
{
   [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly WebAPIProject.DataContext.DataContext db_context;
        public UserController(WebAPIProject.DataContext.DataContext db_context)
        {
            this.db_context = db_context;
        }

        // get a list of all the users
        [HttpGet]
       public async Task<IActionResult> GetAllUsers()
        {
            var users = await db_context.Users.ToListAsync();
            return Ok(users);
        }

        // get a single user by id

        [HttpGet]
        [Route("{ID:guid}")]
        [ActionName("GetUser")]
        public async Task<IActionResult> GetUser([FromRoute] Guid ID)
        {
            var user = await db_context.Users.FirstOrDefaultAsync(x => x.ID == ID);
            if(user != null)
            {
                return Ok(user);
            }
            return NotFound("Not Found");
        }

        [Route("UserLogin/{email}/{password}")]
        [HttpGet]
        public async Task<IActionResult> UserLogin(string email, string password)
        {
            var user = await db_context.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return Ok(user);
            }
            return NotFound("Not Found");
        }

        // adding a new user
        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] User user)
        {
            user.ID = Guid.NewGuid();
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            await db_context.Users.AddAsync(user);
            await db_context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser),new { ID = user.ID },user);

        }

        // updating a user
        [HttpPut]
        [Route("{ID:guid}")]
        public async Task<IActionResult> updateUser([FromRoute] Guid ID, [FromBody] User user)
        {
            var get_user = await db_context.Users.FirstOrDefaultAsync(x => x.ID == ID);
            if(get_user != null)
            {
                get_user.FirstName = user.FirstName;
                get_user.LastName = user.LastName;
                get_user.DateOfBirth = user.DateOfBirth;
                get_user.Status = user.Status;
                get_user.Image = user.Image;
                get_user.PhoneNumbers = user.PhoneNumbers;
                get_user.DateAdded = user.DateAdded;
                await db_context.SaveChangesAsync();
                return Ok(get_user);
            }
            else
            {
                return NotFound("Not Found");
            }
        }

        [HttpDelete]
        [Route("{ID:guid}")]
        public async Task<IActionResult> DeleteUser([FromRoute] Guid ID)
        {
            var get_user = await db_context.Users.FirstOrDefaultAsync(x => x.ID == ID);
            if(get_user != null)
            {
                db_context.Users.Remove(get_user);
                await db_context.SaveChangesAsync();
                return Ok(get_user);
            }
            else
            {
                return NotFound("Not Found");
            }
        }
    }
}
