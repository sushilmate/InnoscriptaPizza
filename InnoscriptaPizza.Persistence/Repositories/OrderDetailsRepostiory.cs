using InnoscriptaPizza.Persistence.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace InnoscriptaPizza.Persistence.Repositories
{
    public class OrderDetailsRepostiory : IOrderDetailsRepostiory
    {
        private readonly InnoscriptaPizzaDBContext dbContext;

        public OrderDetailsRepostiory(InnoscriptaPizzaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<bool> Create(OrderDetails orderDetails)
        {
            try
            {
                dbContext.OrderDetails.Add(orderDetails);
                await dbContext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // log & handle exception.
                return false;
            }
        }

        public async Task<IEnumerable<OrderDetails>> Get(string userName)
        {
            return await dbContext.OrderDetails.Where(x => x.UserName == userName).ToListAsync();
        }

        public async Task<List<OrderDetails>> GetAll()
        {
            return await dbContext.OrderDetails.ToListAsync();
        }
    }
}

