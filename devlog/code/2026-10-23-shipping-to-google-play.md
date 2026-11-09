# What I learned shipping my first mobile game to Google Play this week

Solo dev, React Native with Expo, Supabase for the backend. The game went live on Google Play on October 20 after about a day in review. Some of it might save you time.

**Your own test tools can leak into production.** Sandbox purchases (TestFlight and Google Play license testers) are free. I realized that with a server side webhook that grants coins on every purchase event, a free tester purchase grants real in game currency. I added a table of allowed tester accounts. The webhook still records every event, but only grants coins to accounts on the list. The one account I had to remember to add was the Apple review demo account, because App Review buys in sandbox and has to see the coins arrive. If you use RevenueCat or anything similar, check what your webhook does with sandbox events before launch.

**A cloud save bug that could clone currency.** On sign in, the app compared the save on the device against the server and could upload the device copy. If the device still held a different account's save, that save could land on the account that just signed in. I found it while testing two accounts on one emulator. The fix is a rule: never upload a device save that belongs to another account on sign in. I was lucky that I found it before any real money was involved. If your game has a local cache and multiple accounts, test the account switch specifically.

**Two key fingerprints for Android App Links.** I wanted referral and password reset links to open the app. Android needs a digital asset links file on your website with the SHA 256 fingerprints of your signing certificate. With Play App Signing, the key Google signs with is not the key you upload with. I published both fingerprints. Google's Digital Asset Links API then read both, and the Play Console deep links page said all links were working. I would have lost an hour if I had only used the key from my own build.

**Smaller process notes.**

I added a forced update switch (a minimum app version value in a config table) so I can make old builds ask for an update. It is a few lines of code and I would not launch without it again.

Play Console would not let me turn on managed publishing for a first release, so the app went live automatically when approved. Plan your launch timing around that if you want control.

**Error messages are product work.** Apple's earlier review rejected a build for showing a raw ad error. This week I did the same cleanup for coin purchases (cancelled, unavailable, and failed now have separate messages) and for sign in, sign up and reset errors. Long button labels now shrink to fit instead of truncating. None of this is exciting, but all of it is what a reviewer or a first time player sees.

**Search visibility, honestly.** Searching the game's name mostly returns a 2016 film. I added a sitemap, structured data and a canonical URL to the website, then verified it in Google Search Console and Bing Webmaster Tools. It is too early to know if it works. I will report numbers once there are enough to mean something.

**The honest scoreboard.** Around ten commits in the app repo this week, which is a lighter week than usual because most of the work was submission paperwork, store assets and website changes. Two real players on day one. The iOS build is still waiting for Apple.

**Still open.** A second device can show stale coins after a claim on another device, and a stale ad button can play a full ad before refusing. Both are low priority and both are on my list.

Happy to answer questions about the submission process.
