using InnoscriptaPizza.Persistence.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InnoscriptaPizza.Persistence.Repositories
{
    public interface IOrderDetailsRepostiory
    {
        Task<bool> Create(OrderDetails orderDetails);
        Task<IEnumerable<OrderDetails>> Get(string userName);
    }
}