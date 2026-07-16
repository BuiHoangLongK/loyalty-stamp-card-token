# Stellar Anchor Directory — snapshot

_Generated 2026-06-09T12:16:22.981Z from `api.stellar.expert` (tag: `anchor`) and per-anchor `/.well-known/stellar.toml` (SEP-1)._

## Coverage

- **Anchors enumerated:** 92
- **`stellar.toml` fetched successfully:** 31
- **HTTP errors (e.g. 404, 403):** 20
- **Parse errors (malformed TOML):** 10
- **Network errors (timeout, DNS, TLS):** 31
- **Service endpoints declared across all anchors:** 47
- **Currencies declared across all anchors:** 375

> **Source note.** The user-facing directory at `anchors.stellar.org` is a client-rendered SPA whose data ultimately comes from on-chain `home_domain` fields. This snapshot uses Stellar Expert's public REST API (`api.stellar.expert/explorer/directory?tag[]=anchor`) as the canonical anchor list, then enriches each entry with the SEP-1 `stellar.toml` it publishes. This avoids geo-restrictions that affect the SPA in some regions (e.g. NL) and produces a more comprehensive, structured report than the SPA alone.

## Summary table

| # | Name | Domain | Directory tags | `stellar.toml` | Endpoints | Currencies |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Afreum | `afreum.com` | anchor, issuer | ok | 0 | 158 |
| 2 | AnchorMXN | `anchormxn.com` | anchor, issuer | network-error | 0 | 0 |
| 3 | AnchorUSD | `www.anchorusd.com` | anchor, memo-required | parse-error | 0 | 0 |
| 4 | Anclap | `anclap.com` | custodian, anchor | ok | 5 | 2 |
| 5 | AnclaX | `anclax.com` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 6 | ApisCapital | `apiscapitalfunds.com` | anchor, issuer | http 403 | 0 | 0 |
| 7 | APS.Money - Advanced Payment Solutions Ltd. | `aps.money` | custodian, anchor | ok | 0 | 13 |
| 8 | AQUA Issuer | `aqua.network` | anchor, issuer | ok | 0 | 7 |
| 9 | Astral9 | `astral9.io` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 10 | AtlantisBlue | `atlantisblue.org` | anchor, issuer | http 403 | 0 | 0 |
| 11 | Auskunft | `auskunft.de` | anchor | parse-error | 0 | 0 |
| 12 | BARSF | `bac.gold` | anchor, issuer | network-error | 0 | 0 |
| 13 | Bitbond | `bitbondsto.com` | anchor, issuer | ok | 0 | 1 |
| 14 | BitcoinX | `bitx.tk` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 15 | BosTravel | `bostravel.online` | issuer, anchor, unsafe | network-error | 0 | 0 |
| 16 | Centre | `centre.io` | anchor, issuer | ok | 0 | 1 |
| 17 | CharnaToken | `charnatoken.top` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 18 | Citron | `citron.cash` | anchor, issuer | network-error | 0 | 0 |
| 19 | CityStates | `citystatesm.com` | issuer, anchor | network-error | 0 | 0 |
| 20 | ClickPesa | `clickpesa.com` | anchor, issuer | http 404 | 0 | 0 |
| 21 | CowrieExchange - Abandoned | `cowrie.exchange` | anchor, issuer, unsafe | ok | 6 | 1 |
| 22 | Cryptomover | `cryptomover.com` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 23 | eQuid | `equid.co` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 24 | FactR | `www.factrpay.io` | anchor, issuer | parse-error | 0 | 0 |
| 25 | Firefly | `fchain.io` | anchor, issuer, unsafe | ok | 3 | 9 |
| 26 | Flutterwave | `flutterwave.com` | anchor, issuer | http 404 | 0 | 0 |
| 27 | Frasindo | `frasindo.com` | anchor, issuer, unsafe | parse-error | 0 | 0 |
| 28 | FreightCoin | `freight-coin.com` | anchor, unsafe | network-error | 0 | 0 |
| 29 | Funtracker | `funtracker.site` | anchor, issuer | ok | 1 | 7 |
| 30 | Glitzkoin | `glitzkoin.com` | anchor, issuer | http 404 | 0 | 0 |
| 31 | GoodX | `goodx.network` | anchor, memo-required | network-error | 0 | 0 |
| 32 | Gratz | `gratz.io` | anchor, issuer | ok | 0 | 1 |
| 33 | Heir | `heir.io` | anchor, issuer | parse-error | 0 | 0 |
| 34 | HotToken | `hotoken.io` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 35 | IreneEnergy | `irene.energy` | anchor, issuer, unsafe | http 404 | 0 | 0 |
| 36 | Ixinium | `ixinium.io` | anchor, issuer | ok | 0 | 2 |
| 37 | Jetmint | `jetmint.org` | anchor, issuer | network-error | 0 | 0 |
| 38 | LEVELG | `levelg.net` | anchor, issuer, unsafe | http 404 | 0 | 0 |
| 39 | Lobstr Merge Tool | `merge.lobstr.co` | anchor | http 404 | 0 | 0 |
| 40 | Luckybird | `luckybird.io` | anchor, memo-required | network-error | 0 | 0 |
| 41 | Lux Payband | `luxpayband.io` | anchor | ok | 0 | 6 |
| 42 | Mobius | `mobius.network` | anchor, issuer | ok | 1 | 1 |
| 43 | Moneygram | `mgusd.moneygram.com` | anchor | ok | 0 | 1 |
| 44 | Moni | `moni.com` | anchor, issuer | http 404 | 0 | 0 |
| 45 | MYKOBO | `mykobo.co` | anchor, issuer | ok | 5 | 1 |
| 46 | Nafuloo | `nafuloo.com` | issuer, anchor | ok | 0 | 2 |
| 47 | NaoBTC | `naobtc.com` | anchor, issuer, unsafe | ok | 2 | 2 |
| 48 | Nezly | `nezly.com` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 49 | NGNC Anchor Issuer | `ngnc.online` | anchor, issuer | http 404 | 0 | 0 |
| 50 | nTokens - Discontinued | `ntokens.com` | anchor, issuer, unsafe | ok | 5 | 1 |
| 51 | NydroEnergy | `nydro.energy` | anchor, unsafe | network-error | 0 | 0 |
| 52 | Papaya | `dead.apay.io` | anchor, issuer, memo-required, unsafe | ok | 2 | 6 |
| 53 | Papaya - Discontinued | `apay.io` | anchor, issuer, unsafe | http 521 | 0 | 0 |
| 54 | PapayaSwap | `papayabot.com` | anchor, memo-required, exchange | ok | 1 | 0 |
| 55 | Pedity | `pedity.com` | anchor, issuer, unsafe | parse-error | 0 | 0 |
| 56 | Phoenix | `app.phoenix-hub.io` | anchor, issuer | ok | 0 | 1 |
| 57 | Pigzbe | `pigzbe.com` | anchor, issuer, unsafe | http 404 | 0 | 0 |
| 58 | Piiko | `piiko.co` | anchor, unsafe | network-error | 0 | 0 |
| 59 | PRNetwork | `pr.network` | anchor, issuer | ok | 0 | 124 |
| 60 | Reddit Photons | `photon.center` | anchor, issuer | http 404 | 0 | 0 |
| 61 | Repocoin | `repocoin.io` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 62 | Repocoin Old | `old.repocoin.io` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 63 | RippleFox | `ripplefox.com` | anchor, issuer, unsafe | ok | 1 | 2 |
| 64 | SCAM-Counterfeiter | `steiiarusa.vip` | malicious, anchor | network-error | 0 | 0 |
| 65 | SixNetwork | `six.network` | anchor, issuer, unsafe | http 404 | 0 | 0 |
| 66 | SmartLands | `smartlands.io` | anchor, issuer | parse-error | 0 | 0 |
| 67 | StableX | `stablex.cloud` | anchor, issuer | network-error | 0 | 0 |
| 68 | Stably | `stably.io` | anchor, issuer | http 400 | 0 | 0 |
| 69 | SteemAnchor | `steemanchor.com` | anchor, unsafe | network-error | 0 | 0 |
| 70 | Stellarport | `stellarport.io` | anchor, issuer, exchange, memo-required | ok | 3 | 4 |
| 71 | STEMchain | `stemchain.io` | anchor, issuer | http 404 | 0 | 0 |
| 72 | Stronghold | `stronghold.co` | anchor, issuer, exchange, unsafe | ok | 0 | 1 |
| 73 | Superlumen | `superlumen.org` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 74 | SureRemit Old | `old.sureremit.co` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 75 | SureRemit Swap | `sureremit.co` | anchor, issuer | http 403 | 0 | 0 |
| 76 | TARI | `cryptotari.io` | anchor, issuer, unsafe | ok | 0 | 1 |
| 77 | Tempo | `tempocrypto.com` | anchor, issuer, memo-required | parse-error | 0 | 0 |
| 78 | Ternio | `ternio.io` | anchor, issuer | network-error | 0 | 0 |
| 79 | TheFutbolCoin | `thefutbolcoin.io` | anchor, issuer, unsafe | ok | 0 | 1 |
| 80 | TokenIO | `x.token.io` | anchor, unsafe | network-error | 0 | 0 |
| 81 | ToNaira | `tonaira.com` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 82 | TONMoney | `tontinetrust.com` | anchor, issuer, unsafe | http 404 | 0 | 0 |
| 83 | Traxalt | `traxalt.com` | anchor, issuer | parse-error | 0 | 0 |
| 84 | Uhuru | `uhuruwallet.co.za` | anchor, issuer | http 404 | 0 | 0 |
| 85 | UltraCapital yXLM distributor | `ultracapital.xyz` | anchor, custodian | ok | 3 | 6 |
| 86 | VCBear | `vcbear.net` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 87 | WhiteStandard | `thewwallet.com` | anchor, memo-required | ok | 2 | 4 |
| 88 | Winsome | `winsome.gift` | anchor, issuer, unsafe | network-error | 0 | 0 |
| 89 | WireX Deposit | `wirexapp.com` | wallet, anchor, exchange, memo-required | http 400 | 0 | 0 |
| 90 | XIMCoin | `ximcoin.com` | anchor, issuer, unsafe | ok | 1 | 1 |
| 91 | Xirkle | `xirkle.com` | anchor, issuer, unsafe | parse-error | 0 | 0 |
| 92 | Zeam.Money | `zeam.money` | anchor, issuer | ok | 6 | 8 |

---

## Per-anchor detail
## Afreum — `afreum.com`

