using Microsoft.AspNetCore.Mvc;
using SharedModels; // ודאו שהפרויקט UILayer מפנה ל-SharedModels
using System.Diagnostics;
using UILayer.Models;

namespace UILayer.Controllers
{
    public class HomeController : Controller
    {
        // נתונים מדומה לצורך UI בלבד
        private DashboardData GetMockDashboardData()
        {
            return new DashboardData
            {
                Summary = new DashboardSummary
                {
                    TotalVolume = 4253743,
                    AverageChange = -0.58m,
                    RisingPairs = 1,
                    FallingPairs = 2
                },
                CurrencyPairs = new List<CurrencyPair>
                {
                    new CurrencyPair
                    {
                        Id = 1,
                        PairName = "USD/JPY",
                        BaseCurrencyAbbr = "USD",
                        QuoteCurrencyAbbr = "JPY",
                        CurrentRate = 151.3337m,
                        MinValue = 148.7500m,
                        MaxValue = 151.3337m,
                        InitialRate = 149.0000m,
                        Volume = 2041805,
                        LastUpdate = DateTime.Now.AddSeconds(-30),
                        ChangePercentage = 1.74m,
                        Trend = TradeTrend.Up
                    },
                    new CurrencyPair
                    {
                        Id = 2,
                        PairName = "USD/EUR",
                        BaseCurrencyAbbr = "USD",
                        QuoteCurrencyAbbr = "EUR",
                        CurrentRate = 0.8291m,
                        MinValue = 0.8291m,
                        MaxValue = 0.8456m,
                        InitialRate = 0.8450m,
                        Volume = 1207179,
                        LastUpdate = DateTime.Now.AddSeconds(-20),
                        ChangePercentage = -1.95m,
                        Trend = TradeTrend.Down
                    },
                    new CurrencyPair
                    {
                        Id = 3,
                        PairName = "GBP/USD",
                        BaseCurrencyAbbr = "GBP",
                        QuoteCurrencyAbbr = "USD",
                        CurrentRate = 1.2485m,
                        MinValue = 1.2485m,
                        MaxValue = 1.2678m,
                        InitialRate = 1.2600m,
                        Volume = 1004759,
                        LastUpdate = DateTime.Now.AddSeconds(-10),
                        ChangePercentage = -1.52m,
                        Trend = TradeTrend.Down
                    }
                }
            };
        }

        public IActionResult Index()
        {
            // העברת הנתונים המדומים ל-View
            return View(GetMockDashboardData());
        }

        // זה יישאר כפי שהוא, לצורך טיפול בשגיאות
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}