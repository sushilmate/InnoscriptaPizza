using AutoMapper;
using InnoscriptaPizza.App.ViewModels;
using InnoscriptaPizza.Controllers.ViewModels;
using InnoscriptaPizza.Persistence.Models;

namespace InnoscriptaPizza.App.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Pizza, PizzaViewModel>().ReverseMap();
            CreateMap<OrderDetails, OrderDetailsViewModel>().ReverseMap();
            CreateMap<UserLoginDetails, UserLoginDetailsViewModel>().ReverseMap();

        }
    }
}