- **Directory account:** `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 2.0.0



### Service endpoints

- **Signing key** — `GAL2FYLOZAVBVGUZPQU3GACIRYCZRF7CVOYUSNY5ZVZEMT53CRHLKOZQ`



### Organization documentation

- **ORG_NAME** — Afreum DAO
- **ORG_DBA** — Afreum
- **ORG_URL** — https://afreum.com
- **ORG_LOGO** — https://afreum.com/stellar/ST_Afreum_Logo.png
- **ORG_DESCRIPTION** — Afreum is building a financially-inclusive, community-driven, Africa-focused tokenized economy on the Stellar blockchain, powered by the AFREUM (AFR), AFREUM X (AFRX), country-specific tokens such as…
- **ORG_PHYSICAL_ADDRESS** — N/A
- **ORG_KEYBASE** — Afreum
- **ORG_TWITTER** — Afreum1
- **ORG_GITHUB** — Afreum
- **ORG_OFFICIAL_EMAIL** — info@afreum.com



### Principals

**Principal 1**
  - **name** — Afreum DAO
  - **email** — info@afreum.com
  - **twitter** — https://x.com/Afreum1



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **AFR** | `GBX6YI45VU7WNAAKA3RBFDR3I3UKNFHTJPQ5F6KOOKSGYIAM4TRQN54W` | live | — | — | 7 |
| **AFRX** | `GBDTAQDRSX3QOEAQQKYWRGOTFE5FHQTLIH5YAF2HGUY3PBKRXWDKBLHN` | live | — | — | 7 |
| **AEUR** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AALL** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ADZD** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AUSD** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AAOA** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AXCD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AARS** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AAMD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AAWG** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AAUD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AAZN** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABSD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABHD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABDT** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABBD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABYN** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABZD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AXOF** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ABMD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABTN** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABOB** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABAM** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABWP** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ANOK** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABRL** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABND** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABGN** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ABIF** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AKHR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AXAF** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ACAD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ACVE** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AKYD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ACLP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ACNY** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ACOP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AKMF** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ANZD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ACRC** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AHRK** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ACUP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AANG** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ACZK** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ADKK** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ADJF** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ADOP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AEGP** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AETB** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AFKP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AFJD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AXPF** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AGMD** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AGEL** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AGHS** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AGIP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AGTQ** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AGBP** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AGNF** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AGYD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AHTG** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AHNL** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AHKD** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AHUF** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AISK** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AINR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AIDR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AILS** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AJMD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AJPY** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AJOD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AKZT** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AKES** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AKWD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AKGS** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ALAK** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ALSL** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ALRD** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ACHF** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AMOP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AMGA** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AMWK** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AMYR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AMVR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AMRU** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AMUR** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AMXN** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AMDL** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AMNT** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AMAD** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AMZN** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AMMK** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ANAD** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ANPR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ANIO** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ANGN** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AMKD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AOMR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **APKR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **APGK** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **APYG** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **APEN** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **APHP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **APLN** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AQAR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ARON** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ARUB** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ARWF** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ASHP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AWST** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ASTN** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ASAR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ARSD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ASCR** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ASLL** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ASGD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ASBD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AZAR** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AKRW** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ALKR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ASRD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ASZL** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ASEK** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ATWD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ATJS** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ATZS** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ATHB** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ATOP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ATTD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ATND** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ATRY** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ATMT** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AUGX** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AUAH** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AAED** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AUYU** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AUZS** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AVUV** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AVES** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AVND** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AZMW** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AZWL** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AAFN** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AIQD** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AIRR** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AKPW** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ALBP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **APAB** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ASVC** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ASYP** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **AYER** | `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ` | live | — | — | 7 |
| **ASOS** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ACDF** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ASSP** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ASDG** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **ALYD** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |
| **AERN** | `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI` | live | — | — | 7 |



### Accounts

- `GBX6YI45VU7WNAAKA3RBFDR3I3UKNFHTJPQ5F6KOOKSGYIAM4TRQN54W`
- `GDNUVPUOMWOF2ML5FA5E4HQDX7EHV3VCJTLLTO563PUMZKMHJUJIJSYI`
- `GBDTAQDRSX3QOEAQQKYWRGOTFE5FHQTLIH5YAF2HGUY3PBKRXWDKBLHN`
- `GCJFH6HI5UPQVTUUOAS7JPOEPCQZCNGM63GWMBL6ULGUL4XUXRIXXIEQ`
- `GDDGTHJFW66SQYV2GRWRNL3AFWEHLI2IO7LTY7X743U4TUFI7VLKKZFG`
- `GAGCE4AKZ55YGF4OHIODN7M3HXKZLHUDZLTLWHCGSUNWUBO7LX7UKKQY`

---

## AnchorMXN — `anchormxn.com`

- **Directory account:** `GCKIK5F6J4KMKF6MKB5EM67S5CK557EZQ3IAMZM5FFAYST63S3HWXVPE`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## AnchorUSD — `www.anchorusd.com`

- **Directory account:** `GASWJWFRYE55KC7MGANZMMRBK5NPXT3HMPDQ6SEXZN6ZPWYXVVYBFRTE`
- **Tags:** `anchor`, `memo-required`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html><!--BjPAx0hapvGe1NlQCJUFO--><html lang=\"en\"><head><meta charSet=\"utf-8\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/><link rel=\"preload\" href=\"/_next/static/media/83afe278b6a6bb3c-s.p.3a6ba036.woff2\" as=\"font\" crossorigin=\"\" type=\"font/woff2\"/><link rel=\"stylesheet\" href=\"/_next/static/chunks/754ab285cbdb904c.css\" data-precedence=\"next\"/><link rel=\"preload\" as=\"script\" fetchPriority=\"low\" href=\"/_next/static/chunks/21a0a4061f3ab64d.js\"/><script src=\"/_next/static/chunks/aee6c7720838f8a2.js\" async=\"\"></script><script src=\"/_next/static/chunks/5c0aac8a5f149952.js\" async=\"\"></script><script src=\"/_next/static/chunks/turbopack-727abecc1ae60de7.js\" async=\"\"></script><script src=\"/_next/static/chunks/ff1a16fafef87110.js\" async=\"\"></script><script src=\"/_next/static/chunks/d2be314c3ece3fbe.js\" async=\"\"></script><script src=\"/_next/static/chunks/c7f68f5d4d338c75.js\" async=\"\"></script><meta name=\"next-size-adjust\" content=\"\"/><title>Anchor - Trade Crypto with Confidence</title><meta name=\"description\" content=\"The most trusted platform for cryptocurrency trading. Buy, sell, and manage your digital assets with ease.\"/><meta name=\"keywords\" content=\"cryptocurrency, trading, bitcoin, ethereum, crypto exchange, digital assets\"/><meta property=\"og:title\" content=\"Anchor - Trade Crypto with Confidence\"/><meta property=\"og:description\" content=\"The most trusted platform for cryptocurrency trading\"/><meta property=\"og:image\" content=\"http://localhost:10000/og-image.png\"/><meta property=\"og:image:width\" content=\"1200\"/><meta property=\"og:image:height\" content=\"630\"/><meta property=\"og:type\" content=\"website\"/><meta name=\"twitter:card\" content=\"summary_large_image\"/><meta name=\"twitter:title\" content=\"Anchor - Trade Crypto with Confidence\"/><meta name=\"twitter:description\" content=\"The most trusted platform for cryptocurrency trading\"/><meta name=\"twitter:image\" content=\"http://localhost:10000/og-image.png\"/><link rel=\"icon\" href=\"/favicon.png\"/><link rel=\"apple-touch-icon\" href=\"/anchor-icon.png\"/><script src=\"/_next/static/chunks/a6dad97d9634a72d.js\" noModule=\"\"></script></head><body class=\"inter_5972bc34-module__OU16Qa__className\"><div hidden=\"\"><!--$--><!--/$--></div><div class=\"jsx-4499e3848c7cc8c0 min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white relative overflow-hidden\"><div class=\"jsx-4499e3848c7cc8c0 absolute inset-0 overflow-hidden pointer-events-none\"><div class=\"jsx-4499e3848c7cc8c0 absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse\"></div><div style=\"animation-delay:2s\" class=\"jsx-4499e3848c7cc8c0 absolute top-0 -right-4 w-96 h-96 bg-sky-400 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse\"></div><div style=\"animation-delay:4s\" class=\"jsx-4499e3848c7cc8c0 absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse\"></div></div><div class=\"jsx-4499e3848c7cc8c0 absolute inset-0 opacity-30 pointer-events-none\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"jsx-4499e3848c7cc8c0 absolute inset-0 w-full h-full\"><defs class=\"jsx-4499e3848c7cc8c0\"><pattern id=\"grid\" width=\"60\" height=\"60\" patternUnits=\"userSpaceOnUse\" class=\"jsx-4499e3848c7cc8c0\"><path d=\"M 60 0 L 0 0 0 60\" fill=\"none\" stroke=\"rgba(255,255,255,0.03)\" stroke-width=\"1\" class=\"jsx-4499e3848c7cc8c0\"></path></pattern></defs><rect width=\"100%\" height=\"100%\" fill=\"url(#grid)\" class=\"jsx-4499e3848c7cc8c0\"></rect></svg></div><nav class=\"jsx-4499e3848c7cc8c0 fixed top-0 w-full z-50 transition-all duration-300 bg-transparent\"><div class=\"jsx-4499e3848c7cc8c0 container mx-auto px-6 py-4\"><div class=\"jsx-4499e3848c7cc8c0 flex justify-between items-center\"><div class=\"jsx-4499e3848c7cc8c0 flex items-center space-x-3\"><div class=\"jsx-4499e3848c7cc8c0 relative\"><img alt=\"Anchor\" loading=\"lazy\" width=\"40\" height=\"40\" decoding=\"async\" data-nimg=\"1\" class=\"rounded-lg\" style=\"color:transparent\" src=\"/anchor-icon.png\"/><div class=\"jsx-4499e3848c7cc8c0 absolute inset-0 bg-blue-500 rounded-lg blur-xl opacity-30\"></div></div><span class=\"jsx-4499e3848c7cc8c0 text-2xl font-bold\">Anchor</span></div><div class=\"jsx-4499e3848c7cc8c0 hidden md:flex items-center space-x-4\"><a href=\"https://app.tryanchor.com/login\" class=\"jsx-4499e3848c7cc8c0 text-gray-300 hover:text-white transition-colors px-4 py-2 font-medium\">Log In</a><a href=\"#download\" class=\"jsx-4499e3848c7cc8c0 relative group\"><div class=\"jsx-4499e3848c7cc8c0 absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-200\"></div><span class=\"jsx-4499e3848c7cc8c0 relative bg-gradient-to-r from-blue-500 to-sky-500 text-white px-6 py-2 rounded-full block\">Download</span></a></div><button class=\"jsx-4499e3848c7cc8c0 md:hidden\"><svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" class=\"jsx-4499e3848c7cc8c0 w-6 h-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 6h16M4 12h16M4 18h16\" class=\"jsx-4499e3848c7cc8c0\"></path></svg></button></div></div></nav><section class=\"jsx-4499e3848c7cc8c0 pt-32 pb-20 px-6 relative\"><div class=\"jsx-4499e3848c7cc8c0 container mx-auto text-center relative z-10\"><div class=\"jsx-4499e3848c7cc8c0 inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/20 to-sky-500/20 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8\"><span class=\"jsx-4499e3848c7cc8c0 relative flex h-2 w-2\"><span class=\"jsx-4499e3848c7cc8c0 animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75\"></span><span class=\"jsx-4499e3848c7cc8c0 relative inline-flex rounded-full h-2 w-2 bg-green-500\"></span></span><span class=\"jsx-4499e3848c7cc8c0 text-sm font-medium\">Now available for iOS and Android</span></div><h1 class=\"jsx-4499e3848c7cc8c0 text-5xl md:text-7xl font-bold mb-6 leading-tight\">Your Gateway to<span class=\"jsx-4499e3848c7cc8c0 block bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-300% mt-2\">Crypto Trading</span></h1><p class=\"jsx-4499e3848c7cc8c0 text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto\">Simple, secure, and powerful. Buy, sell, and manage your favorite cryptocurrencies all in one beautifully designed app.</p><div class=\"jsx-4499e3848c7cc8c0 max-w-md mx-auto mb-6\"><a href=\"#download\" class=\"jsx-4499e3848c7cc8c0 relative group inline-block\"><div class=\"jsx-4499e3848c7cc8c0 absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200\"></div><span class=\"jsx-4499e3848c7cc8c0 relative bg-gradient-to-r from-blue-500 to-sky-500 text-white px-10 py-4 rounded-full block font-semibold text-lg\">Download</span></a></div><div class=\"jsx-4499e3848c7cc8c0 mt-16 space-y-6\"><div class=\"jsx-4499e3848c7cc8c0 text-center\"><div class=\"jsx-4499e3848c7cc8c0 inline-flex items-center space-x-3 text-lg text-gray-400\"><span class=\"jsx-4499e3848c7cc8c0 font-semibold\">Crypto Prices</span></div></div><div class=\"jsx-4499e3848c7cc8c0 text-center\"><div class=\"jsx-4499e3848c7cc8c0 inline-flex items-center space-x-2 text-sm text-gray-400\"><div class=\"jsx-4499e3848c7cc8c0 w-3 h-3 bg-blue-500 rounded-full animate-pulse\"></div><span class=\"jsx-4499e3848c7cc8c0\">Loading prices...</span></div></div><div class=\"jsx-4499e3848c7cc8c0 relative overflow-hidden\"><div class=\"jsx-4499e3848c7cc8c0 absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none\"></div><div class=\"jsx-4499e3848c7cc8c0 absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none\"></div><div class=\"jsx-4499e3848c7cc8c0 flex space-x-8 animate-marquee\"></div></div><div class=\"jsx-4499e3848c7cc8c0 relative overflow-hidden\"><div class=\"jsx-4499e3848c7cc8c0 absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none\"></div><div class=\"jsx-4499e3848c7cc8c0 absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none\"></div><div class=\"jsx-4499e3848c7cc8c0 flex space-x-8 animate-marquee-reverse\"></div></div></div></div></section><section id=\"features\" class=\"jsx-4499e3848c7cc8c0 py-20 px-6 relative\"><div class=\"jsx-4499e3848c7cc8c0 container mx-auto relative z-10\"><div class=\"jsx-4499e3848c7cc8c0 text-center mb-12\"><h2 class=\"jsx-4499e3848c7cc8c0 text-4xl font-bold mb-4\">Everything You Need to Trade Confidently</h2><p class=\"jsx-4499e3848c7cc8c0 text-xl text-gray-400 max-w-2xl mx-auto\">Powerful features designed to make crypto trading accessible for everyone.</p></div><div class=\"jsx-4499e3848c7cc8c0 grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto\"><div class=\"jsx-4499e3848c7cc8c0 group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1\"><div class=\"jsx-4499e3848c7cc8c0 text-blue-400 mb-4 group-hover:scale-110 transition-transform\"><svg class=\"w-8 h-8\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z\"></path></svg></div><h3 class=\"jsx-4499e3848c7cc8c0 text-xl font-bold mb-3\">Simple &amp; Secure</h3><p class=\"jsx-4499e3848c7cc8c0 text-gray-400\">Start trading in minutes with an intuitive interface and robust security features</p></div><div class=\"jsx-4499e3848c7cc8c0 group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1\"><div class=\"jsx-4499e3848c7cc8c0 text-blue-400 mb-4 group-hover:scale-110 transition-transform\"><svg class=\"w-8 h-8\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z\"></path></svg></div><h3 class=\"jsx-4499e3848c7cc8c0 text-xl font-bold mb-3\">Instant Trading</h3><p class=\"jsx-4499e3848c7cc8c0 text-gray-400\">Buy and sell crypto instantly with real-time price updates</p></div><div class=\"jsx-4499e3848c7cc8c0 group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1\"><div class=\"jsx-4499e3848c7cc8c0 text-blue-400 mb-4 group-hover:scale-110 transition-transform\"><svg class=\"w-8 h-8\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z\"></path></svg></div><h3 class=\"jsx-4499e3848c7cc8c0 text-xl font-bold mb-3\">Track Your Portfolio</h3><p class=\"jsx-4499e3848c7cc8c0 text-gray-400\">Beautiful charts and insights to monitor your investments</p></div><div class=\"jsx-4499e3848c7cc8c0 group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1\"><div class=\"jsx-4499e3848c7cc8c0 text-blue-400 mb-4 group-hover:scale-110 transition-transform\"><svg class=\"w-8 h-8\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125\"></path></svg></div><h3 class=\"jsx-4499e3848c7cc8c0 text-xl font-bold mb-3\">Best Prices</h3><p class=\"jsx-4499e3848c7cc8c0 text-gray-400\">Competitive rates and transparent fees with no hidden costs</p></div><div class=\"jsx-4499e3848c7cc8c0 group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1\"><div class=\"jsx-4499e3848c7cc8c0 text-blue-400 mb-4 group-hover:scale-110 transition-transform\"><svg class=\"w-8 h-8\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z\"></path></svg></div><h3 class=\"jsx-4499e3848c7cc8c0 text-xl font-bold mb-3\">Earn Rewards</h3><p class=\"jsx-4499e3848c7cc8c0 text-gray-400\">Earn up to 14% APY with staking rewards¹</p></div><div class=\"jsx-4499e3848c7cc8c0 group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1\"><div class=\"jsx-4499e3848c7cc8c0 text-blue-400 mb-4 group-hover:scale-110 transition-transform\"><svg class=\"w-8 h-8\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155\"></path></svg></div><h3 class=\"jsx-4499e3848c7cc8c0 text-xl font-bold mb-3\">Dedicated Support</h3><p class=\"jsx-4499e3848c7cc8c0 text-gray-400\">Have a question? Our team is just an email away, seven days a week</p></div></div></div></section><section id=\"security\" class=\"jsx-4499e3848c7cc8c0 py-20 px-6 relative\"><div class=\"jsx-4499e3848c7cc8c0 container mx-auto max-w-6xl relative z-10\"><div class=\"jsx-4499e3848c7cc8c0 bg-gradient-to-r from-blue-600/10 to-sky-500/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12\"><div class=\"jsx-4499e3848c7cc8c0 grid md:grid-cols-2 gap-12 items-center\"><div class=\"jsx-4499e3848c7cc8c0\"><h2 class=\"jsx-4499e3848c7cc8c0 text-5xl font-bold mb-8\">Your Security is Our Priority</h2><p class=\"jsx-4499e3848c7cc8c0 text-xl text-gray-400 mb-12 leading-relaxed\">Sleep soundly knowing your assets are protected by industry-standard security measures and best practices.</p><div class=\"jsx-4499e3848c7cc8c0 grid grid-cols-2 gap-6\"><div class=\"jsx-4499e3848c7cc8c0 flex items-center space-x-4 bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-colors\"><span class=\"jsx-4499e3848c7cc8c0 text-3xl flex-shrink-0\">🔐</span><span class=\"jsx-4499e3848c7cc8c0 text-base font-medium\">Multi-factor authentication</span></div><div class=\"jsx-4499e3848c7cc8c0 flex items-center space-x-4 bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-colors\"><span class=\"jsx-4499e3848c7cc8c0 text-3xl flex-shrink-0\">🛡️</span><span class=\"jsx-4499e3848c7cc8c0 text-base font-medium\">Encrypted data storage</span></div><div class=\"jsx-4499e3848c7cc8c0 flex items-center space-x-4 bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-colors\"><span class=\"jsx-4499e3848c7cc8c0 text-3xl flex-shrink-0\">✅</span><span class=\"jsx-4499e3848c7cc8c0 text-base font-medium\">Ongoing security monitoring</span></div><div class=\"jsx-4499e3848c7cc8c0 flex items-center space-x-4 bg-white/5 rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-colors\"><span class=\"jsx-4499e3848c7cc8c0 text-3xl flex-shrink-0\">🔑</span><span class=\"jsx-4499e3848c7cc8c0 text-base font-medium\">Secure key management</span></div></div></div><div class=\"jsx-4499e3848c7cc8c0 relative flex items-center justify-center min-h-[400px]\"><div class=\"jsx-4499e3848c7cc8c0 absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-500/20 rounded-full blur-3xl\"></div><img alt=\"Security Shield\" loading=\"lazy\" width=\"380\" height=\"380\" decoding=\"async\" data-nimg=\"1\" class=\"relative z-10 drop-shadow-2xl\" style=\"color:transparent;object-fit:contain\" src=\"/shield-transparent-v2.png\"/></div></div></div></div></section><section id=\"wallet\" class=\"jsx-4499e3848c7cc8c0 py-20 px-6 relative\"><div class=\"jsx-4499e3848c7cc8c0 container mx-auto text-center relative z-10\"><div class=\"jsx-4499e3848c7cc8c0 inline-block bg-gradient-to-r from-purple-500/20 to-violet-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold mb-6 border border-purple-500/30\">COMING SOON</div><h2 class=\"jsx-4499e3848c7cc8c0 text-4xl md:text-5xl font-bold mb-6\">Self-Custody Wallet</h2><p class=\"jsx-4499e3848c7cc8c0 text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-400\">True ownership of your digital assets. Connect to DeFi, stake directly on-chain, and maintain complete control of your private keys.</p><div class=\"jsx-4499e3848c7cc8c0 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12\"><div class=\"jsx-4499e3848c7cc8c0 relative group\"><div class=\"jsx-4499e3848c7cc8c0 absolute -inset-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200\"></div><div class=\"jsx-4499e3848c7cc8c0 relative bg-slate-900 rounded-2xl p-6 border border-purple-500/20\"><div class=\"jsx-4499e3848c7cc8c0 text-3xl mb-3\">🔑</div><h3 class=\"jsx-4499e3848c7cc8c0 text-lg font-semibold mb-2\">True Ownership</h3><p class=\"jsx-4499e3848c7cc8c0 text-sm text-gray-400\">Your keys, your crypto - full control of your assets</p></div></div><div class=\"jsx-4499e3848c7cc8c0 relative group\"><div class=\"jsx-4499e3848c7cc8c0 absolute -inset-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200\"></div><div class=\"jsx-4499e3848c7cc8c0 relative bg-slate-900 rounded-2xl p-6 border border-purple-500/20\"><div class=\"jsx-4499e3848c7cc8c0 text-3xl mb-3\">⚡</div><h3 class=\"jsx-4499e3848c7cc8c0 text-lg font-semibold mb-2\">Lightning Fast</h3><p class=\"jsx-4499e3848c7cc8c0 text-sm text-gray-400\">Send and receive crypto instantly across networks</p></div></div><div class=\"jsx-4499e3848c7cc8c0 relative group\"><div class=\"jsx-4499e3848c7cc8c0 absolute -inset-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-200\"></div><div class=\"jsx-4499e3848c7cc8c0 relative bg-slate-900 rounded-2xl p-6 border border-purple-500/20\"><div class=\"jsx-4499e3848c7cc8c0 text-3xl mb-3\">🎯</div><h3 class=\"jsx-4499e3848c7cc8c0 text-lg font-semibold mb-2\">One App, All Chains</h3><p class=\"jsx-4499e3848c7cc8c0 text-sm text-gray-400\">Manage Bitcoin, Ethereum, Solana &amp; more in one place</p></div></div></div><a href=\"#download\" class=\"jsx-4499e3848c7cc8c0 inline-block mt-12 bg-gradient-to-r from-purple-500 to-violet-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-purple-500/25 transition-all hover:scale-105\">Download</a></div></section><section id=\"download\" class=\"jsx-4499e3848c7cc8c0 py-20 px-6 relative\"><div class=\"jsx-4499e3848c7cc8c0 container mx-auto max-w-4xl relative z-10\"><div class=\"jsx-4499e3848c7cc8c0 bg-gradient-to-br from-blue-600/20 to-sky-500/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center\"><div class=\"jsx-4499e3848c7cc8c0 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-sky-500 rounded-2xl mb-6\"><svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\" class=\"jsx-4499e3848c7cc8c0 w-10 h-10 text-white\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z\" class=\"jsx-4499e3848c7cc8c0\"></path></svg></div><h2 class=\"jsx-4499e3848c7cc8c0 text-4xl font-bold mb-6\">Start Trading in Minutes</h2><p class=\"jsx-4499e3848c7cc8c0 text-xl text-gray-400 mb-12\">Available on all your devices. Trade anywhere, anytime.</p><div class=\"jsx-4499e3848c7cc8c0 flex flex-col sm:flex-row gap-4 justify-center\"><a href=\"https://apps.apple.com/us/app/anchorusd-buy-stocks-crypto/id1495986023\" class=\"jsx-4499e3848c7cc8c0 bg-black text-white px-5 py-3 rounded-lg flex items-center space-x-3 border border-white/20 hover:bg-gray-900 transition-all hover:scale-105\"><svg viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"jsx-4499e3848c7cc8c0 w-8 h-8 flex-shrink-0\"><path d=\"M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z\" class=\"jsx-4499e3848c7cc8c0\"></path></svg><div class=\"jsx-4499e3848c7cc8c0 text-left\"><div class=\"jsx-4499e3848c7cc8c0 text-[11px] leading-tight\">Download on the</div><div class=\"jsx-4499e3848c7cc8c0 text-lg font-semibold leading-tight\">App Store</div></div></a><a href=\"https://play.google.com/store/apps/details?id=app.anchors.anchorusd\" class=\"jsx-4499e3848c7cc8c0 bg-black text-white px-5 py-3 rounded-lg flex items-center space-x-3 border border-white/20 hover:bg-gray-900 transition-all hover:scale-105\"><svg viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"jsx-4499e3848c7cc8c0 w-8 h-8 flex-shrink-0\"><path d=\"M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.6l2.834 1.64a1 1 0 0 1 0 1.733l-2.834 1.641-2.532-2.532 2.532-2.482zM5.864 3.458L16.8 9.79l-2.302 2.302-8.635-8.635z\" class=\"jsx-4499e3848c7cc8c0\"></path></svg><div class=\"jsx-4499e3848c7cc8c0 text-left\"><div class=\"jsx-4499e3848c7cc8c0 text-[11px] leading-tight uppercase tracking-wider\">Get it on</div><div class=\"jsx-4499e3848c7cc8c0 text-lg font-semibold leading-tight\">Google Play</div></div></a></div><p class=\"jsx-4499e3848c7cc8c0 mt-8 text-sm text-gray-400\">Available on iOS and Android</p></div></div></section><footer class=\"jsx-4499e3848c7cc8c0 bg-black border-t border-white/10 py-12 px-6\"><div class=\"jsx-4499e3848c7cc8c0 container mx-auto\"><div class=\"jsx-4499e3848c7cc8c0 grid md:grid-cols-4 gap-8\"><div class=\"jsx-4499e3848c7cc8c0\"><div class=\"jsx-4499e3848c7cc8c0 flex items-center space-x-2 mb-4\"><img alt=\"Anchor\" loading=\"lazy\" width=\"32\" height=\"32\" decoding=\"async\" data-nimg=\"1\" class=\"rounded-lg\" style=\"color:transparent\" src=\"/anchor-icon.png\"/><span class=\"jsx-4499e3848c7cc8c0 text-xl font-bold\">Anchor</span></div><p class=\"jsx-4499e3848c7cc8c0 text-gray-400 text-sm\">Professional-grade cryptocurrency trading with robust security.</p><div class=\"jsx-4499e3848c7cc8c0 flex space-x-4 mt-4\"><a href=\"https://x.com/anchorusd\" class=\"jsx-4499e3848c7cc8c0 text-gray-400 hover:text-white transition-colors\"><svg fill=\"currentColor\" viewBox=\"0 0 24 24\" class=\"jsx-4499e3848c7cc8c0 w-5 h-5\"><path d=\"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z\" class=\"jsx-4499e3848c7cc8c0\"></path></svg></a></div></div><div class=\"jsx-4499e3848c7cc8c0\"><h4 class=\"jsx-4499e3848c7cc8c0 font-semibold mb-4 text-gray-300\">Products</h4><ul class=\"jsx-4499e3848c7cc8c0 space-y-2 text-gray-400 text-sm\"><li class=\"jsx-4499e3848c7cc8c0\"><a href=\"#features\" class=\"jsx-4499e3848c7cc8c0 hover:text-white transition-colors\">Buy &amp; Sell</a></li><li class=\"jsx-4499e3848c7cc8c0\"><a href=\"#wallet\" class=\"jsx-4499e3848c7cc8c0 hover:text-white transition-colors\">Self-Custody Wallet</a></li></ul></div><div class=\"jsx-4499e3848c7cc8c0\"><h4 class=\"jsx-4499e3848c7cc8c0 font-semibold mb-4 text-gray-300\">Resources</h4><ul class=\"jsx-4499e3848c7cc8c0 space-y-2 text-gray-400 text-sm\"><li class=\"jsx-4499e3848c7cc8c0\"><a href=\"https://support.tryanchor.com/hc/en-us\" class=\"jsx-4499e3848c7cc8c0 hover:text-white transition-colors\">Help Center</a></li><li class=\"jsx-4499e3848c7cc8c0\"><a href=\"https://status.tryanchor.com/\" class=\"jsx-4499e3848c7cc8c0 hover:text-white transition-colors\">App Status</a></li><li class=\"jsx-4499e3848c7cc8c0\"><a href=\"https://service-status.tryanchor.com/\" class=\"jsx-4499e3848c7cc8c0 hover:text-white transition-colors\">Service Status</a></li><li class=\"jsx-4499e3848c7cc8c0\"><a href=\"https://support.tryanchor.com/hc/en-us/requests/new\" class=\"jsx-4499e3848c7cc8c0 hover:text-white transition-colors\">Contact Support</a></li></ul></div><div class=\"jsx-4499e3848c7cc8c0\"><h4 class=\"jsx-4499e3848c7cc8c0 font-semibold mb-4 text-gray-300\">Legal</h4><ul class=\"jsx-4499e3848c7cc8c0 space-y-2 text-gray-400 text-sm\"><li class=\"jsx-4499e3848c7cc8c0\"><a href=\"https://app.tryanchor.com/register\" class=\"jsx-4499e3848c7cc8c0 hover:text-white transition-colors\">User Agreement</a></li><li class=\"jsx-4499e3848c7cc8c0\"><a href=\"https://dashboard.tryanchor.com/documents/privacy_policy\" class=\"jsx-4499e3848c7cc8c0 hover:text-white transition-colors\">Privacy Policy</a></li></ul></div></div><div class=\"jsx-4499e3848c7cc8c0 border-t border-white/10 mt-8 pt-8 space-y-4 text-xs text-gray-500\"><div class=\"jsx-4499e3848c7cc8c0\"><p class=\"jsx-4499e3848c7cc8c0\">Anchor is a financial technology company, not an FDIC insured depository institution. Investing in cryptocurrencies involves significant risks. Any digital currencies purchased are:</p><ul class=\"jsx-4499e3848c7cc8c0 list-disc list-inside ml-2 mt-1\"><li class=\"jsx-4499e3848c7cc8c0\">Not Insured by the FDIC or Any Federal Government Agency</li><li class=\"jsx-4499e3848c7cc8c0\">Not a Deposit or Other Obligation of, or Guaranteed by, any Bank or any Bank Affiliate</li><li class=\"jsx-4499e3848c7cc8c0\">Subject to Investment Risks, Including Possible Loss of the Principal Amount Invested</li></ul></div><p class=\"jsx-4499e3848c7cc8c0\"><sup class=\"jsx-4499e3848c7cc8c0\">1</sup> Subject to availability restrictions by jurisdiction. See User Agreement for important disclosures.</p><p class=\"jsx-4499e3848c7cc8c0 text-gray-400\">© 2026 Anchor. All rights reserved.</p></div></div></footer></div><!--$--><!--/$--><script src=\"/_next/static/chunks/21a0a4061f3ab64d.js\" id=\"_R_\" async=\"\"></script><script>(self.__next_f=self.__next_f\|\|[]).push([0])</script><script>self.__next_f.push([1,\"1:\\\"$Sreact.fragment\\\"\\n2:I[39756,[\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"/_next/static/chunks/d2be314c3ece3fbe.js\\\"],\\\"default\\\"]\\n3:I[37457,[\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"/_next/static/chunks/d2be314c3ece3fbe.js\\\"],\\\"default\\\"]\\n4:I[47257,[\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"/_next/static/chunks/d2be314c3ece3fbe.js\\\"],\\\"ClientPageRoot\\\"]\\n5:I[31713,[\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"/_next/static/chunks/c7f68f5d4d338c75.js\\\"],\\\"default\\\"]\\n8:I[97367,[\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"/_next/static/chunks/d2be314c3ece3fbe.js\\\"],\\\"OutletBoundary\\\"]\\n9:\\\"$Sreact.suspense\\\"\\nb:I[97367,[\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"/_next/static/chunks/d2be314c3ece3fbe.js\\\"],\\\"ViewportBoundary\\\"]\\nd:I[97367,[\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"/_next/static/chunks/d2be314c3ece3fbe.js\\\"],\\\"MetadataBoundary\\\"]\\nf:I[68027,[\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"/_next/static/chunks/d2be314c3ece3fbe.js\\\"],\\\"default\\\"]\\n:HL[\\\"/_next/static/chunks/754ab285cbdb904c.css\\\",\\\"style\\\"]\\n:HL[\\\"/_next/static/media/83afe278b6a6bb3c-s.p.3a6ba036.woff2\\\",\\\"font\\\",{\\\"crossOrigin\\\":\\\"\\\",\\\"type\\\":\\\"font/woff2\\\"}]\\n\"])</script><script>self.__next_f.push([1,\"0:{\\\"P\\\":null,\\\"b\\\":\\\"BjPAx0hapvGe1NlQCJUFO\\\",\\\"c\\\":[\\\"\\\",\\\"\\\"],\\\"q\\\":\\\"\\\",\\\"i\\\":false,\\\"f\\\":[[[\\\"\\\",{\\\"children\\\":[\\\"__PAGE__\\\",{}]},\\\"$undefined\\\",\\\"$undefined\\\",true],[[\\\"$\\\",\\\"$1\\\",\\\"c\\\",{\\\"children\\\":[[[\\\"$\\\",\\\"link\\\",\\\"0\\\",{\\\"rel\\\":\\\"stylesheet\\\",\\\"href\\\":\\\"/_next/static/chunks/754ab285cbdb904c.css\\\",\\\"precedence\\\":\\\"next\\\",\\\"crossOrigin\\\":\\\"$undefined\\\",\\\"nonce\\\":\\\"$undefined\\\"}]],[\\\"$\\\",\\\"html\\\",null,{\\\"lang\\\":\\\"en\\\",\\\"children\\\":[\\\"$\\\",\\\"body\\\",null,{\\\"className\\\":\\\"inter_5972bc34-module__OU16Qa__className\\\",\\\"children\\\":[\\\"$\\\",\\\"$L2\\\",null,{\\\"parallelRouterKey\\\":\\\"children\\\",\\\"error\\\":\\\"$undefined\\\",\\\"errorStyles\\\":\\\"$undefined\\\",\\\"errorScripts\\\":\\\"$undefined\\\",\\\"template\\\":[\\\"$\\\",\\\"$L3\\\",null,{}],\\\"templateStyles\\\":\\\"$undefined\\\",\\\"templateScripts\\\":\\\"$undefined\\\",\\\"notFound\\\":[[[\\\"$\\\",\\\"title\\\",null,{\\\"children\\\":\\\"404: This page could not be found.\\\"}],[\\\"$\\\",\\\"div\\\",null,{\\\"style\\\":{\\\"fontFamily\\\":\\\"system-ui,\\\\\\\"Segoe UI\\\\\\\",Roboto,Helvetica,Arial,sans-serif,\\\\\\\"Apple Color Emoji\\\\\\\",\\\\\\\"Segoe UI Emoji\\\\\\\"\\\",\\\"height\\\":\\\"100vh\\\",\\\"textAlign\\\":\\\"center\\\",\\\"display\\\":\\\"flex\\\",\\\"flexDirection\\\":\\\"column\\\",\\\"alignItems\\\":\\\"center\\\",\\\"justifyContent\\\":\\\"center\\\"},\\\"children\\\":[\\\"$\\\",\\\"div\\\",null,{\\\"children\\\":[[\\\"$\\\",\\\"style\\\",null,{\\\"dangerouslySetInnerHTML\\\":{\\\"__html\\\":\\\"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}\\\"}}],[\\\"$\\\",\\\"h1\\\",null,{\\\"className\\\":\\\"next-error-h1\\\",\\\"style\\\":{\\\"display\\\":\\\"inline-block\\\",\\\"margin\\\":\\\"0 20px 0 0\\\",\\\"padding\\\":\\\"0 23px 0 0\\\",\\\"fontSize\\\":24,\\\"fontWeight\\\":500,\\\"verticalAlign\\\":\\\"top\\\",\\\"lineHeight\\\":\\\"49px\\\"},\\\"children\\\":404}],[\\\"$\\\",\\\"div\\\",null,{\\\"style\\\":{\\\"display\\\":\\\"inline-block\\\"},\\\"children\\\":[\\\"$\\\",\\\"h2\\\",null,{\\\"style\\\":{\\\"fontSize\\\":14,\\\"fontWeight\\\":400,\\\"lineHeight\\\":\\\"49px\\\",\\\"margin\\\":0},\\\"children\\\":\\\"This page could not be found.\\\"}]}]]}]}]],[]],\\\"forbidden\\\":\\\"$undefined\\\",\\\"unauthorized\\\":\\\"$undefined\\\"}]}]}]]}],{\\\"children\\\":[[\\\"$\\\",\\\"$1\\\",\\\"c\\\",{\\\"children\\\":[[\\\"$\\\",\\\"$L4\\\",null,{\\\"Component\\\":\\\"$5\\\",\\\"serverProvidedParams\\\":{\\\"searchParams\\\":{},\\\"params\\\":{},\\\"promises\\\":[\\\"$@6\\\",\\\"$@7\\\"]}}],[[\\\"$\\\",\\\"script\\\",\\\"script-0\\\",{\\\"src\\\":\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"}],[\\\"$\\\",\\\"script\\\",\\\"script-1\\\",{\\\"src\\\":\\\"/_next/static/chunks/c7f68f5d4d338c75.js\\\",\\\"async\\\":true,\\\"nonce\\\":\\\"$undefined\\\"}]],[\\\"$\\\",\\\"$L8\\\",null,{\\\"children\\\":[\\\"$\\\",\\\"$9\\\",null,{\\\"name\\\":\\\"Next.MetadataOutlet\\\",\\\"children\\\":\\\"$@a\\\"}]}]]}],{},null,false,false]},null,false,false],[\\\"$\\\",\\\"$1\\\",\\\"h\\\",{\\\"children\\\":[null,[\\\"$\\\",\\\"$Lb\\\",null,{\\\"children\\\":\\\"$Lc\\\"}],[\\\"$\\\",\\\"div\\\",null,{\\\"hidden\\\":true,\\\"children\\\":[\\\"$\\\",\\\"$Ld\\\",null,{\\\"children\\\":[\\\"$\\\",\\\"$9\\\",null,{\\\"name\\\":\\\"Next.Metadata\\\",\\\"children\\\":\\\"$Le\\\"}]}]}],[\\\"$\\\",\\\"meta\\\",null,{\\\"name\\\":\\\"next-size-adjust\\\",\\\"content\\\":\\\"\\\"}]]}],false]],\\\"m\\\":\\\"$undefined\\\",\\\"G\\\":[\\\"$f\\\",[]],\\\"S\\\":true}\\n\"])</script><script>self.__next_f.push([1,\"6:{}\\n7:\\\"$0:f:0:1:1:children:0:props:children:0:props:serverProvidedParams:params\\\"\\n\"])</script><script>self.__next_f.push([1,\"c:[[\\\"$\\\",\\\"meta\\\",\\\"0\\\",{\\\"charSet\\\":\\\"utf-8\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"1\\\",{\\\"name\\\":\\\"viewport\\\",\\\"content\\\":\\\"width=device-width, initial-scale=1\\\"}]]\\n\"])</script><script>self.__next_f.push([1,\"10:I[27201,[\\\"/_next/static/chunks/ff1a16fafef87110.js\\\",\\\"/_next/static/chunks/d2be314c3ece3fbe.js\\\"],\\\"IconMark\\\"]\\na:null\\ne:[[\\\"$\\\",\\\"title\\\",\\\"0\\\",{\\\"children\\\":\\\"Anchor - Trade Crypto with Confidence\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"1\\\",{\\\"name\\\":\\\"description\\\",\\\"content\\\":\\\"The most trusted platform for cryptocurrency trading. Buy, sell, and manage your digital assets with ease.\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"2\\\",{\\\"name\\\":\\\"keywords\\\",\\\"content\\\":\\\"cryptocurrency, trading, bitcoin, ethereum, crypto exchange, digital assets\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"3\\\",{\\\"property\\\":\\\"og:title\\\",\\\"content\\\":\\\"Anchor - Trade Crypto with Confidence\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"4\\\",{\\\"property\\\":\\\"og:description\\\",\\\"content\\\":\\\"The most trusted platform for cryptocurrency trading\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"5\\\",{\\\"property\\\":\\\"og:image\\\",\\\"content\\\":\\\"http://localhost:10000/og-image.png\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"6\\\",{\\\"property\\\":\\\"og:image:width\\\",\\\"content\\\":\\\"1200\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"7\\\",{\\\"property\\\":\\\"og:image:height\\\",\\\"content\\\":\\\"630\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"8\\\",{\\\"property\\\":\\\"og:type\\\",\\\"content\\\":\\\"website\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"9\\\",{\\\"name\\\":\\\"twitter:card\\\",\\\"content\\\":\\\"summary_large_image\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"10\\\",{\\\"name\\\":\\\"twitter:title\\\",\\\"content\\\":\\\"Anchor - Trade Crypto with Confidence\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"11\\\",{\\\"name\\\":\\\"twitter:description\\\",\\\"content\\\":\\\"The most trusted platform for cryptocurrency trading\\\"}],[\\\"$\\\",\\\"meta\\\",\\\"12\\\",{\\\"name\\\":\\\"twitter:image\\\",\\\"content\\\":\\\"http://localhost:10000/og-image.png\\\"}],[\\\"$\\\",\\\"link\\\",\\\"13\\\",{\\\"rel\\\":\\\"icon\\\",\\\"href\\\":\\\"/favicon.png\\\"}],[\\\"$\\\",\\\"link\\\",\\\"14\\\",{\\\"rel\\\":\\\"apple-touch-icon\\\",\\\"href\\\":\\\"/anchor-icon.png\\\"}],[\\\"$\\\",\\\"$L10\\\",\\\"15\\\",{}]]\\n\"])</script></body></html>\n    ^\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Anclap — `anclap.com`

- **Directory account:** `GA4TDPNUCZPTOHB3TKUYMDCRVATXKEADH7ZEYEBWJKQKE2UBFCYNBPEN`
- **Tags:** `custodian`, `anchor`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 0.1.0



### Service endpoints

- **SEP-2 Federation** — `https://federation.anclap.com/federation`
- **SEP-6 Deposit/Withdrawal** — `https://api.anclap.com/transfer6`
- **SEP-24 Interactive Deposit/Withdrawal** — `https://api.anclap.com/transfer24`
- **SEP-12 KYC** — `https://api.anclap.com/kycserver12`
- **SEP-10 Web Auth** — `https://api.anclap.com/auth`
- **Signing key** — `GDVHOU4AF2QINLYETV2YFC7YWPRVXN4SKR6SOJZ7LAWODJIZJ7ZPJUER`
- **URI request signing key (SEP-7)** — `GBUZEC7HXFYQTPSWLJQULHRMEH372KBIMKS4YNBOFNKAYRIZR6MMYJUU`



