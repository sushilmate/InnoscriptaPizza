using System;

namespace InnoscriptaPizza.App.ViewModels
{
    public class OrderDetailsViewModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string OrderDescription { get; set; }
        public string UserName { get; set; }
        public string Status { get; set; }
        public double AmountPaid { get; set; }
    }
}
