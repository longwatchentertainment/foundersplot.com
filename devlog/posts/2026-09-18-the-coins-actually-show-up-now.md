# Dev Log #8: The Coins Actually Show Up Now

Last week was all paint. This week went back to the parts of the game that decide whether it's fair.

The biggest one: buying Founder Coins didn't work. You could tap Buy Coins, the store would take the money, the app would happily report success, and then no coins would appear in your balance. The purchase call resolved true and never actually handed anything to your save file. That's the worst kind of bug, because nothing looks broken until you go looking for the coins. It's fixed, and it's fixed on the server side rather than in the app, which matters: the store tells my backend a purchase happened, the backend checks that it's real, and only then does it queue your coins. It also can't double grant if the store retries the message. I tested it end to end on a real phone with a sandbox purchase and watched the 100 coins land on their own without me tapping anything.

While I was in the coin economy I finished a rule I'd half built: every repeatable boost now offers both paths, coins or a rewarded ad, every single time. Harvest 2x, grade boost, double batch, the weekend market premium, label and color unlocks. The more expensive ones ask for more than one ad watch now instead of one ad unlocking anything regardless of price, with a little "2 of 3 ads watched" counter so you can see where you are. I'd rather you always have a way to get something without paying, and I'd rather that way not be free money for the expensive stuff.

Also new: every coin spend asks you first. No more tapping a button and watching coins vanish because you didn't realize that button cost something.

Smaller player facing things from the week. Harvest and batch results now come up on a real panel with an illustrated icon for whatever you just made, one line per grade every time including the ones that came up empty, and the words "Estimated value" spelled out instead of a cryptic abbreviation. Brand customization got pulled out of the debug guts and into the Account tab as a proper Customize Your Brand section with the real label art. The Processing product list became a searchable inventory browser instead of a list that gets worse with every recipe I add. Business name saving works now, the keyboard was eating the first tap on the save button. The Market recap scrolls instead of running off the bottom. Close buttons on full screen popups aren't hiding behind the status bar anymore.

The game also has a new icon, a hand painted apple and orchard, with a splash screen that finally matches it instead of showing the old pre rebrand tree.

There's a first sale moment now too, the one where the game shows you what your apples are worth raw versus what they're worth as juice. I'm not going to spoil the number here. It's a big multiplier and it's the whole reason the game exists.

Next up is stripping the debug menu out of the build so I can put this in front of strangers.

Charles
