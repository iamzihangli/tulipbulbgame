# Tulip Bulb Game

An investment game built around the historical Tulip Mania bubble (Amsterdam, 1634–1637). Buy bulbs, ride the rise, and try to sell before the crash.

## Versions

- **v1** — [`index.html`](./index.html): the original proof-of-concept. 10 fixed rounds, hardcoded price path, single Hold/Sell decision.
- **v2** — [`v2/index.html`](./v2/index.html): rewritten with full Buy/Sell/Hold trading at any quantity, a randomized 10–15-round hidden horizon, and a tulip-mania-shaped price path (slow rise → mania → crash → small plateau). Includes a debrief comparing your run against "sold at peak", "held to end", and "never invested" counterfactuals.

## Running

Both versions are static HTML — open the file directly in a browser. No build step.

## Reference

[Tulip mania on Wikipedia](https://en.wikipedia.org/wiki/Tulip_mania) · [Price index chart](https://en.wikipedia.org/wiki/File:Tulip_price_index1.svg)
