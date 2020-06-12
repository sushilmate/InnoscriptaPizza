using InnoscriptaPizza.Persistence.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InnoscriptaPizza.Persistence.Repositories
{
    public class PizzaRepository : IPizzaRepository
    {
        private readonly InnoscriptaPizzaDBContext dbContext;

        public PizzaRepository(InnoscriptaPizzaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Pizza>> GetAll()
        {
            return await dbContext.Pizza.ToListAsync();
        }
    }
}
