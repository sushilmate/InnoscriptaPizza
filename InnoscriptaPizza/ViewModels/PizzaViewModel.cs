namespace InnoscriptaPizza.Controllers.ViewModels
{
    public class PizzaViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public double PriceInEur { get; set; }
        public string Type { get; set; }
        public int Quantity { get; set; }
    }
}