namespace SharedModels
{
    public class DashboardSummary
    {
        public decimal TotalVolume { get; set; }
        public decimal AverageChange { get; set; }
        public int RisingPairs { get; set; }
        public int FallingPairs { get; set; }
    }
}
