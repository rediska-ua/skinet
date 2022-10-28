using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    private readonly StoreContext _context;

    public BuggyController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet("notfound")]
    public ActionResult GetNotFoundRequest()
    {
        var thing = _context.Products.Find(43);


        if (thing == null)
        {
            return NotFound(new ApiResponse(404));
        }
        return Ok();
    }

    [HttpGet("servererror")]
    public ActionResult GetServerErrorRequest()
    {
        var thing = _context.Products.Find(43);

        try
        {
            var thingToString = thing.ToString();
        } 
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(500);
        }

        return Ok();
    }

    [HttpGet("badrequest")]
    public ActionResult GetBadRequest()
    {

        return BadRequest(new ApiResponse(400));
    }

    [HttpGet("badrequest/{id}")]
    public ActionResult GetBadRequestWithId(int id)
    {
        return Ok();
    }
}
