# Dev Log #4: The Market Learned Some Names

Last time the recipe catalog got finished up and grade started actually mattering on price. This week I went back to a promise from that post: the farmers market getting its full scope back. It's a much bigger, weirder place now.

**The market has regulars now.** Show up to the market weekend after weekend and the same customers start recognizing you. Miss a weekend and that streak resets. Build it back up far enough and those regulars start paying a real premium, 10 to 15 percent over the base price, just for being someone they trust. This is a different thing from your market reputation, which is a separate stat that tracks the overall quality of what you've been selling over the long haul and never really goes backward. Reputation is "have you always been good." Loyalty is "are you showing up right now." They can move in opposite directions at the same time, and that felt like the honest way to model two very different real things instead of pretending they were the same stat wearing two names.

**Sometimes a food blogger shows up.** Rare, and mostly out of your control, but a good review gives one of your products a real demand bump for the following weekend. A bad one does the opposite, though noticeably smaller, since one grumpy blogger shouldn't tank your whole business.

**A wholesale buyer might make you an offer.** Once you've been attending long enough to look like an established vendor, a scout occasionally shows up wanting to buy a big batch in one shot, well past what a normal weekend would move. Lower price per unit than retail, but it clears out inventory fast and skips the per-table capacity limit entirely.

**Other vendors are competing with you for the same customers now**, and the weather is real. Not the random storm/drought events that already affect your orchard, but actual current weather for a real city, pulled live and used to nudge how many people show up to the market that weekend. Rain keeps the casual browsers home the same way it would at a real farmers market.

**You can also upgrade your booth itself.** A better canopy and some proper shelving let you actually display, and sell, more product per table per day. That's a straight cash purchase, separate from reputation, since one is about being trusted and the other is just about having more physical space to sell out of.

None of this has made it in front of a real device yet, it's all been built and checked against the design doc and the test suite this week, so numbers might move once I actually play it on my phone. That's next. Also spent a chunk of time this week finding and fixing a bug where reputation could accidentally promote and demote you in the same moment, which would have been a confusing thing to experience as a player and was worth catching before it shipped anywhere near a build.

Charles