### Organization documentation

- **ORG_NAME** — Grupo Anchor S.A.
- **ORG_DBA** — Anclap
- **ORG_URL** — https://anclap.com
- **ORG_DESCRIPTION** — Fintech Services
- **ORG_KEYBASE** — anclap_fintech
- **ORG_TWITTER** — AnclapFintech
- **ORG_OFFICIAL_EMAIL** — info@anclap.com
- **ORG_SUPPORT_EMAIL** — info@anclap.com



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **PEN** | `GA4TDPNUCZPTOHB3TKUYMDCRVATXKEADH7ZEYEBWJKQKE2UBFCYNBPEN` | live | fiat | PEN | 2 |
| **ARS** | `GCYE7C77EB5AWAA25R5XMWNI2EDOKTTFTTPZKM2SR5DI4B4WFD52DARS` | live | fiat | ARS | 2 |



### Accounts

- `GCYE7C77EB5AWAA25R5XMWNI2EDOKTTFTTPZKM2SR5DI4B4WFD52DARS`
- `GA4TDPNUCZPTOHB3TKUYMDCRVATXKEADH7ZEYEBWJKQKE2UBFCYNBPEN`
- `GARDJZ33FTTLVKGABXDS22SYNTP4VCLYARIEWKMZKYHX3RRLPMNR3HOT`

