using AutoMapper;
using InnoscriptaPizza.Controllers.ViewModels;
using InnoscriptaPizza.Persistence.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InnoscriptaPizza.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PizzaController : ControllerBase
    {
        private readonly IPizzaRepository _pizzaRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<PizzaController> _logger;

        public PizzaController(IPizzaRepository pizzaRepository, IMapper mapper, ILogger<PizzaController> logger)
        {
            _pizzaRepository = pizzaRepository;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<PizzaViewModel>> Get()
        {
            _logger.LogInformation("Pizza controller get method called.");

            var pizzas = await _pizzaRepository.GetAll();
            return _mapper.Map<IEnumerable<PizzaViewModel>>(pizzas);
        }
    }
}
