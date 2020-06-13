using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using InnoscriptaPizza.App.ViewModels;
using InnoscriptaPizza.Persistence.Models;
using InnoscriptaPizza.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InnoscriptaPizza.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly IOrderDetailsRepostiory _orderDetailsRepostiory;
        private readonly IMapper _mapper;
        private readonly ILogger<OrderDetailsController> _logger;

        public OrderDetailsController(IOrderDetailsRepostiory orderDetailsRepostiory, IMapper mapper, ILogger<OrderDetailsController> logger)
        {
            _orderDetailsRepostiory = orderDetailsRepostiory;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost]
        public async Task<bool> Post(OrderDetailsViewModel orderDetails)
        {
            _logger.LogInformation("Order details controller post method called.");

            var result = await _orderDetailsRepostiory.Create(_mapper.Map<OrderDetails>(orderDetails));

            return result;
        }

        [HttpGet("{userName}")]
        public async Task<IEnumerable<OrderDetailsViewModel>> Get(string userName)
        {
            var result = await _orderDetailsRepostiory.Get(userName);
            return _mapper.Map<IEnumerable<OrderDetailsViewModel>>(result);
        }
    }
}
