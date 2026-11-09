# Playtesting the first session like a stranger

Weekly build log from a solo dev (React Native, Expo, Zustand, Supabase). 19 commits this week, about 2,070 insertions and 210 deletions across 46 files. After weeks of fixing what I built, this week I ran structured new player playtests with no debug tooling and treated first session friction as bugs. Some things worth passing on.

**Put the first session on a stopwatch.** I reset a fresh account and played it cold three times, logging every confusion. Round three took about 19 harvests and 15 rewarded ads to reach my first progression gate. Rather than guess, I traced it. Soil quality drops after every harvest, and Grade A yield drops with it, so a new player averaged about 2.6 Grade A apples per harvest against a goal of 50. I lowered the goal to 35 through a config row (no rebuild) and the next pass took about 11 harvests. The bigger lesson is that the number I was tuning was never the real cause. A hidden decay curve was. Surfacing it in the UI fixed more than the retune did.

**A gate followed immediately by a wall.** The gate opened at $30 lifetime revenue, but the first press cost $75, and the player had about $31. I considered three fixes: discount the first purchase, raise early prices, or explain the gap. I went with a fourth. The gate itself now grants the press. It cost one migration that adds two step conditions and a reward_equipment column, and I recreated the claim function. I could not run my SQL harness locally this time, so I added checks to the test file and verified on the live database. I do not love that, and it is on my list.

**Content as data paid off.** The Getting Started steps live in a table, not in code. Adding a step, moving a reward, or splitting one into two (the 50 coin reward moved to a new first juice step) was a row change plus a small condition addition. Claims are verified server side against real records and granted once, so a modified client cannot invent progress. I also added one analytics event per claimed step, so I can see where real players stall instead of guessing from my own runs.

**Shared code beats duplicated flows.** The coins sheet needed the same daily login and rewarded ad actions that the Account screen already had. I moved both into one module that both screens call. Two UI surfaces, one code path, no drift.

**Errors should be written for players.** I routed server error strings through one translation function. Known messages get plain wording, unknown ones become a generic retry message. It is a small file that removes a whole category of "what does that mean" moments.

**Store requirements are real work.** In app account deletion is required by Apple and Google. I built an Edge Function that deletes the player's ad reward rows and then the auth user, and everything else cascades from the auth table. I kept the purchase event log on purpose, with an anonymous id only, because refunds and disputes need it. I also added privacy policy, terms, and support links to the sign up screen and the Account tab.

**Misses.** A reminder says notifications are off when the OS permission is already granted, because two places read two different sources of truth. Not fixed yet. The common thread this week: the best bugs came from playing as someone who knows nothing, which is hard to do to your own game.