---

## AnclaX — `anclax.com`

- **Directory account:** `GAEDLNMCQZOSLY7Y4NW3DTEWQEVVCXYYMBDNGPPGBMQH4GFYECBI7YVK`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## ApisCapital — `apiscapitalfunds.com`

- **Directory account:** `GCYKQ2627BPKMSUZJK64GPYVKD4TRNACP45X6B754PR6TCYJXCHGUTWB`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 403 — {"status":"http-error","httpStatus":403,"reason":"Forbidden"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## APS.Money - Advanced Payment Solutions Ltd. — `aps.money`

- **Directory account:** `GBN32NH6TMWE4ZD4G245CF3UVOQRXD4FK3FDCLZ4DE5642HWFKSLLRMB`
- **Tags:** `custodian`, `anchor`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — Advanced Payment Solutions Ltd.
- **ORG_DBA** — Advanced Payment Solutions
- **ORG_URL** — https://www.aps.money
- **ORG_LOGO** — https://aps.money/wp-content/uploads/2022/05/APS-footer-logo.png
- **ORG_PHYSICAL_ADDRESS** — Nur-Sultan, KZ
- **ORG_OFFICIAL_EMAIL** — support@aps.money
- **ORG_PHONE_NUMBER** — +77172793015
- **ORG_LICENSE_TYPE** — Providing Money Services
- **ORG_LICENSE_NUMBER** — AFSA-G-LA-2021-0017
- **ORG_LICENSING_AUTHORITY** — Astana Financial Services Authority



### Principals

**Principal 1**
  - **name** — Serik Igbayev
  - **email** — contacts@aps.money



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **APSBRLM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | BRL | — |
| **APSCLPM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | CLP | — |
| **APSEURM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | EUR | — |
| **APSIDRM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | IDR | — |
| **APSINRM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | INR | — |
| **APSKZTM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | KZT | — |
| **APSMYRM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | MYR | — |
| **APSPENM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | PEN | — |
| **APSRUBM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | RUB | — |
| **APSTHBM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | THB | — |
| **APSUAHM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | UAH | — |
| **APSUSDM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | USD | — |
| **APSVNDM** | `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT` | — | fiat | VND | — |



### Accounts

- `GB7OUO5NY5WQKXJJ7PFFZEJOKN4BA7IOEN3Z6SWAY26LGTREJJYZH2ZT`
- `GBN32NH6TMWE4ZD4G245CF3UVOQRXD4FK3FDCLZ4DE5642HWFKSLLRMB`

---

## AQUA Issuer — `aqua.network`

- **Directory account:** `GAXSGZ2JM3LNWOO4WRGADISNMWO4HQLG4QBGUZRKH5ZHL3EQBGX73ICE`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 2.3.0



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — Aquarius
- **ORG_DBA** — AQUA token
- **ORG_URL** — https://aqua.network/
- **ORG_LOGO** — https://aqua.network/assets/img/aqua-logo.png
- **ORG_OFFICIAL_EMAIL** — hello@aqua.network
- **ORG_SUPPORT_EMAIL** — support@aqua.network
- **ORG_TWITTER** — aqua_token
- **ORG_DESCRIPTION** — Aquarius is a next generation AMM platform for Stellar.



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **AQUA** | `GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA` | — | — | — | 7 |
| **ICE** | `GAXSGZ2JM3LNWOO4WRGADISNMWO4HQLG4QBGUZRKH5ZHL3EQBGX73ICE` | — | — | — | 7 |
| **dICE** | `GAXSGZ2JM3LNWOO4WRGADISNMWO4HQLG4QBGUZRKH5ZHL3EQBGX73ICE` | — | — | — | 7 |
| **governICE** | `GAXSGZ2JM3LNWOO4WRGADISNMWO4HQLG4QBGUZRKH5ZHL3EQBGX73ICE` | — | — | — | 7 |
| **upvoteICE** | `GAXSGZ2JM3LNWOO4WRGADISNMWO4HQLG4QBGUZRKH5ZHL3EQBGX73ICE` | — | — | — | 7 |
| **downvoteICE** | `GAXSGZ2JM3LNWOO4WRGADISNMWO4HQLG4QBGUZRKH5ZHL3EQBGX73ICE` | — | — | — | 7 |
| **gdICE** | `GAXSGZ2JM3LNWOO4WRGADISNMWO4HQLG4QBGUZRKH5ZHL3EQBGX73ICE` | — | — | — | 7 |



### Accounts

_None._

---

## Astral9 — `astral9.io`

- **Directory account:** `GAUWES2POH347NNJGRI4OBM34LMOCMWSTZ3RAOZMOBH4PFVBWFMHLNTC`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## AtlantisBlue — `atlantisblue.org`

- **Directory account:** `GDZURZR6RZKIQVOWZFWPVAUBMLLBQGXP2K5E5G7PEOV75IYPDFA36WK4`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 403 — {"status":"http-error","httpStatus":403,"reason":"Forbidden"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Auskunft — `auskunft.de`

- **Directory account:** `GABQBEZCNQRUHURCG6E2UZC6QXXEPLALHBVA6J6IQNKNJL66VPY7FO7G`
- **Tags:** `anchor`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html><html lang=\"de\"><head><title>auskunft.de - Auskunft zu lokalen Unternehmen und Geschäften</title><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"description\" content=\"Auskunft zu lokalen Unternehmen und Dienstleistern in Ihrer Region.\"><meta name=\"author\" content=\"auskunft.de\"><meta name=\"robots\" content=\"index, follow\"><meta property=\"og:type\" content=\"website\"><meta property=\"og:title\" content=\"auskunft.de - Auskunft zu lokalen Unternehmen und Geschäften\"><meta property=\"og:site_name\" content=\"auskunft.de\"><meta property=\"og:locale\" content=\"de_DE\"><meta property=\"og:url\" content=\"https://www.auskunft.de/\"><meta property=\"og:image\" content=\"https://www.auskunft.de/assets/logo.png\"><meta property=\"og:description\" content=\"Auskunft zu lokalen Unternehmen und Dienstleistern in Ihrer Region.\"><meta property=\"pub\"><link rel=\"icon\" type=\"image/x-icon\" href=\"/assets/logo.png\"><link rel=\"apple-touch-icon\" href=\"/assets/logo.png\"><link rel=\"preload\" as=\"image\" href=\"/assets/backgrounds.svg\"><link rel=\"stylesheet\" href=\"/stylesheets/mystyle.css\" media=\"screen\"><style>.logo {\n    ^\n2:   display: block;\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## BARSF — `bac.gold`

- **Directory account:** `GBITI7JTLGGQ6J6F3LT4ZTBW6Q67KLZJG7KNR73QGW74YLWG3VA4CAZR`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Bitbond — `bitbondsto.com`

- **Directory account:** `GD5J6HLF5666X4AZLTFTXLY46J5SW7EXRKBLEYPJP33S33MXZGV6CWFN`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — Bitbond Finance GmbH
- **ORG_DBA** — Bitbond Finance
- **ORG_URL** — https://www.bitbondsto.com
- **ORG_DESCRIPTION** — Bitbond Finance is the issuer of the tokenized bond BB1. The company funds SME loans with the proceeds from its BB1 security token offering.
- **ORG_PHYSICAL_ADDRESS** — Lottumstrasse 26, 10119 Berlin, Germany
- **ORG_PHONE_NUMBER** — +4932211122241
- **ORG_TWITTER** — Bitbond
- **ORG_GITHUB** — bitbond
- **ORG_OFFICIAL_EMAIL** — invest@bitbondsto.com



### Principals

**Principal 1**
  - **name** — Radoslav Albrecht
  - **email** — invest@bitbondsto.com
  - **twitter** — RadkoAlbrecht



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **BB1** | `GD5J6HLF5666X4AZLTFTXLY46J5SW7EXRKBLEYPJP33S33MXZGV6CWFN` | — | — | — | 0 |



### Accounts

- `GD5J6HLF5666X4AZLTFTXLY46J5SW7EXRKBLEYPJP33S33MXZGV6CWFN`
- `GDDNUTFMGY4FSFD2I2WZNWGRU2WLJEA2YEY5IGNXS6ZBCZYOVOXGCZHX`

---

## BitcoinX — `bitx.tk`

- **Directory account:** `GBBAMI2WU6WJHDL3CQKT4LPXUC76WCEMQJMJIVQGL2G5IKJ2JHEVHG3G`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## BosTravel — `bostravel.online`

- **Directory account:** `GATTH3VPK4PMXLE7JSEJ3OC72OYOGJYINLHSCJX365BP6SAV6GKSHJAV`
- **Tags:** `issuer`, `anchor`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Centre — `centre.io`

- **Directory account:** `GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — Centre Consortium LLC
- **ORG_DBA** — Centre Consortium
- **ORG_URL** — https://www.centre.io
- **ORG_LOGO** — https://www.centre.io/images/logo-icon.png
- **ORG_PHYSICAL_ADDRESS** — San Francisco, CA
- **ORG_OFFICIAL_EMAIL** — usdc@centre.io
- **ORG_GITHUB** — centrehq
- **ORG_TWITTER** — centre_io
- **ORG_DESCRIPTION** — Centre Consortium is a joint venture aimed at establishing a standard for fiat on the internet and providing a governance framework and network for the global, mainstream adoption of fiat stablecoins…



### Principals

**Principal 1**
  - **name** — David Puth
  - **email** — usdc@centre.io



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **USDC** | `GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN` | — | fiat | USD | — |



### Accounts

- `GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN`
- `GDEWOLMOPAVRTGNJVWOE6U6LHZVAWIJZVWM6PDLCFTUTJJEKSU32TO5W`

---

## CharnaToken — `charnatoken.top`

- **Directory account:** `GBRPTWEZTUKYM6VJXLHXBFI23M2GSY3TCVIQSZKFQLMOJXH7VPDGKBDP`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Citron — `citron.cash`

- **Directory account:** `GBOAYBE3NJKS4WPIVM2H5DVFIDYLAHHD2DAWYL5LLUVYF77M3JIVGCTR`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## CityStates — `citystatesm.com`

- **Directory account:** `GAFWA2DAM34MK3UVD34ECEHO5QIO2ILHLFOPJC33INPGUPLBC2EVNCSM`
- **Tags:** `issuer`, `anchor`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## ClickPesa — `clickpesa.com`

- **Directory account:** `GA2MSSZKJOU6RNL3EJKH3S5TB5CDYTFQFWRYFGUJVIN5I6AOIRTLUHTO`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## CowrieExchange - Abandoned — `cowrie.exchange`

- **Directory account:** `GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 2.0.0



### Service endpoints

- **SEP-2 Federation** — `https://api.cowrie.exchange/federation`
- **SEP-3 Auth (deprecated)** — `https://api.cowrie.exchange/auth`
- **SEP-6 Deposit/Withdrawal** — `https://api.cowrie.exchange/transfer`
- **SEP-12 KYC** — `https://api.cowrie.exchange/kyc`
- **SEP-10 Web Auth** — `https://api.cowrie.exchange/web_auth`
- **SEP-31 Cross-Border Payments** — `https://api.cowrie.exchange/sep31/direct`
- **Signing key** — `GBQZOJE2GWJU5VBT6NBLD2F3IOVOYUBDAXYUU32XMHDF4RMDOURWV3GT`



### Organization documentation

- **ORG_NAME** — Cowrie Integrated Systems
- **ORG_DBA** — Cowrie Exchange
- **ORG_URL** — https://www.cowrie.exchange
- **ORG_LOGO** — https://cowrie.exchange/ngnt-logo.png
- **ORG_DESCRIPTION** — Cowrie Integrated Systems is a fintech company that provides value added services over electronic payment networks
- **ORG_PHYSICAL_ADDRESS** — 3rd Floor, 24a Campbell Street, Lagos, Nigeria
- **ORG_PHONE_NUMBER** — +2347038662037
- **ORG_TWITTER** — cowrie_exchange
- **ORG_GITHUB** — cowriesys
- **ORG_OFFICIAL_EMAIL** — support@cowrie.exchange
- **ORG_SUPPORT_EMAIL** — support@cowrie.exchange



### Principals

**Principal 1**
  - **name** — Gbubemi Agbeyegbe
  - **email** — gbubemi.agbeyegbe@cowriesys.com
  - **keybase** — gdini2003
  - **telegram** — gdini2003
  - **twitter** — gdini2003
  - **github** — gdini2003



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **NGNT** | `GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD` | live | fiat | NGN | 2 |



### Accounts

- `GAWODAROMJ33V5YDFY3NPYTHVYQG7MJXVJ2ND3AOGIHYRWINES6ACCPD`
- `GBQZOJE2GWJU5VBT6NBLD2F3IOVOYUBDAXYUU32XMHDF4RMDOURWV3GT`
- `GDI5EK4HNMBHJJQGP3GUXQJIIOHU2CJO3LABPWD6WYSPJZP5NP67TMNN`
- `GBSKKRM7RRDHC33O6KFNLUSPS3577F7GYSFFVBVV5J5PDWGY4XWERE3W`

---

## Cryptomover — `cryptomover.com`

- **Directory account:** `GBWZHAVWY23QKKDJW7TXLSIHY5EX4NIB37O4NMRKN2SKNWOSE5TEPCY3`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"This operation was aborted"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## eQuid — `equid.co`

- **Directory account:** `GCGEQJR3E5BVMQYSNCHPO6NPP3KOT4VVZHIOLSRSNLE2GFY7EWVSLLTN`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## FactR — `www.factrpay.io`

- **Directory account:** `GAQ6W5I7LIWQAE47ZY7EQWRVVF2JELYXG6OKL7HHOSL5MWVEIGRPGYCO`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html><html lang=\"en\"  data-adblockkey=MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANnylWw2vLY4hUn9w06zQKbhKBfvjFUCsdFlb6TdQhxb9RXWXuI4t31c+o8fYOv/s8q1LGPga3DE1L/tHU4LENMCAwEAAQ==_GBXl3X3S3dCV6C/zw8EINXCSHqswwMA910gx8LwbQG8dC/fki+llrHMlpm8J5u7Gu4kCFZBEl4340iroQeCtlg==><head><meta charset=\"utf-8\"><title>factrpay.io&nbsp;-&nbsp;factrpay Resources and Information.</title><meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0\"><meta name=\"description\" content=\"factrpay.io is your first and best source for information about factrpay. Here you will also find topics relating to issues of general interest. We hope you find what you are looking for!\"><link\n    ^\n2:         rel=\"icon\"\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Firefly — `fchain.io`

- **Directory account:** `GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

- **SEP-2 Federation** — `https://api.fchain.io/federation`
- **SEP-6 Deposit/Withdrawal** — `https://api.fchain.io`
- **Public Horizon** — `https://h.fchain.io`



### Organization documentation

- **ORG_NAME** — Muyu Network
- **ORG_URL** — https://fchain.io
- **ORG_LOGO** — https://fchain.io/img/logo.png
- **ORG_GITHUB** — fchainio
- **ORG_OFFICIAL_EMAIL** — hello@fchain.io
- **ORG_SUPPORT_EMAIL** — support@fchain.io



### Principals

**Principal 1**
  - **name** — Han Feng
  - **email** — hanfeng@fchain.io
  - **telegram** — naobtc
  - **twitter** — naobtc
  - **keybase** — hanfeng
  - **github** — manran



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **XRP** | `GBXRPL45NPHCVMFFAYZVUVFFVKSIZ362ZXFP7I2ETNQ3QKZMFLPRDTD5` | — | crypto | XRP | — |
| **XFF** | `GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF` | — | — | — | — |
| **XCN** | `GCNY5OXYSY4FKHOPT2SPOQZAOEIGXB5LBYW3HVU3OWSTQITS65M5RCNY` | — | — | — | — |
| **BTC** | `GATEMHCCKCY67ZUCKTROYN24ZYT5GK4EQZ65JJLDHKHRUZI3EUEKMTCH` | — | — | — | — |
| **BCH** | `GBCHK4TINAK6KXTD4BBWWKR5BI2OKJ7C7HYX55BJ5I4KHNQMTL5UXBCH` | — | crypto | BCH | — |
| **ETH** | `GBETHKBL5TCUTQ3JPDIYOZ5RDARTMHMEKIO2QZQ7IOZ4YC5XV3C2IKYU` | — | crypto | ETH | — |
| **USDT** | `GBETHKBL5TCUTQ3JPDIYOZ5RDARTMHMEKIO2QZQ7IOZ4YC5XV3C2IKYU` | — | crypto | USDT | — |
| **STM** | `GCMS2VO5ANJCESJBZVC3INFSETS3K4UWMU47W7KSQ2BYASEQAN4NUSTM` | — | crypto | STM | — |
| **WICC** | `GACKZW62KSR37PEVRN6RUO2GKRONUZ5OHDUAEXJ3HFF3UN4RGDFEIIUU` | — | — | — | — |



### Accounts

- `GAZEX2USUBMMWFRZFS77VDJYXUFLXI4ZGFPWX6TBNZCSTEQWNLFZMXFF`
- `GCNY5OXYSY4FKHOPT2SPOQZAOEIGXB5LBYW3HVU3OWSTQITS65M5RCNY`
- `GATEMHCCKCY67ZUCKTROYN24ZYT5GK4EQZ65JJLDHKHRUZI3EUEKMTCH`
- `GBCHK4TINAK6KXTD4BBWWKR5BI2OKJ7C7HYX55BJ5I4KHNQMTL5UXBCH`
- `GBETHKBL5TCUTQ3JPDIYOZ5RDARTMHMEKIO2QZQ7IOZ4YC5XV3C2IKYU`
- `GCMS2VO5ANJCESJBZVC3INFSETS3K4UWMU47W7KSQ2BYASEQAN4NUSTM`
- `GACKZW62KSR37PEVRN6RUO2GKRONUZ5OHDUAEXJ3HFF3UN4RGDFEIIUU`
- `GBXRPL45NPHCVMFFAYZVUVFFVKSIZ362ZXFP7I2ETNQ3QKZMFLPRDTD5`
- `GAXELY4AOIRVONF7V25BUPDNKZYIVT6CWURG7R2I6NQU26IQSQODBVCS`
- `GCZBJ6KTNNGYFJUHM7JLIVPXCKF4244KGIULAFITYXE2NCSP2CW3CALL`

---

## Flutterwave — `flutterwave.com`

- **Directory account:** `GCC4YLCR7DDWFCIPTROQM7EB2QMFD35XRWEQVIQYJQHVW6VE5MJZXIGW`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Frasindo — `frasindo.com`

- **Directory account:** `GC75WHUIMU7LV6WURMCA5GGF2S5FWFOK7K5VLR2WGRKWKZQAJQEBM53M`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"\n    ^\n2:         \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## FreightCoin — `freight-coin.com`

- **Directory account:** `GDGDECMFS34OVTQJKTCHORPE7LOYDH2XYNRMUHLGCJFP56VUN6AW5LCF`
- **Tags:** `anchor`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Funtracker — `funtracker.site`

- **Directory account:** `GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

- **SEP-2 Federation** — `https://www.funtracker.site/fed2/`



### Organization documentation

_No `[DOCUMENTATION]` block._



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **USD** | `GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU` | — | — | — | — |
| **BTC** | `GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU` | — | — | — | — |
| **THB** | `GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU` | — | — | — | — |
| **mBTC** | `GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU` | — | — | — | — |
| **FUNT** | `GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU` | — | — | — | 4 |
| **BEER** | `GDW3CNKSP5AOTDQ2YCKNGC6L65CE4JDX3JS5BV427OB54HCF2J4PUEVG` | — | — | — | 4 |
| **INR** | `GBUYUAI75XXWDZEKLY66CFYKQPET5JR4EENXZBUZ3YXZ7DS56Z4OKOFU` | — | — | — | 4 |



### Accounts

_None._

---

## Glitzkoin — `glitzkoin.com`

- **Directory account:** `GARFMAHQM4JDI55SK2FGEPLOZU7BTEODS3Y5QNT3VMQQIU3WV2HTBA46`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## GoodX — `goodx.network`

- **Directory account:** `GBE27W2DJZS4AFFR2HVZBK4KHD4TQQ4ITB2AQTYA5L57K6ZTRWPJUDH6`
- **Tags:** `anchor`, `memo-required`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Gratz — `gratz.io`

- **Directory account:** `GAJ7V3EMD3FRWAPBEJAP7EC4223XI5EACDZ46RFMY5DYOMCIMWEFR5II`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 2.0.0



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — Gratz
- **ORG_DESCRIPTION** — Decentralized network for real-world requests, local execution, and peer-to-peer settlement.
- **ORG_OFFICIAL_EMAIL** — gratz@gratz.io
- **ORG_URL** — https://gratz.io
- **ORG_LOGO** — https://gratz.io/gratz.png



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **GRAT** | `GAJ7V3EMD3FRWAPBEJAP7EC4223XI5EACDZ46RFMY5DYOMCIMWEFR5II` | live | crypto | — | 7 |



### Accounts

- `GAJ7V3EMD3FRWAPBEJAP7EC4223XI5EACDZ46RFMY5DYOMCIMWEFR5II`
- `GAXQJANVLNXSLGXJZUHRXY2VD62E2JXK2ZFWUQZZNO7I2HESYIWLGRAT`
- `GBVWQZITQY4PPGHJEOHDTKUPV56WQXQBTV2YMMUPYW7KEQI63LETZONE`
- `GAU7MPFCR2VUXNEN474G5OY63EFVBU77F35OJDQ4WGG25XHT3VYWLIQD`
- `GB6WD37NWIIY34A6HNIUVGSA7XXAHG6G6QEWNL54H62Y6SU7ESNGBRDG`
- `GBEKGNPT3DC6HPSWUXSAQRU6GRIGXFQOY2DPK47MQA6MEGAZ755DTEAM`
- `GAB4NHMAVPDCD7MRU7MRD6DV47KLGO24K7WR3VKITLKAPTFIBRRGGRNT`
- `GDMXLK6HCJ6TWR7TSBCAR2QDQ5GOMPKRRHLN5SES3CMHEKSHNIRAONBD`
- `GDLTEDSHH7EQQYSFLD5RRJVTTGEGGXDHMLWH6A5ATTMCE2AUDSK3FUND`
- `GBSREZLYHRAKQXQM4OESVO7FFT2RGG3EQQRTXEPTRPS56UI3VAXBXMAP`

---

## Heir — `heir.io`

- **Directory account:** `GA6KR5DMGJ6OPPG4OONB65JPU3TZE2CWCLKTBV4DHXFA2Z4XKWQSVCTC`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html><html><head><script>window.onload=function(){window.location.href=\"/lander\"}</script></head></html>\n    ^\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## HotToken — `hotoken.io`

- **Directory account:** `GB6DMQ5IZUPRRMNTPU4H5FX32DRYCZ447REBEQ32YGVPPGZI5MX4AHOT`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"This operation was aborted"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## IreneEnergy — `irene.energy`

- **Directory account:** `GBBRMEXJMS3L7Y3DZZ2AHBD545GZ72OAEHHEFKGZAHHASHGWMHK5P6PL`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Ixinium — `ixinium.io`

- **Directory account:** `GC4HS4CQCZULIOTGLLPGRAAMSBDLFRR6Y7HCUQG66LNQDISXKIXXADIM`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — Baltic Representative Office
- **ORG_DBA** — Ixinium
- **ORG_DESCRIPTION** — Ixinium XXA, the first Stellar network token with an automated BuyBack process.
- **ORG_PHYSICAL_ADDRESS** — Estonia, Reg.No 14559515
- **ORG_URL** — https://ixinium.io
- **ORG_LOGO** — https://ixinium.io/img/main_logo.png
- **ORG_KEYBASE** — ixinium
- **ORG_TWITTER** — https://twitter.com/OIxinium
- **ORG_OFFICIAL_EMAIL** — office@ixinium.io
- **ORG_LICENSING_AUTHORITY** — EU/EE/FIU
- **ORG_LICENSE_TYPE** — Financial License
- **ORG_LICENSE_NUMBER** — FFA000389



### Principals

**Principal 1**
  - **name** — Ixinium Founder: Marko Pakarinen
  - **email** — marko.pakarinen@ixinium.io

**Principal 2**
  - **name** — Ixinium CEO: Kimmo Saari
  - **email** — kimmo.saari@ixinium.io



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **XXA** | `GC4HS4CQCZULIOTGLLPGRAAMSBDLFRR6Y7HCUQG66LNQDISXKIXXADIM` | live | — | — | 7 |
| **IXAT** | `GCSECMDTZDHAUCTZJO4Z3BGAGDKKV77TBGPBWPOAJUE6Z5N5JEU4CY4R` | live | — | — | 7 |



### Accounts

- `GC4HS4CQCZULIOTGLLPGRAAMSBDLFRR6Y7HCUQG66LNQDISXKIXXADIM`
- `GBQU526F73OALRTDRUI4F2DXKJOHLW2PCS6G53SPRQVKAALM7TFCLAAO`
- `GC4O3BHXHQWSBFYSJP2HMAAHWDDHRJDM6X5CX7LK3C5O4ZX4E4MA54RQ`
- `GBT3IN7AUUCEN2YJY6PKGQRC352MUYQZLSKVELO35ZICFOOLXVFKMJKG`
- `GBJ7Q47BMTDOU3LJKARS6JYLVO3AXT3VTEZYVJXYUQS3WACHX5B4QYBS`
- `GDRNVZRLMWGK6YITXIPEYNRTRYWRWVJN5SFXXQK4RPF5CXIDZGTBLFM7`
- `GCRX6MPZ4YUGEPRS7Z427T3LMTQXVZ5T24C5IXT6JBKG77PR72S5P5TI`
- `GBMBDOEUIOBTABN5SLP623NPEEBR4TKLXOTQ7JWOVZMKJZU74IXODER4`
- `GBG7ISYM33ORWDDXCVL7ZPTHCKTFDACOEPCO2RUDPNRHJXBKPCSAVBVI`
- `GDFHYYZNM5RQRTHL6DX3RTFFL6LZJOCI6MYMHHOIXB766RXG3NSVNWGF`

---

## Jetmint — `jetmint.org`

- **Directory account:** `GCQHDR2KSCVNULFX3C2NKFEXNJEUELJVMQAN3OCLAM5KXG4DWQSRMXYZ`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## LEVELG — `levelg.net`

- **Directory account:** `GC3L2FLR2QMUSOJ6QMQHKIWUKEXGOXSIN2KY72SDUHPC2KO6HOSQIXIF`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Lobstr Merge Tool — `merge.lobstr.co`

- **Directory account:** `GCT7CDHENF5ZILWGNWUXGEWNS6XWM4HDT22LDC2EJ7PKM4SPVXFHOOOO`
- **Tags:** `anchor`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Luckybird — `luckybird.io`

- **Directory account:** `GALT7UN5VC5Z4KLZAZK6JMSC7ECUCDCCYY2P4R7Q3S7PYNF5WW3WPOLL`
- **Tags:** `anchor`, `memo-required`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Lux Payband — `luxpayband.io`

- **Directory account:** `GDTEQF6YGCKLIBD37RJZE5GTL3ZY6CBQIKH7COAW654SYEBE6XJJOLOW`
- **Tags:** `anchor`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — LUX Payband, LLC
- **ORG_DBA** — LUX Payband
- **ORG_URL** — https://luxpayband.io
- **ORG_LOGO** — https://luxpayband.io/img/LuxLogo21822.png
- **ORG_DESCRIPTION** — Festival & Events Loyalty & Rewards Tokens
- **ORG_PHYSICAL_ADDRESS** — Chicago, IL
- **ORG_PHONE_NUMBER** — +18665140951
- **ORG_TWITTER** — LuxPayband
- **ORG_OFFICIAL_EMAIL** — info@luxpayband.io



### Principals

**Principal 1**
  - **name** — Support
  - **twitter** — LuxPayband
  - **email** — info@luxpayband.io



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **PYBC** | `GBVB43NLVIP2USHXSKI7QQCZKZU2Z6U6A5PAHMIW7LLNVMQJTOX2BZI5` | live | — | — | 7 |
| **USDP** | `GDTEQF6YGCKLIBD37RJZE5GTL3ZY6CBQIKH7COAW654SYEBE6XJJOLOW` | live | — | — | 7 |
| **POINTS** | `GDARCVAHFMA7GCCULAPCRAV7VXSFFMNOP3X6ZONDJU4SCJULZ6IJ77QD` | live | — | — | 7 |
| **FOOD** | `GBYYKQYUY2XWVMM4VFCBJJVCCQC3QJ3BCLV4276DWHY4BQ7V5AB4U5VA` | live | — | — | 7 |
| **DRINKS** | `GDTEQF6YGCKLIBD37RJZE5GTL3ZY6CBQIKH7COAW654SYEBE6XJJOLOW` | live | — | — | 7 |
| **TICKETS** | `GDIU57QSVCGU7MTRC53RUWAADKIE75GFNG27C26URMU7CKHNXOQ5RDME` | live | — | — | 7 |



### Accounts

- `GBVB43NLVIP2USHXSKI7QQCZKZU2Z6U6A5PAHMIW7LLNVMQJTOX2BZI5`
- `GDTEQF6YGCKLIBD37RJZE5GTL3ZY6CBQIKH7COAW654SYEBE6XJJOLOW`
- `GDARCVAHFMA7GCCULAPCRAV7VXSFFMNOP3X6ZONDJU4SCJULZ6IJ77QD`
- `GBYYKQYUY2XWVMM4VFCBJJVCCQC3QJ3BCLV4276DWHY4BQ7V5AB4U5VA`

---

## Mobius — `mobius.network`

- **Directory account:** `GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

- **SEP-2 Federation** — `https://mobius.network/api/stellar/federation`



### Organization documentation

- **ORG_DBA** — Mobius Network
- **ORG_GITHUB** — mobius-network
- **ORG_KEYBASE** — mobiusnetwork
- **ORG_NAME** — Mochi, Inc.
- **ORG_OFFICIAL_EMAIL** — hello@mobius.network
- **ORG_TWITTER** — mobius_network
- **ORG_URL** — https://mobius.network



### Principals

**Principal 1**
  - **email** — david@mobius.network
  - **github** — dgobaud
  - **id_photo_hash** — 45556303b89c9fe13725dc14ac1ecf8694b4795c4c956703f30fc56cdce334c3
  - **keybase** — davidgobaud
  - **name** — David Gobaud
  - **telegram** — dgobaud
  - **twitter** — davidgobaud



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **MOBI** | `GA6HCMBLTZS5VYYBCATRBRZ3BZJMAFUDKYYF6AH6MVCMGWMRDNSWJPIH` | live | — | — | 7 |



### Accounts

- `GCHDGFUGRMN5BR74LEBUMHHTWYIBIMI6M2LL2K3EQSRUF6GV6MAT4ZQK`
- `GASQH4XYX2TR4KZE4VMUNELK4L5JPJQJEJZCMZHJ3L4ELPZGF6QGRLMD`
- `$validator_us`

---

## Moneygram — `mgusd.moneygram.com`

- **Directory account:** `GCQLUTKZ373IUGE7Z33JKH5VLRRRLH2LKTU3WEBAGH2MD6AWNYPHUU2Q`
- **Tags:** `anchor`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — MoneyGram Payment Systems, Inc.
- **ORG_LOGO** — https://mgusd.moneygram.com/moneygram-logo.jpg
- **ORG_URL** — https://www.moneygram.com/
- **ORG_PHYSICAL_ADDRESS** — 1550 Utica Ave. S, St. Louis Park, MN 55416
- **ORG_OFFICIAL_EMAIL** — customerservice@moneygram.com
- **ORG_TWITTER** — https://x.com/MoneyGram



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **MGUSD** | `GAIUGZZZSL47BKH27SUDZESZELFJDPE2UM52RACOSFJ7BIVBGKUEJSUZ` | — | fiat | USD | 2 |



### Accounts

- `GCQLUTKZ373IUGE7Z33JKH5VLRRRLH2LKTU3WEBAGH2MD6AWNYPHUU2Q`
- `GDYC7FS3JIBLYIJGDARQXJKM5VQBVM4ZCBB7IMAJJ7BJ3ARQRTHCTIA3`
- `GC4SAAHODFMZPNGLGAYC7RQ6GDD65DTSONZ6TCSYRCZQJDEN7HOIHVNS`

---

## Moni — `moni.com`

- **Directory account:** `GAKBPBDMW6CTRDCXNAPSVJZ6QAN3OBNRG6CWI27FGDQT2ZJJEMDRXPKK`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## MYKOBO — `mykobo.co`

- **Directory account:** `GAQRF3UGHBT6JYQZ7YSUYCIYWAF4T2SAA5237Q5LIQYJOHHFAWDXZ7NM`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 2.0.0



### Service endpoints

- **SEP-6 Deposit/Withdrawal** — `https://stellar.mykobo.co/sep6`
- **SEP-24 Interactive Deposit/Withdrawal** — `https://stellar.mykobo.co/sep24`
- **SEP-12 KYC** — `https://stellar.mykobo.co/kyc`
- **SEP-10 Web Auth** — `https://stellar.mykobo.co/auth`
- **SEP-31 Cross-Border Payments** — `https://stellar.mykobo.co/sep31`
- **Signing key** — `GAHNDAOJ7IB6KKMGKBGI5JWJHCTFXOVGY4U2N57C2CUZPK3SPEPCLU76`



### Organization documentation

- **ORG_NAME** — MYKOBO
- **ORG_URL** — https://mykobo.co
- **ORG_LOGO** — https://mykobo.co/assets/img/eurc_icon_128.png
- **ORG_DESCRIPTION** — Set your payments free...
- **ORG_PHYSICAL_ADDRESS** — Vilnius, Lithuania
- **ORG_TWITTER** — myk0b0
- **ORG_OFFICIAL_EMAIL** — hello@mykobo.co
- **ORG_SUPPORT_EMAIL** — support@mykobo.co



### Principals

**Principal 1**
  - **name** — Seyi Akin-Olugbemi
  - **email** — seyi@mykobo.co
  - **keybase** — themandarin

**Principal 2**
  - **name** — Kwabena Aning
  - **email** — kwabena@mykobo.co
  - **keybase** — kaning



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **EURC** | `GAQRF3UGHBT6JYQZ7YSUYCIYWAF4T2SAA5237Q5LIQYJOHHFAWDXZ7NM` | live | fiat | EUR | 2 |



### Accounts

- `GAQRF3UGHBT6JYQZ7YSUYCIYWAF4T2SAA5237Q5LIQYJOHHFAWDXZ7NM`
- `GCY37QZUH2P24CMCTGT2XNMRFSHVQF2DKL4N5VCY22TQ52DFUNEUTKBD`

---

## Nafuloo — `nafuloo.com`

- **Directory account:** `GBHA4FGPHX7KURMP7CZU7SQ2UOAGTAQ22SCHPK5P5XCQHZXCSVXQJFYB`
- **Tags:** `issuer`, `anchor`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — No one person or group owns or controls Nafuloo, and anyone can participate.
- **ORG_URL** — https://nafuloo.com
- **ORG_LOGO** — https://nafuloo.com/wp-content/NAFU_logo.png
- **ORG_PHYSICAL_ADDRESS** — Earth
- **ORG_KEYBASE** — nafuloo
- **ORG_TWITTER** — nafulootoken
- **ORG_GITHUB** — nafuloo
- **ORG_OFFICIAL_EMAIL** — info@nafuloo.com



### Principals

**Principal 1**
  - **name** — Lonzy Guwap
  - **email** — info@nafuloo.com
  - **github** — lonzyguwap
  - **keybase** — lonzyguwap
  - **telegram** — lonzyguwap
  - **twitter** — lonzyguwap



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **NAFU** | `GBHA4FGPHX7KURMP7CZU7SQ2UOAGTAQ22SCHPK5P5XCQHZXCSVXQJFYB` | live | — | — | 7 |
| **NFIUM** | `GD76B36XOOH432PICDIVEOD4RU7TEFJ5DZVA2C5MW5LKTSCARK45V3DB` | live | — | — | 7 |



### Accounts

- `GBHA4FGPHX7KURMP7CZU7SQ2UOAGTAQ22SCHPK5P5XCQHZXCSVXQJFYB`
- `GCYZGBGG36KE4OA2CGWORPSTQNTQ45DUVEU534U7V7JR74IRREM3WZPA`
- `GD76B36XOOH432PICDIVEOD4RU7TEFJ5DZVA2C5MW5LKTSCARK45V3DB`
- `GCY7VH763TOMBGSCWAVBG3LRLYYY6Z6ZJFPHFQKKUWBXAKC376KDUUSY`

---

## NaoBTC — `naobtc.com`

- **Directory account:** `GATEMHCCKCY67ZUCKTROYN24ZYT5GK4EQZ65JJLDHKHRUZI3EUEKMTCH`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

- **SEP-2 Federation** — `https://www.naobtc.com/api/federation`
- **SEP-6 Deposit/Withdrawal** — `https://www.naobtc.com/api`



### Organization documentation

_No `[DOCUMENTATION]` block._



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **XEL** | `GAXELY4AOIRVONF7V25BUPDNKZYIVT6CWURG7R2I6NQU26IQSQODBVCS` | dead | — | — | — |
| **BTC** | `GATEMHCCKCY67ZUCKTROYN24ZYT5GK4EQZ65JJLDHKHRUZI3EUEKMTCH` | live | crypto | BTC | — |



### Accounts

_None._

---

## Nezly — `nezly.com`

- **Directory account:** `GDGKBRCPW4C3ENNC5C64PE6U33MG52GBKFXOK5P3OSWF74DAOXRXV6OJ`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## NGNC Anchor Issuer — `ngnc.online`

- **Directory account:** `GASBV6W7GGED66MXEVC7YZHTWWYMSVYEY35USF2HJZBLABLYIFQGXZY6`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## nTokens - Discontinued — `ntokens.com`

- **Directory account:** `GDVKY2GU2DRXWTBEYJJWSFXIGBZV6AZNBVVSUHEPZI54LIS6BA7DVVSP`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 0.1.1



### Service endpoints

- **SEP-6 Deposit/Withdrawal** — `https://ntokens-box.bpventures.us/sep6`
- **SEP-24 Interactive Deposit/Withdrawal** — `https://ntokens-box.bpventures.us/sep24`
- **SEP-12 KYC** — `https://ntokens-box.bpventures.us/kyc`
- **SEP-10 Web Auth** — `https://ntokens-box.bpventures.us/auth`
- **SEP-31 Cross-Border Payments** — `https://ntokens-box.bpventures.us/sep31`
- **Signing key** — `GCJ3VWVOQ2WZFFM4G2RWAPORZHESQR4LU536ZR5HTA4CMOWBIWFYXY7S`



### Organization documentation

- **ORG_NAME** — nTokens Serviços Digitais Ltda
- **ORG_URL** — https://ntokens.com
- **ORG_DESCRIPTION** — nTokens - Brazilian Real (BRL) Currency Anchor
- **ORG_TWITTER** — ntokens_br
- **ORG_GITHUB** — ntokens
- **ORG_OFFICIAL_EMAIL** — contact@ntokens.com
- **ORG_SUPPORT_EMAIL** — support@ntokens.com
- **ORG_PHYSICAL_ADDRESS** — Sao Paulo, SP, Brazil



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **BRL** | `GDVKY2GU2DRXWTBEYJJWSFXIGBZV6AZNBVVSUHEPZI54LIS6BA7DVVSP` | live | fiat | BRL | — |



### Accounts

- `GDKL5TOWWAVLJ2WRAUQS2QJEAGHEDJFXFEPQFB6LKW2WRB257BVLLMT6`
- `GCVVC4SL7G6SCK6AZAHE72RFHZWUFIMAWGAFSKR5VG46GQK6MAFIKX6P`

---

## NydroEnergy — `nydro.energy`

- **Directory account:** `GD6RMKTCHQGEOGYWIKSY5G7QWXPZOAEZIKPKEVZUAXOQCZRVBRRFGLJM`
- **Tags:** `anchor`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Papaya — `dead.apay.io`

- **Directory account:** `GAEGOS7I6TYZSVHPSN76RSPIVL3SELATXZWLFO4DIAFYJF7MPAHFE7H4`
- **Tags:** `anchor`, `issuer`, `memo-required`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

- **SEP-2 Federation** — `https://dead.apay.io/api/federation`
- **SEP-6 Deposit/Withdrawal** — `https://dead.apay.io/api`



### Organization documentation

_No `[DOCUMENTATION]` block._



### Principals

**Principal 1**
  - **name** — Sergey
  - **telegram** — umbre1



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **BTC** | `GAUTUYY2THLF7SGITDFMXJVYH3LHDSMGEAKSBU267M2K7A3W543CKUEF` | live | crypto | BTC | 7 |
| **LTC** | `GC5LOR3BK6KIOK7GKAUD5EGHQCMFOGHJTC7I3ELB66PTDFXORC2VM5LP` | live | crypto | LTC | 7 |
| **ETH** | `GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR` | live | crypto | ETH | 7 |
| **BAT** | `GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR` | live | crypto | BAT | 7 |
| **LINK** | `GBDEVU63Y6NTHJQQZIKVTC23NWLQVP3WJ2RI2OTSJTNYOIGICST6DUXR` | live | crypto | LINK | 7 |
| **USDT** | `GCQTGZQQ5G4PTM2GL7CDIFKUBIPEC52BROAQIAPW53XBRJVN6ZJVTG6V` | live | crypto | USD | 7 |



### Accounts

_None._

---

## Papaya - Discontinued — `apay.io`

- **Directory account:** `GAUTUYY2THLF7SGITDFMXJVYH3LHDSMGEAKSBU267M2K7A3W543CKUEF`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** http 521 — {"status":"http-error","httpStatus":521,"reason":"<none>"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## PapayaSwap — `papayabot.com`

- **Directory account:** `GBGVRE5DH6HGNYNLWQITKRQYGR4PWQEH6MOE5ELPY3I4XJPTZ7CVT4YW`
- **Tags:** `anchor`, `memo-required`, `exchange`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

- **SEP-2 Federation** — `https://papayabot.com/latest/federation`



### Organization documentation

_No `[DOCUMENTATION]` block._



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

_No currencies declared in `stellar.toml`._



### Accounts

_None._

---

## Pedity — `pedity.com`

- **Directory account:** `GBVUDZLMHTLMZANLZB6P4S4RYF52MVWTYVYXTQ2EJBPBX4DZI2SDOLLY`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html>\r\n    ^\n2: <html lang=\"en\">\r\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Phoenix — `app.phoenix-hub.io`

- **Directory account:** `GAX5TXB5RYJNLBUR477PEXM4X75APK2PGMTN6KEFQSESGWFXEAKFSXJO`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 0.1.0



### Service endpoints

- **Signing key** — `GAX5TXB5RYJNLBUR477PEXM4X75APK2PGMTN6KEFQSESGWFXEAKFSXJO`



### Organization documentation

- **ORG_DESCRIPTION** — Phoenix Anchor Service.
- **ORG_GITHUB** — Phoenix-Protocol-Group
- **ORG_KEYBASE** — phoenix
- **ORG_LOGO** — https://app.phoenix-hub.io/logoIcon.png
- **ORG_NAME** — Phoenix Protocol Group
- **ORG_TWITTER** — PhoenixDeFiHub
- **ORG_URL** — https://phoenix-hub.io



### Principals

**Principal 1**
  - **email** — phoenix@phoenix.phoenix
  - **github** — https://github.com/Phoenix-Protocol-Group/
  - **keybase** — phoenix
  - **name** — Project Phoenix



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **PHO** | `GAX5TXB5RYJNLBUR477PEXM4X75APK2PGMTN6KEFQSESGWFXEAKFSXJO` | — | — | — | 7 |



### Accounts

- `GAX5TXB5RYJNLBUR477PEXM4X75APK2PGMTN6KEFQSESGWFXEAKFSXJO`

---

## Pigzbe — `pigzbe.com`

- **Directory account:** `GBIL5TOVTZFNV3XS3E2LWTKU5SYOJ3UBCVBSKAMP4EE4MV2VSZQK7NRZ`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Piiko — `piiko.co`

- **Directory account:** `GBQWA6DU6OXHH4AVTFCONQ76LHEWQVZAW7SFSW4PPCAI2NX4MJDZUYDW`
- **Tags:** `anchor`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"This operation was aborted"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## PRNetwork — `pr.network`

- **Directory account:** `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 1.0.0



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — PR.network LLC
- **ORG_DBA** — PR.cards
- **ORG_URL** — https://www.PR.cards
- **ORG_LOGO** — https://pr.network/xpr.png
- **ORG_DESCRIPTION** — Token-based AI economy.
- **ORG_TWITTER** — PublicNet
- **ORG_OFFICIAL_EMAIL** — contact@pr.network
- **ORG_PHYSICAL_ADDRESS** — 3333 Preston Road #1110, STE 300, FRISCO, TX 75034, USA
- **ORG_PHONE_NUMBER** — +1 214-214-3040



### Principals

**Principal 1**
  - **name** — Rafal Wyszomirski
  - **email** — contact@pr.network
  - **twitter** — Raf_Alski
  - **keybase** — prafal
  - **telegram** — PRafal



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **XPR** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | — | — | — | 7 |
| **BLANKCARD** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | — | — | — | 7 |
| **BLANKVOTE** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | — | — | — | 7 |
| **GHOSTVOTE** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | — | — | — | 7 |
| **PRPOINTS** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | — | — | — | 7 |
| **bmarley** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **emusk** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **einstein** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mzuckerberg** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **tomhanks** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **Mazda** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **cbale** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **vputin** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **kkardashian** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **beyonce** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **ibm** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **heineken** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **stevejobs** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **uber** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **visainc** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **kyliejenner** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **selenagomez** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **philton** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **redbull** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **zlatan** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **australia** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **cryptopia** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **yobit** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **dogecoin** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **litecoin** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **wikileaks** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **dominospizza** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **ldvinci** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **opera** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **tmobile** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **bitconnect** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **donaldtrump** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **youtube** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **poroshenko** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **anilorak** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **prnetwork** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **raphael** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mickjagger** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **fcbarcelona** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **audi** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **cronaldo** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **cocacola** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **jayz** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **cisco** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mcdonalds** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **kkwest** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **googleinc** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **nasa** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **chase** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **youtube** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **emusk** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **appleinc** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mazda** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **fcbarcelona** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **appleinc** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **ibm** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **audi** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mzuckerberg** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **eminem** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mfreeman** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **johnnydepp** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **eminem** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mazda** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **youtube** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **realmadrit** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **messi** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **ronpaul** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **ronpaul** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **teslamotors** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **georgesoros** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **spotify** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **emusk** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **googleinc** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **fcbarcelona** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **donaldtrump** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **youtube** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **emusk** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **appleinc** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **audi** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **ibm** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mzuckerberg** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **realmadrit** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **eminem** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **messi** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **teslamotors** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **georgesoros** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **spotify** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **prnetwork** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **jayz** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **tomhanks** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **vputin** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **cronaldo** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **cocacola** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mcdonalds** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **kkwest** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **cisco** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **bmarley** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **beyonce** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **selenagomez** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **nasa** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **einstein** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **ldvinci** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **kkardashian** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **heineken** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **zlatan** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **wikileaks** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **stevejobs** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **tmobile** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **australia** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **redbull** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **dominospizza** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **visainc** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **philton** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **opera** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **mickjagger** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **anilorak** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **uber** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **raphael** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |
| **poroshenko** | `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5` | live | — | — | 7 |



### Accounts

- `GAZPKDTEZ5UM3BF4E7FL7EMXRMLH76F2TNVXRLOF6SCVXOFWSPCEWFI5`
- `GBFZPR7KNYNZEJXWBENA5TSDG4V7SHZV4S6Z4AWURAQ6PRNUYPYZZLLP`
- `GAHQAIM35LLAJWBPGP5M2ZHQPZG3FKJS35N3WZ44EQ4NMQWCH25INJ4V`
- `GCUVU7CV2KR4IGQBKOPBABJW5KFZJETRHMJFORGSOYLP66UAXGLRMMDD`
- `GB6OFQHDM5PT75DU5PTRZBCJOUKR62IQKBZ7KAA5JWJKIE45V5KXBRSL`

---

## Reddit Photons — `photon.center`

- **Directory account:** `GBUMIO5G77562NFZZVMKMAUQL3CCZOGTGTUP6PVVUS2BM7U2WSPHOTON`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Repocoin — `repocoin.io`

- **Directory account:** `GCZNF24HPMYTV6NOEHI7Q5RJFFUI23JKUKY3H3XTQAFBQIBOHD5OXG3B`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"This operation was aborted"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Repocoin Old — `old.repocoin.io`

- **Directory account:** `GDPB3BGHJAHAKVIWUNLST7N6OGZ73W6AUAI7QDZJW26LEWL46VDAKBH6`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## RippleFox — `ripplefox.com`

- **Directory account:** `GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

- **SEP-2 Federation** — `https://ripplefox.com/strbridge`



### Organization documentation

_No `[DOCUMENTATION]` block._



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **CNY** | `GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX` | — | — | — | — |
| **ULT** | `GC76RMFNNXBFDSJRBXCABWLHXDK4ITVQSMI56DC2ZJVC3YOLLPCKKULT` | — | — | — | — |



### Accounts

- `GAREELUB43IRHWEASCFBLKHURCGMHE5IF6XSE7EXDLACYHGRHM43RFOX`
- `GC76RMFNNXBFDSJRBXCABWLHXDK4ITVQSMI56DC2ZJVC3YOLLPCKKULT`
- `GBK4DFCUAZRNU7TJ4XUOJEADVQBLGVVVFKRTHHXNAXD7MTYUWR7HKCNY`
- `GCLDH6L6FBLTD3H3B23D6TIFVVTFBLZMNBC3ZOI6FGI5GPQROL4FOXIN`
- `GBTLWRHDUJNAKTQGH7YOQ6K56D6GKX2HSM2UF5A3RK7QAME25GFOXOUT`

---

## SCAM-Counterfeiter — `steiiarusa.vip`

- **Directory account:** `GAKRSCYI36DT5R6C4CRB5EGAGBWR3VNFM57NKDUI7HDKMA7BLX5QQUSA`
- **Tags:** `malicious`, `anchor`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## SixNetwork — `six.network`

- **Directory account:** `GDMS6EECOH6MBMCP3FYRYEVRBIV3TQGLOFQIPVAITBRJUMTI6V7A2X6Z`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## SmartLands — `smartlands.io`

- **Directory account:** `GCKA6K5PCQ6PNF5RQBF7PQDJWRHO6UOGFMRLK3DYHDOI244V47XKQ4GP`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html><html><head><script>window.onload=function(){window.location.href=\"/lander\"}</script></head></html>\n    ^\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## StableX — `stablex.cloud`

- **Directory account:** `GCSAZVWXZKWS4XS223M5F54H2B6XPIIXZZGP7KEAIU6YSL5HDRGCI3DG`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Stably — `stably.io`

- **Directory account:** `GBK4AYTOYIAYT4UJECSQGMACUWLKYOOM4VCAUUZ3Y3FG5XD2LYK3FGK2`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 400 — {"status":"http-error","httpStatus":400,"reason":"Bad Request"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## SteemAnchor — `steemanchor.com`

- **Directory account:** `GAIGG2ICK2ATV7VUQC6MZHOSMRMFJK3T65IVNUZ7EJEEAU5UJQPPDIST`
- **Tags:** `anchor`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Stellarport — `stellarport.io`

- **Directory account:** `GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5`
- **Tags:** `anchor`, `issuer`, `exchange`, `memo-required`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** 2.0.0



### Service endpoints

- **SEP-2 Federation** — `https://api.stellarport.io/Federation`
- **SEP-6 Deposit/Withdrawal** — `https://a3s.api.stellarport.io/v3/GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5`
- **SEP-10 Web Auth** — `https://api.stellarport.io/Authentication`
- **Signing key** — `GABWHTAVRYF2MCNDR5YC5SC3JTZQBGDZ3HKI4QAREV5533VU43W4HJUX`



### Organization documentation

_No `[DOCUMENTATION]` block._



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **BTC** | `GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5` | — | crypto | BTC | 7 |
| **ETH** | `GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5` | — | crypto | ETH | 7 |
| **XRP** | `GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5` | — | crypto | XRP | 7 |
| **LTC** | `GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5` | — | crypto | LTC | 7 |



### Accounts

- `GBVOL67TMUQBGL4TZYNMY3ZQ5WGQYFPFD5VJRWXR72VA33VFNL225PL5`
- `GC3M7GD3HNLCXSWDSJO2YTJ4LMNGNUOFWX5SVRHY7PCYGV5GLLYQMALT`
- `GC45JH537XZD4DY4WTV5PCUJL4KPOIE4WMGX5OP5KSPS2OLGRUOVVIGD`
- `GDD7ABRF7BCK76W33RXDQG5Q3WXVSQYVLGEMXSOWRGZ6Z3G3M2EM2TCP`

---

## STEMchain — `stemchain.io`

- **Directory account:** `GAFXX2VJE2EGLLY3EFA2BQXJADAZTNR7NC7IJ6LFYPSCLE7AI3AK3B3M`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Stronghold — `stronghold.co`

- **Directory account:** `GBSTRH4QOTWNSVA6E4HFERETX4ZLSR3CIUBLK7AXYII277PFJC4BBYOG`
- **Tags:** `anchor`, `issuer`, `exchange`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

- **ORG_NAME** — Stronghold
- **ORG_URL** — https://stronghold.co/shx
- **ORG_LOGO** — https://stronghold.co/.well-known/logo.png
- **ORG_TWITTER** — strongholdpay



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **SHX** | `GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH` | — | — | — | 0 |



### Accounts

- `GDSTRSHXHGJ7ZIVRBXEYE5Q74XUVCUSEKEBR7UCHEUUEK72N7I7KJ6JH`

---

## Superlumen — `superlumen.org`

- **Directory account:** `GCEGERI7COJYNNID6CYSKS5DPPLGCCLPTOSCDD2LG5SJIVWM5ISUPERI`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## SureRemit Old — `old.sureremit.co`

- **Directory account:** `GCVWTTPADC5YB5AYDKJCTUYSCJ7RKPGE4HT75NIZOUM4L7VRTS5EKLFN`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## SureRemit Swap — `sureremit.co`

- **Directory account:** `GCZYLNGU4CA5NAWBAVTHMZH4JXWKP2OUJ6OK3I7XXZCNA5622WUJVLTG`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 403 — {"status":"http-error","httpStatus":403,"reason":"Forbidden"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## TARI — `cryptotari.io`

- **Directory account:** `GD7UVDDJHJYKUXB4SJFIC6VJDQ4YADQCMRN3KLHJFV4H6NIUAEREVCO7`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

_No `[DOCUMENTATION]` block._



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **TARI** | `GD7UVDDJHJYKUXB4SJFIC6VJDQ4YADQCMRN3KLHJFV4H6NIUAEREVCO7` | — | — | — | 7 |



### Accounts

_None._

---

## Tempo — `tempocrypto.com`

- **Directory account:** `GAP5LETOV6YIE62YAM56STDANPRDO7ZFDBGSNHJQIYGGKSMOZAHOOS2S`
- **Tags:** `anchor`, `issuer`, `memo-required`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html>\r\n    ^\n2: <html lang=\"en\">\r\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Ternio — `ternio.io`

- **Directory account:** `GDGQDVO6XPFSY4NMX75A7AOVYCF5JYGW2SHCJJNWCQWIDGOZB53DGP6C`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## TheFutbolCoin — `thefutbolcoin.io`

- **Directory account:** `GDS3XDJAA4VY6MJYASIGSIMPHZ7AQNZ54RKLWT7MWCOU5YKYEVCNLVS3`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

_No service endpoints declared._



### Organization documentation

_No `[DOCUMENTATION]` block._



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **TFC** | `GDS3XDJAA4VY6MJYASIGSIMPHZ7AQNZ54RKLWT7MWCOU5YKYEVCNLVS3` | — | — | — | 7 |



### Accounts

_None._

---

## TokenIO — `x.token.io`

- **Directory account:** `GDSRCV5VTM3U7Y3L6DFRP3PEGBNQMGOWSRTGSBWX6Z3H6C7JHRI4XFJP`
- **Tags:** `anchor`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## ToNaira — `tonaira.com`

- **Directory account:** `GCLRUZDCWBHS7VIFCT43BARPP63BHR32HMEVKXYQODA5BU6SIGFK4HL2`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"This operation was aborted"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## TONMoney — `tontinetrust.com`

- **Directory account:** `GBFJGO46OV6E2QS2ZUMCF256ZL4BFOZWFHULRNLPSPW47HH5HFAKJTON`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Traxalt — `traxalt.com`

- **Directory account:** `GAKRDXBHA2TTOYJZQIAQ7ZDS555P24RAYRUUZWU3KHSLIOZMVV4IITXT`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html>\r\n    ^\n2: <html lang=\"en\">\r\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Uhuru — `uhuruwallet.co.za`

- **Directory account:** `GDYG7OEXT7GO2WOYJKRFMYK6PXQTPFRKO4JSNRRZWE4JM2V6QWQR2QZD`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** http 404 — {"status":"http-error","httpStatus":404,"reason":"Not Found"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## UltraCapital yXLM distributor — `ultracapital.xyz`

- **Directory account:** `GADFXROGGR74V3MSWU2SUKCEUPQFZEIIF3IUHLRN3NKZ4JN2IPBMCODA`
- **Tags:** `anchor`, `custodian`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 2.2.0



### Service endpoints

- **SEP-6 Deposit/Withdrawal** — `https://ultracapital.xyz/sep6`
- **SEP-24 Interactive Deposit/Withdrawal** — `https://ultracapital.xyz/sep24`
- **SEP-10 Web Auth** — `https://ultracapital.xyz/auth`
- **Signing key** — `GA3UK3JHOYYD3TAUH5C7NDOUDWBRF5FC4MECXFA2VRPEHIDQUOJIVOAJ`



### Organization documentation

- **ORG_NAME** — Ultra Capital LLC
- **ORG_DBA** — Ultra Capital
- **ORG_URL** — https://ultracapital.xyz/
- **ORG_LOGO** — https://ultracapital.xyz/static/images/org_logo.png
- **ORG_OFFICIAL_EMAIL** — hello@ultracapital.xyz
- **ORG_SUPPORT_EMAIL** — support@ultracapital.xyz



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **yUSDC** | `GDGTVWSM4MGS4T7Z6W4RPWOCHE2I6RDFCIFZGS3DOA63LWQTRNZNTTFF` | live | crypto | USDC | — |
| **yXLM** | `GARDNV3Q7YGT4AKSDF25LT32YSCCW4EV22Y2TV3I2PU2MMXJTEDL5T55` | live | crypto | XLM | — |
| **yETH** | `GDYQNEF2UWTK4L6HITMT53MZ6F5QWO3Q4UVE6SCGC4OMEQIZQQDERQFD` | live | crypto | ETH | — |
| **yBTC** | `GBUVRNH4RW4VLHP4C5MOF46RRIRZLAVHYGX45MVSTKA2F6TMR7E7L6NW` | live | crypto | BTC | — |
| **ETH** | `GBFXOHVAS43OIWNIO7XLRJAHT3BICFEIKOJLZVXNT572MISM4CMGSOCC` | live | crypto | ETH | — |
| **BTC** | `GDPJALI4AZKUU2W426U5WKMAT6CN3AJRPIIRYR2YM54TL2GDWO5O2MZM` | live | crypto | BTC | — |



### Accounts

- `GAVBS6SXMRD7C3IRN5K2SY5C2CAUFHBVOGWTQXADSBUHAFDDUKVTQWWY`
- `GCBPMB2VK3POXU3QL2IPOUYKEDNZYRCYPFQGLLYVX6D2OLLRO7SWTTBO`
- `GADFXROGGR74V3MSWU2SUKCEUPQFZEIIF3IUHLRN3NKZ4JN2IPBMCODA`
- `GD7G6G56JHGQ3LY37ZYHALJRSAJYXWMYMKAF5G2GBXD5ETRPY4U5XS33`
- `GA3UK3JHOYYD3TAUH5C7NDOUDWBRF5FC4MECXFA2VRPEHIDQUOJIVOAJ`
- `GDGTVWSM4MGS4T7Z6W4RPWOCHE2I6RDFCIFZGS3DOA63LWQTRNZNTTFF`
- `GDYQNEF2UWTK4L6HITMT53MZ6F5QWO3Q4UVE6SCGC4OMEQIZQQDERQFD`
- `GARDNV3Q7YGT4AKSDF25LT32YSCCW4EV22Y2TV3I2PU2MMXJTEDL5T55`
- `GBUVRNH4RW4VLHP4C5MOF46RRIRZLAVHYGX45MVSTKA2F6TMR7E7L6NW`
- `GDVKAVKZDKMLPEXXFXPVKARRO4BNFJXRRPKENEDERK5PBYIWCJ2GQOOF`
- `GANESLOXBZWPLB5ZM2KFUTBGSBGISB7JTWFXO67G4TGQINWRMI6766GV`

---

## VCBear — `vcbear.net`

- **Directory account:** `GA7FCCMTTSUIC37PODEL6EOOSPDRILP6OQI5FWCWDDVDBLJV72W6RINZ`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"This operation was aborted"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## WhiteStandard — `thewwallet.com`

- **Directory account:** `GDNQAK7B3WQKMEGKJK6FCDKIMKHOGYR7E637GCLFHWJOPCYE6VBALYDF`
- **Tags:** `anchor`, `memo-required`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

- **SEP-2 Federation** — `https://stellarid.io/federation/`
- **SEP-6 Deposit/Withdrawal** — `https://thewwallet.com/ExtApi`



### Organization documentation

_No `[DOCUMENTATION]` block._



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **WSD** | `GDSVWEA7XV6M5XNLODVTPCGMAJTNBLZBXOFNQD3BNPNYALEYBNT6CE2V` | — | fiat | USD | 2 |
| **WSEUR** | `GDSVWEA7XV6M5XNLODVTPCGMAJTNBLZBXOFNQD3BNPNYALEYBNT6CE2V` | — | fiat | EUR | 2 |
| **WSGBP** | `GDSVWEA7XV6M5XNLODVTPCGMAJTNBLZBXOFNQD3BNPNYALEYBNT6CE2V` | — | fiat | GBP | 2 |
| **BSV** | `GDSVWEA7XV6M5XNLODVTPCGMAJTNBLZBXOFNQD3BNPNYALEYBNT6CE2V` | — | crypto | BSV | 5 |



### Accounts

- `GBH42X7GG5TQLBMKY2KNYQ6KY7XOUALQCUUZQH5EOLVNULDJMLCNUNJP`

---

## Winsome — `winsome.gift`

- **Directory account:** `GCNHYZLBCSVZHSQJ2DOIBHYBF4J24DJYGS5QKURX4AGSLBK6SDJOYWIN`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** network-error — {"status":"network-error","reason":"fetch failed"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## WireX Deposit — `wirexapp.com`

- **Directory account:** `GAESQGK5TTKPT2JY4STRN6MJU56LNHQVBFROGX5GFIWUPK3JHZ5F5FCI`
- **Tags:** `wallet`, `anchor`, `exchange`, `memo-required`
- **`stellar.toml` fetch:** http 400 — {"status":"http-error","httpStatus":400,"reason":"Bad Request"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## XIMCoin — `ximcoin.com`

- **Directory account:** `GBZ35ZJRIKJGYH5PBKLKOZ5L6EXCNTO7BKIL7DAVVDFQ2ODJEEHHJXIM`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** _(unspecified)_

- **SEP-1 version:** _(unspecified)_



### Service endpoints

- **SEP-2 Federation** — `https://ximcoin.com/api/stellar/federation`



### Organization documentation

- **ORG_NAME** — SecureLC Limited
- **ORG_DBA** — XIMcoin
- **ORG_URL** — https://ximcoin.com
- **ORG_LOGO** — https://www.ximcoin.com/assets/img/ximcoinlogo512.png
- **ORG_PHYSICAL_ADDRESS** — Room 2103, Futura Plaza, 111 How Ming Street Kwun Tong, Hong Kong
- **ORG_TWITTER** — ximcoin
- **ORG_OFFICIAL_EMAIL** — info@ximcoin.com



### Principals

**Principal 1**
  - **name** — Matthew Walker
  - **email** — matt@ximcoin.com
  - **twitter** — ximcoin



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **XIM** | `GBZ35ZJRIKJGYH5PBKLKOZ5L6EXCNTO7BKIL7DAVVDFQ2ODJEEHHJXIM` | — | — | — | 0 |



### Accounts

- `GBZ35ZJRIKJGYH5PBKLKOZ5L6EXCNTO7BKIL7DAVVDFQ2ODJEEHHJXIM`
- `GBQXNZI3ESSKVGPVZPJPIV5JSN2SZS373FLWB2QJLNPZEFMI7EBZYFYE`
- `GCCJG52KWFF7CYDCQLNT7ZIAQEGVJNFD3RFQ7GGLHIZFZC4KIGVO26L6`
- `GAFVP47IRHUID64BYLF5PPKMPSNMNU6TC7LXUOD5G5DNLEODNCQNXWMV`
- `GCL4MCAPNZLDL7H5OC24GMLPJGO4MCLBYHNR4TGOS6OR5PBLC56MALHO`
- `GA6J2NBIFROKZZC5W4I5GSZQZCOXZBNCEB5KURYAOH4GTQ5V5IVXZB24`
- `GBPNMHYIMCUZXXAPAUERSABCC5OC2M7YMRPV4OOIV46KJC5Q6CZJFBY6`
- `GCCVH73QM4JNVMDUMDYCG7N7T5HTFKN527YSRJLPP34K4NQPWLUK6LWR`
- `GBL3GT75TYGDFQ7BJ6DVPKRNK43BMWEAN7ESBH5BN2QMHXLZRAYJLS26`
- `GA2HDBWI3IUA24ZM57XSY3GREYC6IAIPVGKY3O4QVYOJSGP4ITNSCIR5`
- `GC44RZUSRU64EVJQKLSWYXJYGIT7Y6SRSDX5BEAEF4EF6S7MSAEY4YQR`
- `GC4XQKXVUQW2YRPAJ62AHCVTXT2KSTBLQGTIUOYGDBPPHCIG556NMO6L`
- `GAGNUTDBSFD2V6P3PO3M6L6F3OUO5LS2H5ZN2X4KU7TEAX3AJUPNTLFS`

---

## Xirkle — `xirkle.com`

- **Directory account:** `GAO4DADCRAHA35GD6J3KUNOB5ELZE5D6CGPSJX2WBMEQV7R2M4PGKJL5`
- **Tags:** `anchor`, `issuer`, `unsafe`
- **`stellar.toml` fetch:** parse-error — {"status":"parse-error","reason":"Unknown character \"60\" at row 1, col 2, pos 1:\n1> <!DOCTYPE html>\n    ^\n2: <html lang=\"en\">\n\n"}

### `stellar.toml` could not be retrieved

The Stellar Expert directory lists this account with the `anchor` tag, but its `stellar.toml` could not be fetched or parsed.

---

## Zeam.Money — `zeam.money`

- **Directory account:** `GCTG4YT2ZTYRODK5JCXFJ6V7P6HMQ62L27PPG5UGK57VUFDJ7DFDGBPZ`
- **Tags:** `anchor`, `issuer`
- **`stellar.toml` fetch:** ok

### Network & version

- **Network passphrase:** Public Global Stellar Network ; September 2015

- **SEP-1 version:** 2.6.0



### Service endpoints

- **SEP-2 Federation** — `https://api.business.zeam.app/api/v1/stellar/federation`
- **SEP-24 Interactive Deposit/Withdrawal** — `https://anchor.zeam.money/sep24`
- **SEP-12 KYC** — `https://anchor.zeam.money/customer`
- **SEP-10 Web Auth** — `https://anchor.zeam.money/auth`
- **SEP-31 Cross-Border Payments** — `https://anchor.zeam.money/sep31`
- **SEP-38 Anchor Quotes** — `https://anchor.zeam.money/sep38`
- **Signing key** — `GD5KDGUCUADKSH5DIE5RUWC4NCUA3M2GPGEGLS3D7Q5W65Y4F5YFZSK2`



### Organization documentation

- **ORG_PHYSICAL_ADDRESS** — Coachworks Arcade, Northgate Street, Chester, United Kingdom CH1 2EY
- **ORG_OFFICIAL_EMAIL** — admin@zeam.money
- **ORG_GITHUB** — github.com/ZeamMoney
- **ORG_DESCRIPTION** — Zeam Money is issued by Zeam Limited (UK) and operated by Paytec Technologies B.V. (NL)
- **ORG_LICENSING_AUTHORITY** — Financial Sector Conduct Authority
- **ORG_SUPPORT_EMAIL** — support@zeam.money
- **ORG_KEYBASE** — team-page/zeam
- **ORG_DBA** — ZEAM MONEY
- **ORG_LOGO** — https://imagedelivery.net/oLenz0kq92Vui1vUax_Fhg/f5567c40-be08-4143-993d-c8a009876e00/public
- **ORG_URL** — https://zeam.money
- **ORG_LICENSE_NUMBER** — Multiple - see https://www.zeam.money/licences-and-registrations
- **ORG_LICENSE_TYPE** — Multiple - see https://www.zeam.money/licences-and-registrations
- **ORG_NAME** — ZEAM LIMITED



### Principals

_No `[[PRINCIPALS]]` declared._



### Currencies

| Code | Issuer | Status | Anchor type | Anchor asset | Decimals |
| --- | --- | --- | --- | --- | --- |
| **ZARZ** | `GAROH4EV3WVVTRQKEY43GZK3XSRBEYETRVZ7SVG5LHWOAANSMCTJBB3U` | live | fiat | ZAR | 2 |
| **USDZ** | `GAKTLPC4ZV37SSCITQ5IS5AQ4WPF4CF4VZJQPPAROSGXMYOATF5U6XPR` | live | crypto | USD, USDC, yUSDC, USDT | 2 |
| **XAUZ** | `GD3MMNHD5U5H732GTLYO7DZVUNGPVP462KVNFO4HALNPP6C7ESQAGOLD` | live | crypto | 75% Pax Gold (PAXG) and 25% Tether Gold (XAUT) | 7 |
| **BTCZ** | `GAT63G6FINKAES4473ZZZT3SYJVUIXKYBVFBQYQHEZF6EE3VY5AGBTCZ` | live | crypto | BTC | 5 |
| **EURZ** | `GAM5BKSKTHYS6IE4OUHCISGI6YVH75XIMOCG4RB5TR74KZDJRSNKEURZ` | live | crypto | EURC | 2 |
| **yZARZ** | `GDZBAWPUGAJI4CQTO53O6Y33WEZ4IRVDBLDYUY6EKGICP7OK53OYZARZ` | test | crypto | ZARZ | 7 |
| **GBPZ** | `GCTG4YT2ZTYRODK5JCXFJ6V7P6HMQ62L27PPG5UGK57VUFDJ7DFDGBPZ` | live | fiat | GBP | 7 |
| **RCAPS** | `GAP5YLVKIS5UCT4IPEZASWOHKFSGWCJMWZ3SSIMARADIANT4XBRKGON5` | live | stock | — | 7 |



### Accounts

- `GAKTLPC4ZV37SSCITQ5IS5AQ4WPF4CF4VZJQPPAROSGXMYOATF5U6XPR`
- `GCZLKDDJ5FMVUTKDKBCQ4QJ7PBM3LQKRNYHU5VDYYG3XOXFAMJWBF2DC`
- `GA5ZXXHHXX766BEEB33WN7Y4SHKUX2ZIGNRVJTAJM3K7PZMBM7DEJCFL`
- `GAROH4EV3WVVTRQKEY43GZK3XSRBEYETRVZ7SVG5LHWOAANSMCTJBB3U`
- `GD3MMNHD5U5H732GTLYO7DZVUNGPVP462KVNFO4HALNPP6C7ESQAGOLD`
- `GAIVVKIZV2WOTOI4FB6MS2CSOH2HST7MVRKO23L3JXLCKZ7GR4BCKPZX`
- `GCXZTK7XDPG72MDEI655N2W4Q5MEW4MSSOFXTVR7XVBT3KZTMCRVCP42`
- `GCGZPH6U2OL24L6TEFXNMG4VJKGPHCQBRPBCNDXQERP7DFLOYIRQQSBY`
- `GDZL62FHKSJCFLX4H5ANAJCQEKOTNSSCLQHHKSSDQSIP23JTUWQVHW7X`
- `GCGJOW22JXLVK3DC6YOSENXFEEMMFDNKWNWQYEKKUXSDG7VDIVKAPXPQ`
- `GA37M2LDWCDWPCHIST3NHF7GTYX55MN7IKXI56LPQ2QRJGSZQV6HCVLI`
