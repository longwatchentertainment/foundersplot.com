# Dev Log #2: Apples Stop Being Apples

Last time I wrote about paperwork. This time there's actual game to talk about.

The short version: the orchard loop (plant, water, harvest, sell raw apples) has been working for a couple weeks now. This week was about what happens after harvest, turning apples into something worth more than apples.

**Processing, and the margin revelation.** You can now press apples into juice, and the game is deliberately built so you feel the moment raw apples stop being the smart move. Selling raw is fine early, but a batch of juice from the same apples nets over 4x the value. That gap is the point. It's supposed to be the moment you realize you're not a fruit stand anymore. Applesauce and apple butter unlock after enough juice batches (mastery gated, not purchased), and this week pie filling joined them as the fourth recipe. Each one got its own equipment progression too. A garage sale press behaves differently than an Instant Pot, and upgrading actually matters now instead of being one shared tool for everything.

**Farmers Market, and catching my own mistake.** I built a weekend farmers market that's open Saturday and Sunday, a price premium over normal sales, and capacity per table. I shipped a first pass, then looked at it again and realized I'd built pure upside: no cost to show up, no downside to a bad weekend. That's not how a real market booth works. Real ones charge a setup fee whether you sell anything or not. So I redid it. Tables cost money to buy, plus a table rental fee each weekend that's randomized, and it's charged upfront. Then I ran the worst case numbers and found the cheapest product would've been a net loss under the old pricing once the fee was added, so I raised the market premium to cover it. Small thing, but it's the difference between a market that's just a better version of normal selling versus one that's an actual bet.

**Cloud sync was broken, and I didn't know it.** Save syncing across devices has been live for about a week, but I found this week that it never actually pulled. A guard condition was permanently false because of when the starter tree gets granted during app boot. Push worked the whole time, pull was dead. If you'd played on two devices, the second one would've silently overwritten progress from the first instead of merging it. Fixed now with a real freshness check that compares timestamps on every sign in and every time the app comes back to the foreground, not just once.

**Also this week:** a weather system (storms, droughts, heat waves, the good and bad kind of random), server side validation so harvests and offline progress can't just be trusted from the client, and a basic branding feature so your products can have a name and label instead of being generic.

It was a heavier build week than I expected going in. Next up: getting the remaining farmers-market-unlocked recipes built (cider, vinegar, dried rings, jam), and starting to think about what the game actually looks like to a first-time player instead of just what it does under the hood.

Charles
