(function () {
    'use strict';

    // ---------------------------------------------------------------
    // Constants
    // ---------------------------------------------------------------
    const STARTING_CASH = 1000;
    const STARTING_PRICE = 5;
    const TRUE_VALUE = 10;
    const MIN_ROUNDS = 10;
    const MAX_ROUNDS = 15;
    const INFLATION_PER_ROUND = 0.05; // 5% per season — visible over 10–15 seasons

    // ---------------------------------------------------------------
    // Scenarios — each historical bubble. Game mechanics are identical
    // across scenarios; only flavor and historical context differ.
    // ---------------------------------------------------------------
    const SCENARIOS = [
        {
            id: 'tulip',
            name: 'Tulip Mania',
            year: '1634–1637',
            emoji: '🌷',
            currency: '$',
            tagline: 'Amsterdam, 1634. Bulbs sell for $5 apiece. The market is calm — for now.',
            note: 'A grower will tell you the <em>true value</em> of a single tulip bulb is about <strong>$10</strong>. Any price above that is speculation.',
            priceLabel: 'Bulb Price',
            heldLabel: 'Bulbs',
            historyTitle: 'Tulip Mania — Dutch Republic, 1637',
            facts: [
                'Tulips reached the Dutch Republic in the late 1500s. Rare striped varieties like the <em>Semper Augustus</em> became status symbols among wealthy merchants.',
                'Between November 1636 and February 1637, the price of common tulip bulbs rose roughly 20× in a single sudden spike, then doubled again over the following weeks.',
                'At the peak, one Semper Augustus bulb traded for the value of a canal-side townhouse in Amsterdam — more than ten years of a skilled craftsman\'s wages.',
                'On February 3, 1637, an auction in Haarlem failed to find buyers. Within a week prices were 90% off; by May they were near zero. Most traders had only owned futures contracts — they never held the bulbs.'
            ],
            wikiUrl: 'https://en.wikipedia.org/wiki/Tulip_mania'
        },
        {
            id: 'south_sea',
            name: 'The South Sea Bubble',
            year: '1720',
            emoji: '⚓',
            currency: '£',
            tagline: 'London, January 1720. South Sea Company shares trade at £5 each. The company promises riches from South American trade.',
            note: 'Sober pamphleteers warn the company\'s actual earnings justify perhaps <strong>£10</strong> per share. Everyone else is buying anyway.',
            priceLabel: 'Share Price',
            heldLabel: 'Shares',
            historyTitle: 'The South Sea Bubble — London, 1720',
            facts: [
                'The South Sea Company was granted a monopoly on trade with Spanish South America in 1711 — but Spain was at war with Britain and almost no real trade ever occurred.',
                'In 1720 the company offered to take over British government debt in exchange for stock. Speculation drove the shares from ~£100 in January to ~£1,000 by August.',
                'Sir Isaac Newton lost roughly £20,000 (worth millions in today\'s money). He reportedly remarked: "I can calculate the motions of the heavenly bodies, but not the madness of people."',
                'When the bubble burst in September, shares collapsed back to near their starting value. The fallout led to Britain\'s first major financial regulation and a parliamentary inquiry that jailed several company directors.'
            ],
            wikiUrl: 'https://en.wikipedia.org/wiki/South_Sea_Company'
        },
        {
            id: 'florida_land',
            name: 'The Florida Land Boom',
            year: '1925–1926',
            emoji: '🏝️',
            currency: '$',
            tagline: 'Miami, 1925. A small lot in a planned subdivision costs $5 per share. Northern investors are flooding in by train.',
            note: 'Local surveyors say a fair price for these lots — once drained — is around <strong>$10</strong>. The brochures don\'t mention the swamps.',
            priceLabel: 'Lot Price',
            heldLabel: 'Lots',
            historyTitle: 'The Florida Land Boom — Miami, 1926',
            facts: [
                'After WWI, mass-produced cars and new highways made Florida accessible. "Binders" — tiny down-payments on land — let buyers flip deeds before fully paying for them.',
                'Prices in some Miami subdivisions rose 10× in 1925 alone. Lots were sometimes resold three times in a single day, with each buyer pocketing a profit.',
                'The crash began in 1926: railroads embargoed Florida freight (too much demand), the IRS started auditing flip profits, and the Great Miami Hurricane killed hundreds and destroyed billions in property.',
                'The collapse contributed to a wave of Southern bank failures and is often cited as a leading indicator of the 1929 stock market crash.'
            ],
            wikiUrl: 'https://en.wikipedia.org/wiki/Florida_land_boom_of_the_1920s'
        },
        {
            id: 'dotcom',
            name: 'The Dot-com Bubble',
            year: '1995–2000',
            emoji: '💻',
            currency: '$',
            tagline: 'San Francisco, 1998. A pet-supplies-online startup lists on NASDAQ at $5 a share. Anything with ".com" in the name is going up.',
            note: 'Old-fashioned analysts using P/E ratios figure these shares are worth perhaps <strong>$10</strong>. The new metric is "eyeballs", and eyeballs only go up.',
            priceLabel: 'Share Price',
            heldLabel: 'Shares',
            historyTitle: 'The Dot-com Bubble — NASDAQ, 2000',
            facts: [
                'The NASDAQ Composite index rose from ~1,000 in 1995 to a peak of 5,048 on March 10, 2000 — a 5× rise in five years.',
                'Many companies (Pets.com, Webvan, Boo.com, eToys) had no profits and minimal revenue, but achieved billion-dollar valuations on the strength of user growth and TV ads.',
                'By October 2002 the NASDAQ had lost ~78% of its peak value. It would not regain its 2000 high until 2015 — 15 years later.',
                'Some survivors — Amazon, eBay, Priceline, Google (IPO\'d 2004) — went on to become among the largest companies in the world. Picking the survivors in 2000 was much harder than it looks in retrospect.'
            ],
            wikiUrl: 'https://en.wikipedia.org/wiki/Dot-com_bubble'
        },
        {
            id: 'crypto',
            name: 'The Crypto Mania',
            year: '2020–2022',
            emoji: '🪙',
            currency: '$',
            tagline: '2020. A meme coin trades at $5. Influencers, athletes, and your cousin Mike are all promoting it on Twitter and TikTok.',
            note: 'On-chain analysts can\'t find a real use case beyond tipping and speculation. They guess a generous fair value is <strong>$10</strong>. The price is set by hype anyway.',
            priceLabel: 'Coin Price',
            heldLabel: 'Coins',
            historyTitle: 'The 2021 Crypto Mania',
            facts: [
                'Bitcoin rose from ~$7,000 in early 2020 to ~$69,000 in November 2021 — a 10× increase in under two years. Dogecoin, created as a joke, rose roughly 12,000% in five months in 2021.',
                'Celebrities including Matt Damon, Larry David, and LeBron James appeared in Super Bowl ads telling viewers "fortune favors the brave" and that crypto was the future of money.',
                'In 2022, the TerraUSD "stablecoin" de-pegged and collapsed, the FTX exchange filed for bankruptcy after $8B in customer funds went missing, and major lenders (Celsius, Voyager, BlockFi) went under. The total crypto market cap fell ~70%.',
                'Many products pitched at the peak — NFT profile pictures, "Web3" social networks, the metaverse, play-to-earn games — quietly disappeared. Some core technologies (stablecoins, decentralized exchanges) survived in narrower forms.'
            ],
            wikiUrl: 'https://en.wikipedia.org/wiki/Cryptocurrency_bubble'
        }
    ];

    // ---------------------------------------------------------------
    // AI reflection — shown after every game. NVDA data is
    // approximate quarterly close, USD, split-adjusted.
    // ---------------------------------------------------------------
    const AI_REFLECTION = {
        intro: 'You\'ve just lived through one of these. The shape — long calm, sudden spike, peak, slow erosion, sudden crash — has appeared in nearly every bubble across four centuries. Right now, in 2025–2026, similar patterns are appearing in the market for AI-related companies.',
        bullets: [
            'NVIDIA, which makes the dominant AI training chips, went from around $15 per share in late 2022 to over $130 by late 2024 — roughly a 10× rise in two years. Its market capitalization briefly exceeded $3 trillion, making it the most valuable public company in the world.',
            'OpenAI raised funding at an $80 billion valuation in early 2024, $157 billion in October 2024, and reportedly around $300 billion in mid-2025. Anthropic raised at $60 billion in early 2025.',
            'Microsoft, Google, Amazon, and Meta collectively committed over $300 billion in AI infrastructure spending for 2025 alone — chips, data centers, power purchase agreements.',
            'Skeptics point to: AI products that lose money on every query, "circular" financing where AI labs spend their funding at their cloud providers (who are also their investors), looming energy and chip shortages, and revenue lagging far behind valuations. Boosters argue productivity gains will eventually catch up.'
        ],
        // Approximate quarterly close, NVDA, USD (split-adjusted).
        // Rounded for teaching purposes; not investment data.
        nvdaSeries: [
            { q: 'Q1 ’22', price: 27 },
            { q: 'Q2 ’22', price: 15 },
            { q: 'Q3 ’22', price: 12 },
            { q: 'Q4 ’22', price: 15 },
            { q: 'Q1 ’23', price: 28 },
            { q: 'Q2 ’23', price: 42 },
            { q: 'Q3 ’23', price: 43 },
            { q: 'Q4 ’23', price: 50 },
            { q: 'Q1 ’24', price: 90 },
            { q: 'Q2 ’24', price: 123 },
            { q: 'Q3 ’24', price: 121 },
            { q: 'Q4 ’24', price: 135 },
            { q: 'Q1 ’25', price: 110 },
            { q: 'Q2 ’25', price: 158 },
            { q: 'Q3 ’25', price: 178 },
            { q: 'Q4 ’25', price: 172 }
        ],
        question: 'What do you think about the AI trend? Do you think we are in a bubble right now? Looking at the game you just played and the NVIDIA chart above, what would you have done with your investment decisions today?'
    };

    // ---------------------------------------------------------------
    // State
    // ---------------------------------------------------------------
    let scenario = SCENARIOS[0];
    let state = null;
    let chart = null;
    let nvdaChart = null;

    // ---------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------
    function randInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function fmtMoney(x) {
        return scenario.currency + x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // Inflation factor from season 1 to season `round`. Season 1 = 1.
    function inflationFactor(round) {
        return Math.pow(1 + INFLATION_PER_ROUND, round - 1);
    }

    // ---------------------------------------------------------------
    // Price generation — mimics the historical Tulip Mania chart:
    // (1) flat baseline (2–3 rounds), (2) one dramatic spike,
    // (3) steady continued rise, (4) peak plateau, (5) mild decline,
    // (6) steep decline, (7) total crash, (8) post-crash plateau.
    // ---------------------------------------------------------------
    // Dispatcher: most games are single-peak (tulip-mania shape); ~30% of
    // longer games show a double-peak / dead-cat-bounce pattern (e.g., Bitcoin
    // 2017→2021, 1929 Wall Street rally-then-crash, gold 1980).
    // Tulip Mania itself is forced single-peak — the historical 1636–37 chart
    // shows one clean peak, not a double top.
    function generatePricePath(N, startPrice) {
        const allowDoublePeak = scenario.id !== 'tulip';
        if (allowDoublePeak && N >= 12 && Math.random() < 0.30) {
            const dp = generateDoublePeakPath(N, startPrice);
            if (dp) return dp;
        }
        return generateSinglePeakPath(N, startPrice);
    }

    function generateSinglePeakPath(N, startPrice) {
        const path = [startPrice];
        const flatRounds = 2 + Math.floor(Math.random() * 2);          // 2 or 3
        const spikeIndex = flatRounds;
        const minPeakIdx = Math.max(spikeIndex + 2, Math.floor(N * 0.45));
        const maxPeakIdx = N - 5;
        const peakIndex = (maxPeakIdx >= minPeakIdx)
            ? minPeakIdx + Math.floor(Math.random() * (maxPeakIdx - minPeakIdx + 1))
            : maxPeakIdx;
        const mildIndex  = peakIndex + 1;
        const steepIndex = peakIndex + 2;
        const crashIndex = peakIndex + 3;

        for (let i = 1; i < N; i++) {
            let value;
            if (i < spikeIndex)         value = path[i - 1] * (0.95 + Math.random() * 0.20);
            else if (i === spikeIndex)  value = path[i - 1] * (8    + Math.random() * 8);
            else if (i < peakIndex)     value = path[i - 1] * (1.10 + Math.random() * 0.30);
            else if (i === peakIndex)   value = path[i - 1] * (0.98 + Math.random() * 0.12);
            else if (i === mildIndex)   value = path[i - 1] * (0.78 + Math.random() * 0.10);
            else if (i === steepIndex)  value = path[i - 1] * (0.55 + Math.random() * 0.15);
            else if (i === crashIndex)  value = path[i - 1] * (0.08 + Math.random() * 0.10);
            else                        value = 0.05 + Math.random() * 0.10;
            path.push(value);
        }
        return path.map(p => Math.round(p * 100) / 100);
    }

    // Double-peak: flat → spike → rise1 → peak1 → dip → rise2 → peak2 →
    // decline → crash → wipeout. Requires N ≥ 12.
    function generateDoublePeakPath(N, startPrice) {
        const flatRounds = 2 + Math.floor(Math.random() * 2);          // 2 or 3
        const spikeIndex = flatRounds;
        // Fixed phases after spike: peak1, dip, peak2, decline, crash = 5
        // Plus spike itself = 6 fixed. Need ≥ 2 rise rounds + ≥ 1 wipeout.
        const afterFlat = N - flatRounds;
        const fixedAfterFlat = 6;
        const variableNeeded = afterFlat - fixedAfterFlat;
        if (variableNeeded < 3) return null; // not long enough

        const wipeoutRounds = 1;
        const totalRise = variableNeeded - wipeoutRounds;
        const rise1Rounds = 1 + Math.floor(Math.random() * (totalRise - 1));
        const rise2Rounds = totalRise - rise1Rounds;

        const peak1Index   = spikeIndex + rise1Rounds + 1;
        const dipIndex     = peak1Index + 1;
        const peak2Index   = dipIndex + rise2Rounds + 1;
        const declineIndex = peak2Index + 1;
        const crashIndex   = declineIndex + 1;

        const path = [startPrice];
        for (let i = 1; i < N; i++) {
            let value;
            if (i < spikeIndex)          value = path[i - 1] * (0.95 + Math.random() * 0.20);
            else if (i === spikeIndex)   value = path[i - 1] * (8    + Math.random() * 8);
            else if (i < peak1Index)     value = path[i - 1] * (1.10 + Math.random() * 0.30);   // rise to peak 1
            else if (i === peak1Index)   value = path[i - 1] * (0.98 + Math.random() * 0.12);
            else if (i === dipIndex)     value = path[i - 1] * (0.55 + Math.random() * 0.20);   // dead-cat dip
            else if (i < peak2Index)     value = path[i - 1] * (1.10 + Math.random() * 0.30);   // rally to peak 2
            else if (i === peak2Index)   value = path[i - 1] * (0.98 + Math.random() * 0.12);
            else if (i === declineIndex) value = path[i - 1] * (0.65 + Math.random() * 0.15);
            else if (i === crashIndex)   value = path[i - 1] * (0.10 + Math.random() * 0.10);
            else                         value = 0.05 + Math.random() * 0.10;
            path.push(value);
        }
        return path.map(p => Math.round(p * 100) / 100);
    }

    // ---------------------------------------------------------------
    // Scenario application
    // ---------------------------------------------------------------
    function getSelectedScenario() {
        const sel = document.getElementById('scenario-select').value;
        if (sel === 'random') {
            return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
        }
        return SCENARIOS.find(s => s.id === sel) || SCENARIOS[0];
    }

    function applyScenario(s) {
        scenario = s;
        document.getElementById('hero-title').innerHTML =
            `${s.emoji} ${s.name} <span class="version">v2</span>`;
        document.getElementById('hero-tagline').textContent = s.tagline;
        document.getElementById('hero-note').innerHTML =
            `<strong>Note:</strong> ${s.note}`;
        document.getElementById('stat-price-label').textContent = s.priceLabel;
        document.getElementById('stat-held-label').textContent = s.heldLabel;
        if (chart) {
            chart.data.datasets[0].label = s.priceLabel;
            chart.update();
        }
    }

    // ---------------------------------------------------------------
    // Game state
    // ---------------------------------------------------------------
    function initState() {
        const totalRounds = randInt(MIN_ROUNDS, MAX_ROUNDS);
        state = {
            totalRounds,
            pricePath: generatePricePath(totalRounds, STARTING_PRICE),
            round: 1,
            cash: STARTING_CASH,
            bulbs: 0,
            actionLog: [],
            // portfolioByRound[k-1] = portfolio value at the moment season k's price is revealed
            portfolioByRound: [STARTING_CASH],
        };
    }

    function currentPrice() { return state.pricePath[state.round - 1]; }
    function portfolioValue() { return state.cash + state.bulbs * currentPrice(); }
    function maxBuyable() { return Math.floor(state.cash / currentPrice()); }

    // ---------------------------------------------------------------
    // Single chart with all three lines on the same INDEXED scale
    // (each starts at 100 in Season 1). This lets the student directly
    // compare price arc, portfolio arc, and inflation baseline without
    // unit/scale mismatch.
    // ---------------------------------------------------------------
    function setupChart() {
        const ctx = document.getElementById('chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Season 1'],
                datasets: [
                    {
                        label: scenario.priceLabel,
                        data: [100],
                        borderColor: '#c0392b',
                        backgroundColor: 'rgba(192, 57, 43, 0.10)',
                        fill: true,
                        tension: 0.25,
                        pointRadius: 3,
                        pointBackgroundColor: '#c0392b',
                    },
                    {
                        label: 'Your Portfolio',
                        data: [100],
                        borderColor: '#b8860b',
                        backgroundColor: 'transparent',
                        borderDash: [6, 4],
                        fill: false,
                        tension: 0.25,
                        pointRadius: 3,
                        pointBackgroundColor: '#b8860b',
                    },
                    {
                        label: 'Cash + Inflation (5%/season)',
                        data: [100],
                        borderColor: '#3366cc',
                        backgroundColor: 'transparent',
                        borderDash: [3, 4],
                        fill: false,
                        tension: 0,
                        pointRadius: 0,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: (c) => `${c.dataset.label}: ${c.parsed.y.toFixed(1)} (${(c.parsed.y/100).toFixed(2)}× Season 1)`,
                        },
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: '% of Season 1 value' },
                    },
                },
            },
        });
    }

    function updateChart() {
        const seasonsRevealed = Math.min(state.round, state.totalRounds);
        const labels = [];
        const priceIdx = [];
        const portIdx = [];
        const infIdx = [];
        const startingPrice = state.pricePath[0];

        for (let i = 1; i <= seasonsRevealed; i++) {
            labels.push('Season ' + i);
            priceIdx.push((state.pricePath[i - 1] / startingPrice) * 100);
            portIdx.push((state.portfolioByRound[i - 1] / STARTING_CASH) * 100);
            infIdx.push(inflationFactor(i) * 100);
        }

        chart.data.labels = labels;
        chart.data.datasets[0].data = priceIdx;
        chart.data.datasets[1].data = portIdx;
        chart.data.datasets[2].data = infIdx;
        chart.update();
    }

    // ---------------------------------------------------------------
    // Rendering
    // ---------------------------------------------------------------
    function renderState() {
        document.getElementById('stat-round').textContent = state.round;
        document.getElementById('stat-price').textContent = fmtMoney(currentPrice());
        document.getElementById('stat-cash').textContent = fmtMoney(state.cash);
        document.getElementById('stat-bulbs').textContent = state.bulbs;
        document.getElementById('stat-portfolio').textContent = fmtMoney(portfolioValue());

        const maxBuy = maxBuyable();
        document.getElementById('qty-hint').textContent =
            `Max buy: ${maxBuy} · Max sell: ${state.bulbs}`;
        document.getElementById('btn-buy').disabled = maxBuy <= 0;
        document.getElementById('btn-sell').disabled = state.bulbs <= 0;

        const qtyInput = document.getElementById('qty');
        const cap = Math.max(maxBuy, state.bulbs, 1);
        qtyInput.max = cap;
        // Default to "max" each round — Buy and Sell handlers cap to their respective limits.
        qtyInput.value = cap;

        renderLog();
        updateChart();
    }

    function renderLog() {
        const log = document.getElementById('log');
        log.innerHTML = '';
        if (state.actionLog.length === 0) {
            const li = document.createElement('li');
            li.innerHTML = '<span style="color: var(--muted);">No decisions yet — the market awaits.</span>';
            log.appendChild(li);
            return;
        }
        const unit = scenario.heldLabel.toLowerCase().replace(/s$/, '');
        for (let i = state.actionLog.length - 1; i >= 0; i--) {
            const a = state.actionLog[i];
            const li = document.createElement('li');
            const tagClass = 'tag tag-' + a.action;
            const label = a.action === 'hold'
                ? 'held'
                : `${a.action === 'buy' ? 'bought' : 'sold'} ${a.qty} ${unit}${a.qty === 1 ? '' : 's'}`;
            li.innerHTML =
                `<span><span class="${tagClass}">${a.action}</span> Season ${a.round}: ${label}</span>` +
                `<span>@ ${fmtMoney(a.price)}</span>`;
            log.appendChild(li);
        }
    }

    // ---------------------------------------------------------------
    // Actions
    // ---------------------------------------------------------------
    function readQty() {
        const n = parseInt(document.getElementById('qty').value, 10);
        if (!Number.isFinite(n) || n < 1) return 0;
        return n;
    }

    function commit(action, qty) {
        state.actionLog.push({ round: state.round, action, qty, price: currentPrice() });
        state.round++;
        if (state.round > state.totalRounds) {
            showDebrief();
        } else {
            state.portfolioByRound.push(state.cash + state.bulbs * currentPrice());
            renderState();
        }
    }

    function handleBuy() {
        const qty = Math.min(readQty(), maxBuyable());
        if (qty <= 0) return;
        state.cash -= qty * currentPrice();
        state.bulbs += qty;
        commit('buy', qty);
    }

    function handleSell() {
        const qty = Math.min(readQty(), state.bulbs);
        if (qty <= 0) return;
        state.cash += qty * currentPrice();
        state.bulbs -= qty;
        commit('sell', qty);
    }

    function handleHold() { commit('hold', 0); }

    // ---------------------------------------------------------------
    // Debrief
    // ---------------------------------------------------------------
    function counterfactuals() {
        const path = state.pricePath;
        let peakIdx = 0;
        for (let i = 1; i < path.length; i++) {
            if (path[i] > path[peakIdx]) peakIdx = i;
        }
        const startPrice = path[0];
        const peakPrice = path[peakIdx];
        const endPrice = path[path.length - 1];
        const startingBulbs = Math.floor(STARTING_CASH / startPrice);
        const leftoverCash = STARTING_CASH - startingBulbs * startPrice;
        return {
            peakRound: peakIdx + 1,
            peakPrice,
            endPrice,
            soldAtPeak: leftoverCash + startingBulbs * peakPrice,
            heldToEnd: leftoverCash + startingBulbs * endPrice,
            stayedInCash: STARTING_CASH,
        };
    }

    function card(kind, label, value) {
        const div = document.createElement('div');
        div.className = 'debrief-card ' + kind;
        div.innerHTML = `<span class="label">${label}</span><span class="value">${value}</span>`;
        return div;
    }

    function showDebrief() {
        document.getElementById('actions').classList.add('hidden');
        document.getElementById('debrief-screen').classList.remove('hidden');

        const finalPrice = state.pricePath[state.pricePath.length - 1];
        const finalWealth = state.cash + state.bulbs * finalPrice;
        const cf = counterfactuals();

        // Re-render stats to reflect the LAST round (no renderState fires after the final action).
        document.getElementById('stat-round').textContent = state.totalRounds;
        document.getElementById('stat-price').textContent = fmtMoney(finalPrice);
        document.getElementById('stat-cash').textContent = fmtMoney(state.cash);
        document.getElementById('stat-bulbs').textContent = state.bulbs;
        document.getElementById('stat-portfolio').textContent = fmtMoney(finalWealth);
        renderLog();

        const profit = finalWealth - STARTING_CASH;
        const profitTxt = profit >= 0
            ? `a gain of ${fmtMoney(profit)}`
            : `a loss of ${fmtMoney(-profit)}`;

        document.getElementById('debrief-title').textContent =
            profit > 50 ? 'You read the market.' :
            profit >= 0 ? 'You broke even.' :
            'The bubble has burst.';

        document.getElementById('debrief-summary').innerHTML =
            `The game lasted <strong>${state.totalRounds} seasons</strong>. ` +
            `You finished with <strong>${fmtMoney(finalWealth)}</strong> — ${profitTxt} from your starting ${fmtMoney(STARTING_CASH)}. ` +
            `The peak was <strong>${fmtMoney(cf.peakPrice)}</strong> in season ${cf.peakRound}; ` +
            `the final price was <strong>${fmtMoney(cf.endPrice)}</strong>.`;

        const stats = document.getElementById('debrief-stats');
        stats.innerHTML = '';
        stats.appendChild(card('you',    'Your Final Wealth',          fmtMoney(finalWealth)));
        stats.appendChild(card('peak',   'If You\'d Sold At The Peak', fmtMoney(cf.soldAtPeak)));
        stats.appendChild(card('held',   'If You\'d Held To The End',  fmtMoney(cf.heldToEnd)));
        stats.appendChild(card('cashed', 'If You\'d Never Invested',   fmtMoney(cf.stayedInCash)));

        renderHistoricalContext();
        renderAIReflection();
        renderFvPv(); // populate but keep hidden until user clicks
    }

    function renderFvPv() {
        const totalSeasons = state.totalRounds;
        const seasonsOfInflation = totalSeasons - 1;
        const factor = inflationFactor(totalSeasons);
        const finalPrice = state.pricePath[state.pricePath.length - 1];
        const finalWealth = state.cash + state.bulbs * finalPrice;
        const cf = counterfactuals();
        const ratePct = (INFLATION_PER_ROUND * 100).toFixed(0);

        const rows = [
            ['Your final wealth',          finalWealth],
            ['If sold at peak',            cf.soldAtPeak],
            ['If held to end',             cf.heldToEnd],
            [`If never invested (kept ${fmtMoney(STARTING_CASH)} in cash)`, cf.stayedInCash],
        ];

        // Each $ value is hidden behind a button — click to reveal. Encourages the student
        // to estimate before checking.
        const reveal = (v) => `<button type="button" class="reveal-btn" data-value="${fmtMoney(v)}">Click to reveal</button>`;

        let html =
            `<h3>Future Value vs. Present Value</h3>` +
            `<p class="fvpv-explain">In this game, inflation runs at <strong>${ratePct}% per season</strong>. ` +
            `Over <strong>${seasonsOfInflation} season${seasonsOfInflation === 1 ? '' : 's'}</strong> of inflation ` +
            `(season 1 → season ${totalSeasons}), the price level rises by a factor of ` +
            `<code>(1.${ratePct})<sup>${seasonsOfInflation}</sup> = ${factor.toFixed(3)}</code>. ` +
            `Present Value = Nominal ÷ ${factor.toFixed(3)}.</p>` +
            `<p class="fvpv-hint">Try to estimate each value before clicking to reveal it.</p>` +
            `<table class="fvpv-table">` +
            `<thead><tr><th></th><th>Nominal (FV)</th><th>Present Value (season-1 $)</th></tr></thead>` +
            `<tbody>`;
        for (const [label, nominal] of rows) {
            html += `<tr><td>${label}</td><td>${reveal(nominal)}</td><td>${reveal(nominal / factor)}</td></tr>`;
        }
        html += `</tbody></table>` +
            `<p class="fvpv-note">Even sitting in cash loses purchasing power: ` +
            `${fmtMoney(STARTING_CASH)} in season 1 has only the buying power of ` +
            `${reveal(STARTING_CASH / factor)} by season ${totalSeasons}.</p>`;

        const panel = document.getElementById('fvpv-panel');
        panel.innerHTML = html;
        panel.querySelectorAll('.reveal-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.textContent = btn.dataset.value;
                btn.classList.add('revealed');
                btn.disabled = true;
            });
        });
    }

    function toggleFvPv() {
        const panel = document.getElementById('fvpv-panel');
        const btn = document.getElementById('btn-fvpv');
        const showing = panel.classList.toggle('hidden') === false;
        btn.textContent = showing ? 'Hide FV / PV breakdown' : 'Show FV / PV breakdown';
    }

    function renderHistoricalContext() {
        document.getElementById('history-title').textContent = scenario.historyTitle;
        const ul = document.getElementById('history-facts');
        ul.innerHTML = '';
        scenario.facts.forEach(f => {
            const li = document.createElement('li');
            li.innerHTML = f;
            ul.appendChild(li);
        });
        const a = document.getElementById('history-link');
        a.href = scenario.wikiUrl;
        a.textContent = 'Read more about ' + scenario.name + ' →';
    }

    function renderAIReflection() {
        document.getElementById('ai-intro').textContent = AI_REFLECTION.intro;
        const ul = document.getElementById('ai-bullets');
        ul.innerHTML = '';
        AI_REFLECTION.bullets.forEach(b => {
            const li = document.createElement('li');
            li.textContent = b;
            ul.appendChild(li);
        });
        document.getElementById('reflection-q').textContent = AI_REFLECTION.question;
        // Defer NVDA chart creation — Chart.js can't size a hidden canvas. Built on first expand.
        if (nvdaChart) { nvdaChart.destroy(); nvdaChart = null; }
    }

    function setupNvdaChart() {
        const canvas = document.getElementById('nvda-chart');
        const ctx = canvas.getContext('2d');
        if (nvdaChart) { nvdaChart.destroy(); }
        nvdaChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: AI_REFLECTION.nvdaSeries.map(p => p.q),
                datasets: [{
                    label: 'NVDA (approx. USD, split-adjusted)',
                    data: AI_REFLECTION.nvdaSeries.map(p => p.price),
                    borderColor: '#76b900',
                    backgroundColor: 'rgba(118, 185, 0, 0.12)',
                    fill: true,
                    tension: 0.2,
                    pointRadius: 3,
                    pointBackgroundColor: '#76b900',
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: { label: (c) => '$' + c.parsed.y.toFixed(0) }
                    },
                },
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Approx. NVDA price (USD)' } },
                },
            },
        });
    }

    // ---------------------------------------------------------------
    // Reset & setup
    // ---------------------------------------------------------------
    function resetGame() {
        document.getElementById('debrief-screen').classList.add('hidden');
        document.getElementById('actions').classList.remove('hidden');
        document.getElementById('fvpv-panel').classList.add('hidden');
        document.getElementById('btn-fvpv').textContent = 'Show FV / PV breakdown';
        document.getElementById('ai-block').removeAttribute('open'); // start collapsed each game
        applyScenario(getSelectedScenario());
        initState();
        renderState(); // sets qty to max-buyable
    }

    function attachHandlers() {
        document.getElementById('btn-buy').addEventListener('click', handleBuy);
        document.getElementById('btn-sell').addEventListener('click', handleSell);
        document.getElementById('btn-hold').addEventListener('click', handleHold);
        document.getElementById('btn-replay').addEventListener('click', resetGame);
        document.getElementById('btn-print').addEventListener('click', () => window.print());
        document.getElementById('btn-fvpv').addEventListener('click', toggleFvPv);
        document.getElementById('scenario-select').addEventListener('change', resetGame);
        document.getElementById('ai-block').addEventListener('toggle', function () {
            if (this.open && !nvdaChart) setupNvdaChart();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        applyScenario(getSelectedScenario());
        initState();
        setupChart();
        attachHandlers();
        renderState();
        initFeedbackUI();
    });

    // -------------------- FEEDBACK --------------------
    // Static-site feedback collection (ported from welfare-lab): opens user's
    // email client with a pre-filled message including auto-attached game context.
    // Falls back to clipboard copy. To redirect feedback, change FEEDBACK_EMAIL.
    const FEEDBACK_EMAIL = 'zihang4388@gmail.com';

    function buildFeedbackContext() {
        const lines = [];
        lines.push('Scenario: ' + (scenario ? `${scenario.name} (${scenario.id})` : '(none)'));
        if (state) {
            const gameOver = state.round > state.totalRounds;
            lines.push('Stage: ' + (gameOver ? 'debrief' : 'in-progress'));
            lines.push('Season: ' + Math.min(state.round, state.totalRounds) + (gameOver ? ` (game ended after ${state.totalRounds})` : ''));
            lines.push('Cash: ' + scenario.currency + state.cash.toFixed(2));
            lines.push('Holdings: ' + state.bulbs + ' ' + scenario.heldLabel.toLowerCase());
            const curPrice = state.pricePath[Math.min(state.round, state.totalRounds) - 1];
            lines.push('Current price: ' + scenario.currency + curPrice.toFixed(2));
            const portfolio = state.cash + state.bulbs * curPrice;
            lines.push('Portfolio: ' + scenario.currency + portfolio.toFixed(2));
            const counts = { buy: 0, sell: 0, hold: 0 };
            state.actionLog.forEach(a => { counts[a.action] = (counts[a.action] || 0) + 1; });
            lines.push(`Actions: ${counts.buy} buy, ${counts.sell} sell, ${counts.hold} hold`);
            if (gameOver) {
                lines.push('Final price: ' + scenario.currency + state.pricePath[state.pricePath.length - 1].toFixed(2));
                const peak = Math.max.apply(null, state.pricePath);
                const peakRound = state.pricePath.indexOf(peak) + 1;
                lines.push(`Peak: ${scenario.currency}${peak.toFixed(2)} at season ${peakRound}`);
            }
        }
        lines.push('---');
        lines.push('User-Agent: ' + (navigator.userAgent || '?'));
        lines.push('Viewport: ' + window.innerWidth + 'x' + window.innerHeight);
        lines.push('URL: ' + location.href);
        lines.push('Time: ' + new Date().toISOString());
        return lines.join('\n');
    }

    function buildFeedbackBody() {
        const text = (document.getElementById('feedback-text')?.value || '').trim();
        const type = document.querySelector('input[name="feedback-type"]:checked')?.value || 'other';
        return { type, text, body: text + '\n\n----- context -----\n' + buildFeedbackContext() };
    }

    function openFeedbackModal() {
        const modal = document.getElementById('feedback-modal');
        if (!modal) return;
        modal.hidden = false;
        const ctx = document.getElementById('feedback-context-text');
        if (ctx) ctx.textContent = buildFeedbackContext();
        setTimeout(() => document.getElementById('feedback-text')?.focus(), 30);
    }

    function closeFeedbackModal() {
        const modal = document.getElementById('feedback-modal');
        if (!modal) return;
        modal.hidden = true;
    }

    function sendFeedbackViaEmail() {
        const { type, text, body } = buildFeedbackBody();
        if (!text) {
            document.getElementById('feedback-text')?.focus();
            return;
        }
        const subject = `[Tulip Bulb Game] ${type}`;
        const url = 'mailto:' + FEEDBACK_EMAIL +
            '?subject=' + encodeURIComponent(subject) +
            '&body=' + encodeURIComponent(body);
        window.location.href = url;
        setTimeout(closeFeedbackModal, 250);
    }

    async function copyFeedbackToClipboard() {
        const { type, text, body } = buildFeedbackBody();
        if (!text) {
            document.getElementById('feedback-text')?.focus();
            return;
        }
        const payload = `[Tulip Bulb Game feedback] ${type}\n\n${body}`;
        try {
            await navigator.clipboard.writeText(payload);
            showFeedbackToast('Copied. Paste into an email to ' + FEEDBACK_EMAIL);
        } catch (e) {
            showFeedbackToast('Copy failed — please select and copy manually.');
        }
    }

    function showFeedbackToast(msg) {
        let toast = document.getElementById('feedback-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'feedback-toast';
            toast.className = 'feedback-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.hidden = false;
        clearTimeout(showFeedbackToast._t);
        showFeedbackToast._t = setTimeout(() => { toast.hidden = true; }, 3500);
    }

    function initFeedbackUI() {
        document.getElementById('feedback-btn')?.addEventListener('click', openFeedbackModal);
        document.getElementById('feedback-close')?.addEventListener('click', closeFeedbackModal);
        document.getElementById('feedback-cancel')?.addEventListener('click', closeFeedbackModal);
        document.getElementById('feedback-backdrop')?.addEventListener('click', closeFeedbackModal);
        document.getElementById('feedback-send')?.addEventListener('click', sendFeedbackViaEmail);
        document.getElementById('feedback-copy')?.addEventListener('click', copyFeedbackToClipboard);
        const link = document.getElementById('feedback-email-link');
        if (link) {
            link.href = 'mailto:' + FEEDBACK_EMAIL;
            link.textContent = FEEDBACK_EMAIL;
        }
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                const modal = document.getElementById('feedback-modal');
                if (modal && !modal.hidden) closeFeedbackModal();
            }
        });
    }
})();
