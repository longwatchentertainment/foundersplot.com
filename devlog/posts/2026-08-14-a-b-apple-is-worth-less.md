# Dev Log #3: A B Apple Is Worth Less Than an A Apple

Last time was about margins, raw apples versus juice. This week was about finishing what that opened up, plus a bunch of less glamorous stuff that had to happen eventually.

**The recipe catalog is done.** Sparkling cider, apple cider vinegar, dried apple rings, and apple jam are all in now, which brings the starter lineup to a full eight products. Each one got real equipment progression the same way juice and applesauce did, and I actually priced these out against real farmers market and grocery numbers instead of guessing. One honest surprise: sparkling cider is the worst dollar per hour product in the whole catalog at the entry equipment tier, even though it feels like it should be a premium item. The margin story isn't uniform across products, which is closer to how a real small food business actually works than I expected going in.

**Apple grade finally means something.** This was the big one. Up until now, a Grade A apple and a Grade C apple were worth the same once they went into a batch. That was never the plan, the design doc always said Grade C should be locked to bulk products like applesauce and vinegar, and grade was supposed to affect price. So now it actually does. Six of the eight recipes simply cannot touch a Grade C apple, no matter how many are sitting in your inventory. And every batch prices itself off the worst grade of apple that went into it, A at full price, B at 80 percent, C at half. It sounds small but it touches almost everything downstream, since a shelf full of juice can now be worth different amounts depending on what went into it. Haven't tested this one on a real device yet, that's next.

**The coin economy is fully built out.** Pest cures, soil restores, harvest boosts, batch skips, cosmetic labels, all the ways coins can get spent are in, along with the ways to earn them without paying, achievements, daily login, watching ads. This is the first time the full loop actually exists end to end instead of just the harvest timer skip that's been there for weeks.

**Notifications and the privacy stuff got built too.** These are boring to write about but required before this thing can ship anywhere, harvest ready alerts, a consent flow for European users, an app tracking prompt on iOS. Not fun, necessary.

**The bug hunt.** Testing all of this on an actual phone surfaced six real bugs, mostly small but one nasty one where a failed weather response could get the game stuck showing you an event you couldn't get past without restarting the app. Also spent a while convinced the weather odds were broken because storms seemed to be showing up way too often, ran the actual odds function 100,000 times in isolation and it came back almost exactly on target. The bug was in how testing itself was polluting the counter, not the odds. Good reminder to check my assumptions before assuming the code is wrong.

Heavier week than I expected. Next up: getting grade routing in front of real device testing, and then the farmers market gets its full scope back, demand shifts, competitors, the works.

Charles
