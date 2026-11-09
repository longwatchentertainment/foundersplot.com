# One rewarded ad came back as four rewards, and other things I found by looking at real players

Solo dev, React Native with Expo and Supabase. The game went live on Google Play on October 20 and on the Apple App Store on October 28, so it is now in both stores. This was the first week where I could look at what real players actually did instead of guessing.

**One ad watch, four rewards.** I use AdMob rewarded ads with server side verification, so a callback from Google's servers tells my backend that a player earned the reward. Looking at the data, one player watched a single ad and my backend received four signed callbacks within a second, each with a different transaction id. My dedupe was keyed on transaction id, so all four were valid. Three of them sat unclaimed and would have paid out future ads instantly. The fix is a before insert trigger in Postgres that skips a reward when the same player and action already has one in the last 10 seconds, plus a migration that deleted the three stored duplicates. Lesson: dedupe on what the player did, not only on the id the third party gives you. I found it because I went looking at rows. No alert would have caught it.

**Instrument the first minutes, then read it.** I added analytics events for app opens, screen views, every ad attempt and how it ended, and sign up, so I can see where a brand new player stops. I also tag events with the OTA update the device is running, so I can confirm which players have picked up the latest update. Then I built a private per player view in an admin schema that the API never exposes, and a local HTML dashboard that builds from it with a plain Node script. It has charts, drilldowns, and a list of which of 25 unlocks each player has reached. It holds player emails, so it is a local file and not hosted anywhere. A small caveat: my first version of the builder choked on the CLI's plain terminal JSON output, which cost me a commit to fix.

**Confirm dialogs are cheaper than refunds.** Some purchases already asked first, but others spent on the first tap, including the first piece of equipment, the next plot and the weather buildings. Now every spend asks, including the Product Inventory buy and upgrade buttons, which I missed on the first pass. It is a small change, and it reduces the chance of a support email from someone who tapped fast.

**Cleaning up wording and the early funnel.** Grade buttons now show per grade counts, the recipe picker shows stock split by grade, the second batch slot got plain names and messages, and the tutorial card about profit margin no longer shows again to a player who has already sold something. The rating request now waits for a specific unlock plus two days of play. Asking too early is the easiest way to buy a bad review.

**Sign in with Apple and Google (built, not released yet).** Several players asked for it, so I wired both through signInWithIdToken. Two details. Apple requires that if you offer third party sign in, you offer Apple too, so iOS shows both buttons or neither. And both libraries are native modules, so they need a new store build. I made the buttons hide themselves on older builds so the code is safe to ship over the air first. Account deletion also has to revoke the Apple token, so it needs a few server secrets, and a failed revoke never blocks deletion. The Google client IDs are placeholders until my Google Cloud setup is done, so that button stays hidden for now.

**A versioning trap I caught in time.** App Store screenshots on a live version are locked, so changing them meant a new version, 1.0.1. My runtimeVersion was tied to the app version, so that bump would have cut 1.0.1 installs off from the over the air updates going to 1.0.0 players. No native code had changed, so I pinned runtimeVersion to 1.0.0 and everyone keeps sharing the same updates. If you use expo-updates, decide on purpose what your runtimeVersion is tied to before a store version bump surprises you.

**Scoreboard.** About 30 commits this week and one real bug found by reading data rather than by testing.

**iPad.** I am working on an iPad supported build. It is not done, so I have no lessons to report yet.

**Still open.** I want to verify the funnel events fire correctly with real traffic, and I still have a couple of stale state bugs from earlier on my list.

Happy to answer questions about any of it.
