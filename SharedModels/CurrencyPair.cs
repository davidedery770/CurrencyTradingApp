namespace SharedModels
{
    public class CurrencyPair
    {
        public int Id { get; set; }
        public string BaseCurrencyAbbr { get; set; } // USD
        public string QuoteCurrencyAbbr { get; set; } // JPY
        public string PairName { get; set; } // USD/JPY (לדוגמה)
        public decimal CurrentRate { get; set; }
        public decimal MinValue { get; set; }
        public decimal MaxValue { get; set; }
        public decimal InitialRate { get; set; } // לחישוב שינוי באחוזים
        public decimal Volume { get; set; }
        public DateTime LastUpdate { get; set; }
        public TradeTrend Trend { get; set; } // Enum: Up, Down, Neutral
        public decimal ChangePercentage { get; set; } // שינוי באחוזים
    }

   
}
