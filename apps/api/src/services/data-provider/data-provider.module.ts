import { ConfigurationModule } from '@ghostfolio/api/services/configuration.module';
import { CryptocurrencyModule } from '@ghostfolio/api/services/cryptocurrency/cryptocurrency.module';
import { AlphaVantageService } from '@ghostfolio/api/services/data-provider/alpha-vantage/alpha-vantage.service';
import { CoinGeckoService } from '@ghostfolio/api/services/data-provider/coingecko/coingecko.service';
import { EodHistoricalDataService } from '@ghostfolio/api/services/data-provider/eod-historical-data/eod-historical-data.service';
import { GoogleSheetsService } from '@ghostfolio/api/services/data-provider/google-sheets/google-sheets.service';
import { ManualService } from '@ghostfolio/api/services/data-provider/manual/manual.service';
import { RapidApiService } from '@ghostfolio/api/services/data-provider/rapid-api/rapid-api.service';
import { YahooFinanceService } from '@ghostfolio/api/services/data-provider/yahoo-finance/yahoo-finance.service';
import { PrismaModule } from '@ghostfolio/api/services/prisma.module';
import { SymbolProfileModule } from '@ghostfolio/api/services/symbol-profile.module';
import { Module } from '@nestjs/common';

import { DataEnhancerModule } from './data-enhancer/data-enhancer.module';
import { YahooFinanceDataEnhancerService } from './data-enhancer/yahoo-finance/yahoo-finance.service';
import { DataProviderService } from './data-provider.service';

@Module({
  imports: [
    ConfigurationModule,
    CryptocurrencyModule,
    DataEnhancerModule,
    PrismaModule,
    SymbolProfileModule
  ],
  providers: [
    AlphaVantageService,
    CoinGeckoService,
    DataProviderService,
    EodHistoricalDataService,
    GoogleSheetsService,
    ManualService,
    RapidApiService,
    YahooFinanceService,
    {
      inject: [
        AlphaVantageService,
        CoinGeckoService,
        EodHistoricalDataService,
        GoogleSheetsService,
        ManualService,
        RapidApiService,
        YahooFinanceService
      ],
      provide: 'DataProviderInterfaces',
      useFactory: (
        alphaVantageService,
        coinGeckoService,
        eodHistoricalDataService,
        googleSheetsService,
        manualService,
        rapidApiService,
        yahooFinanceService
      ) => [
        alphaVantageService,
        coinGeckoService,
        eodHistoricalDataService,
        googleSheetsService,
        manualService,
        rapidApiService,
        yahooFinanceService
      ]
    },
    YahooFinanceDataEnhancerService
  ],
  exports: [DataProviderService, YahooFinanceService]
})
export class DataProviderModule {}
