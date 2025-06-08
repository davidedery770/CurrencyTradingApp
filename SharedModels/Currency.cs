namespace SharedModels
{
    public class Currency
    {
        public int Id { get; set; }
        public string Country { get; set; }
        public string Name { get; set; }
        public string Abbreviation { get; set; } // USD, EUR, ILS
    }
}
