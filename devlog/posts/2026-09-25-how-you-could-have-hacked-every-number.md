# Dev Log #9: How You Could Have Hacked Every Number In This Game (And Now You Can't)

Short version up front, since it is basically the whole week: nothing new to play this week. Instead I spent it closing a hole that would have let anyone give themselves infinite money, coins, and inventory. Here is what that means and why it ate the entire week.

First the smaller stuff, because it happened too. The avatar picker is real now. Tap your portrait on the profile screen and a proper toggle comes up with 56 actual painted portraits split male and female, instead of the placeholder circle it used to be. The Orchard's product inventory got redesigned into collapsible rows, one per apple variety, each with real per grade artwork instead of a locked crate icon standing in for art that did not exist yet. Processing got the same treatment, with 24 new pieces of per grade product art wired in. The weather mitigation buildings got their artwork recropped a third time because the first two crops still clipped at the edges on some screen sizes. None of that changes how the game plays. It just makes it look like the finished thing instead of the placeholder version.

Now the actual week. A security review turned up something I needed to hear: the entire economy, your cash, your coins, every item in your inventory, lived only in your phone's local save, and the cloud sync just copied whatever was sitting there up to the server with no checking at all. That means a modified app, or even someone rewriting the network request on the way out, could set their own balance to any number they wanted, and it would become their real, permanent, cloud synced state. That is not a small bug. That is the game having no lock on the front door.

Fixing it properly meant every single action that touches money had to move from something your phone decides to something the server decides, with your phone just displaying the result. Planting, watering, harvesting, selling, buying equipment, running a processing batch, restocking a market booth, claiming an achievement, all of it. That is a bigger job than it sounds, and it took the whole week in four pieces: the orchard, the processing chain, the market, and then daily logins, achievements, and cosmetic unlocks last.

I also had someone independently review all of that new work before calling it done, because I did not trust myself to catch my own mistakes on something this important. That review found two bugs that would have broken the game for every real player on day one, not edge cases, everyone. Both are fixed now. It also caught smaller things, like an ad reward that could get lost if you watched it at exactly the wrong moment. Also fixed.

None of this is visible to you if everything goes right, which is sort of the point. What is visible is that nothing about how you play changed, and what changed underneath means the numbers you see on your screen are actually yours and cannot be quietly rewritten by anyone, including me by accident.

Next up is putting all of this in front of an actual phone instead of just my read of the code, and then stripping the last debug buttons out so I can finally let strangers in to play.

Charles
