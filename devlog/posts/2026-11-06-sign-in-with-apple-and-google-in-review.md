# Dev Log #15: Sign In With Apple And Google Is Out For Review

**Sign in with Apple and Google is built, tested, and submitted to both stores.** Version 1.1.0 is now waiting on approval. Google Play usually goes live on its own once Google signs off. On iPhone I will release it as soon as Apple approves it. I will tell you here when it is live.

When it ships, you will see a "Continue with Google" button on Android. On iPhone you will see both Apple and Google, because Apple requires that you offer its option whenever you offer another one. You can skip making a password entirely. If you already have an account made with email, signing in with the same email brings you to the same farm, so you do not start over. I tested it on an Android emulator and on my own iPhone this week, including one account that ended up with email, Google and Apple all attached to it. There is one odd case I did not test, which is Apple's "Hide My Email" feature creating a separate account. If you hit it, tell me and I will fix it.

**Why a new store version was needed.** Both sign in options use code that has to be built into the app itself. I cannot send it to you as a quiet background update the way I send most fixes. That is why this one takes a store review, and why 1.1.0 is a real download rather than something that just appears.

**The Market price preview now scrolls on iPhone.** This one I found on my own phone. The list of prices would not scroll when I swiped it. The list was sitting inside something that grabbed the swipe first. I rearranged how the tap outside to close works, so the list gets your finger. The same fix went into the portrait picker and the other pop up panels, and the market list now shows a scrollbar so you can tell it scrolls. This fix already went out as a background update to people on 1.0.x.

**Ad boosts got cheaper.** Pest Treatment and Guaranteed Grade A now cost 1 ad each. The two 2x boosts now cost 2 ads each. Those were the actions where the old price felt like too much work for what you got back. My own risk here is that fewer total ads get watched, since those four were about a third of the ads in the first week of data. I am going to watch whether you use them more often, which would make it a fair trade. Instant Soil Restore is still 25 coins, which is 3 ads, and I know that is a bit out of line with the rest. I am leaving it alone until I see more play.

**Better messages when ads will not load.** One player told me ads kept failing on their work WiFi, and fine at home. Some work and school networks block ads. The game now says so when an ad does not load, and suggests trying mobile data. A timeout used to show a generic error, and now it shows the helpful one.

**New App Store screenshots are live.** The old set was a half finished July leftover in one slot. Apple locks screenshots on a live version, so changing them meant a tiny extra version. They went out on October 31.

**What I am watching.** The first App Store numbers are small and mostly friends and family. Lots of people see the game in App Store search, and very few tap to open it. That tells me the icon, name and first screenshot are the part to improve, not the game inside.

Next week is about getting 1.1.0 released and checking Google sign in from a real Play Store install. iPad support is still on my list but is not started in earnest. If anything in the new sign in feels wrong, tell me. That is the most useful thing you can do right now.

Charles
