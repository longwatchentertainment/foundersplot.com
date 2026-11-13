# Dev Log #10: A Second Apple, A Faster Road To Tier 2, And A Lot Of Me Tapping Through The Game On An Emulator

This was the week the game started feeling like a game again after last week's lockdown work. Some of it is new to play, and some of it is me finding out what I broke by tapping through every screen myself.

**Honeycrisp is in.** Fuji has been the only tree you could plant, and the story beats have been talking about a cutting offer for ages with nothing behind it. Now there is a real second variety. After your 11th harvest, Honeycrisp unlocks on its own. You do not have to find a menu or pay for it, it just shows up as a choice the next time you plant in an empty plot. It costs $5 to plant and gives 18 apples per harvest instead of Fuji's 12, but it takes 4 days between harvests instead of 3. That works out to a modest edge per day, not a strict upgrade, and I did that on purpose. I did not want Honeycrisp to make Fuji pointless. Now you are actually choosing.

**Getting to Tier 2 is faster.** The Processing Shed used to ask for 100 Grade A apples and $60 in lifetime revenue. It now asks for 50 apples and $30. I lowered it because I did not want the early game to turn into a grind, and honestly because I tried it myself and it felt slow. I also raised the watch an ad to skip a harvest cooldown to 3 hours, so ads feel like a real shortcut instead of a nag. I want you to reach Processing because you are enjoying the orchard, not because you got worn down by it. I may tune these numbers again once other people play.

**The weather card finally tells you the whole story.** Before, a frost or hail event would pop up, you would answer it, and then the Orchard screen went back to "Clear skies" like nothing happened. Now the card shows what the event actually did to you, like a yield penalty or guaranteed Grade A harvests, and it remembers the last event and how you handled it, for example "Last event: Frost Warning, you protected against it." I also fixed a nasty one I found while testing. Closing a bad weather pop up with the X used to quietly count as accepting the damage. A Frost Warning cost me 20 percent of a harvest just because I dismissed a window. Closing it now leaves the decision open on the card until you choose or it expires.

**The first screen looks like a real first impression.** I redesigned the welcome and sign in screen, reusing the Orchard hero art, and spent far too long going back and forth on the title font. It is Playfair Display now, and yes, I changed it more times than I want to admit.

**Smaller stuff.** All 16 starter and mid tier equipment images got recut because pieces of neighboring images were bleeding into them. Equipment shelf cards are tappable to buy or upgrade. The Orchard boost buttons moved under the Weather card, and the "Watch Ad" text became a little icon. Processing timers now tick properly and use the server's clock, after a batch I skipped sat on "1 min left" for four minutes.

**Bugs I found and fixed.** Chopping a tree and then replanting failed. Honeycrisp did not unlock for existing players because their old harvest count never carried over. Upgrading equipment did not show the install countdown. A fresh account could not use its free label color. One story beat told you the Processing Shed was ready when you were still at 43 of 50 apples. All fixed, all found by actually playing.

Next week is more of the same, playing the game as a stranger would, then clearing the last of the debug buttons so I can let real people in.

Charles
