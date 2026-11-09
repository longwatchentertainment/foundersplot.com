# Dev Log #11: Teaching A Stranger How To Run An Orchard

Last week I spent a lot of time tapping through the game to see what I had broken. This week I changed the question. I stopped asking whether the game works and started asking whether someone who has never seen it would know what to do. I reset my account, played it cold with no debug menu, and wrote down every place I got confused. Then I fixed those places. Three rounds of that this week.

**There is a Getting Started card now.** It sits at the top of the Orchard and shows one step at a time: harvest, sell, reach the Processing Shed, make your first juice. Finish a step and it pays out a small reward on its own. The point is that nobody should have to guess what comes next in their first hour. There is also a How to Play screen with seven short sections, reachable from the Account tab or the little question mark next to your coins.

**Buttons say why they are greyed out.** Before, a Harvest button you could not press just sat there looking broken. Now it tells you: "Ready in 2h 41m," "Still growing," or "Needs care." Error messages got the same treatment. If the server says no, you get plain words instead of something that sounds like a crash. I also removed the phrase "Tier 2" from everything you read, since nobody should have to learn my internal name for the Processing Shed.

**Selling is much harder to miss.** The Harvested popup now offers Keep or "Sell these," with the dollar amount on the button. In my third test I noticed it was easy to tap Keep every time and end up with 228 apples, zero dollars, and a card telling me to sell. So during that step the card now has a "Sell all" button right on it.

**The first press is a gift.** In round two I reached the Processing Shed with about $31 and found the first press costs $75. That is a wall right after a door. So now a neighbor hands you their old Garage Sale Press when you unlock the shed. You earned the gate, the gate should not also charge you rent.

**Getting to the shed is faster.** It took me about 19 harvests and 15 ads to get there, which is too long. The Grade A apple goal dropped from 50 to 35, and the next round took about 11 harvests. I also found out why it had been slow: soil wears down after each harvest, and worn soil gives fewer Grade A apples. The tree card now flags low soil in red and points you to Compost.

**Waiting got friendlier.** Your tree cooldown now says "We'll notify you when it's ready," or gives you a button to turn notifications on, because brand new players never plant a tree and never saw the permission ask.

**Boring but required.** The sign up screen links to the Privacy Policy and Terms, the Account tab links to Support, and you can delete your account from inside the app. Apple and Google both insist on that last one, and I agree with them.

Still all emulator testing. Real people are next, and I expect them to find things I walked right past.

Charles
