library(dplyr)
library(tidyr)
library(here)
library(readr)
here()
life.expectancy <- read_csv("https://stats.oecd.org/sdmx-json/data/DP_LIVE/.LIFEEXP.../OECD?contentType=csv&detail=code&separator=comma&csv-lang=en")
health.spending <- read_csv("https://stats.oecd.org/sdmx-json/data/DP_LIVE/.HEALTHEXP.../OECD?contentType=csv&detail=code&separator=comma&csv-lang=en")
infant.mortality <- read_csv("https://stats.oecd.org/sdmx-json/data/DP_LIVE/.INFANTMORTALITY.../OECD?contentType=csv&detail=code&separator=comma&csv-lang=en")

life.expectancy.tot <- 
  filter(life.expectancy, SUBJECT == "TOT")

health.spending.tot_pct_gdp <-
  health.spending %>%
  filter(SUBJECT == "TOT", MEASURE == "PC_GDP") %>%
  mutate(INDICATOR = "HEALTHEXP_PC_GDP")

health.spending.tot_usd_cap <- 
  health.spending %>%
  filter(SUBJECT == "TOT", MEASURE == "USD_CAP") %>%
  mutate(INDICATOR = "HEALTHEXP_USD_CAP")

oecd <-
  health.spending.tot_pct_gdp %>%
  bind_rows(health.spending.tot_usd_cap) %>%
  bind_rows(life.expectancy.tot) %>%
  bind_rows(infant.mortality) %>%
  select(LOCATION, TIME, INDICATOR, Value) %>%
  spread(INDICATOR, Value) %>%
  filter(TIME >= 1970, TIME <= 2015)

write.csv(oecd, "data/oecd.csv")
