using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedModels
{
    public class DashboardData
    {
        public DashboardSummary Summary { get; set; }
        public List<CurrencyPair> CurrencyPairs { get; set; }
    }
}
