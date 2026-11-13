# Dev Log #12: Same Clock For Everyone, Words A Player Would Use

Most of this week was me playing the game from the first tap, again, and fixing every spot where it talked like a developer instead of like a person. I also found a bug that made harvesting impossible on a fresh account, which was a good reminder of why I keep restarting from zero.

**The Farmers Market now runs on one clock.** Until this week the app figured out whether the market was open using your phone's time, and the server used a different time zone. For a few hours every Friday and Sunday evening, the app would say "closed" while the server said "open," or the other way around. Now everyone shares US Central time, and the app asks the server what time it is instead of trusting the phone. I checked Friday and Sunday evenings, both daylight saving weekends, and New Year. The market weather card, the closed market tip, and How to Play now say "south central Kansas," which is where the market lives.

**The double boosts stopped being sneaky.** 2x Next Harvest and Double Next Batch used to either refuse a second purchase or quietly stack into a 4x. Now a second purchase gives you a second boost, and the game says it plainly: "Next 2 harvests: 2x yield each." Buy two, get two. Nothing more, nothing less.

**A sick tree is "pests" now.** I had been calling it blight in some places and pests in others. Players say pests, so every popup, tip, and button does too. Same cleanup for "soil," which is "soil quality" everywhere, and for the first sale card, which no longer says "4.2x" and just tells you what happened in plain words.

**Popups know their manners.** After your first harvest I saw a pest popup, then a big "you just found your margin" screen land right on top of it. Now the order is the Harvested popup, then the sale result, then the pest popup, then anything else. When a Getting Started step pays out a free Harvest Skip, a popup points at it and tells you where to tap.

**Small things that add up.** The coins sheet shows when the next coin ad is ready. The Orchard inventory shows what your apples are worth. A sapling says "Grows up in…" instead of "Still growing." Sign Out asks before it signs you out, and the delete button is red.

**One honest note.** Apple's review pushed back on a message that showed raw ad error text. Every ad button now says "No ad available" and explains what to try. The iOS build will also be iPhone only at launch. iPads can still run it in phone mode, but I would rather ship one layout that works than two that are rough.

Next up is more cold playthroughs, and then real builds on real phones.

Charles
