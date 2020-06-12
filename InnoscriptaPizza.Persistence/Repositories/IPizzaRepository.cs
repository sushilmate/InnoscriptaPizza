using InnoscriptaPizza.Persistence.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InnoscriptaPizza.Persistence.Repositories
{
    public interface IPizzaRepository
    {
        Task<List<Pizza>> GetAll();
    }
}