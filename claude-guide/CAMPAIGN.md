# Claude Power Guide — LinkedIn lead-magnet campaign

Everything for the "comment → get the free guide" funnel lives here.

## The funnel at a glance

```
LinkedIn post ("comment CLAUDE")  →  you reply / DM the link
        →  landing page  (/claude-guide/)  →  visitor enters email
        →  Make webhook  →  lead saved in the "Claude Guide Leads" data store
        →  instant PDF download  (+ emailed copy, once Gmail is connected — see below)
```

## What's already built and working

| Piece | Where | Status |
|---|---|---|
| The resource | `Claude-Power-Guide.pdf` (4-page PDF) | ✅ Done — edit the `[YOUR NAME]` line before launch |
| Landing page | `index.html` → `/claude-guide/` | ✅ Done |
| Share preview image | `og-image.png` | ✅ Done |
| Email capture | Make webhook → data store | ✅ Live and tested |
| Instant download | on the page after submit | ✅ Done |
| Auto-email the link | Make + Gmail | ⏳ Needs Gmail connected in Make (one-time, ~30s) — see below |

## The Make setup (already created in your account)

- **Webhook URL:** `https://hook.eu1.make.com/yu4bebq2fgv2dejr8k1p1vdnfgq9cicp`
- **Scenario:** "Claude Guide — Lead Capture" (id 6317078) — **active**, runs instantly on each submit
- **Data store (your list):** "Claude Guide Leads" (id 138825) — fields: email, name, source, createdAt
- **Team / Org:** 1909062 / 7990328

**To see or export your leads:** Make → Data stores → *Claude Guide Leads* → Browse (or export to CSV).

## The one step left: turn on the auto-email

The page promises "we've also emailed you a copy." To make that fire, Gmail needs to be connected
inside Make (it isn't yet — only Notion is). Two options:

1. **Connect Gmail (recommended):** Make → Scenarios → *Claude Guide — Lead Capture* → add a
   **Gmail › Send an email** module after the data-store step → sign in once. Then the body is:
   - **To:** `{{1.email}}`
   - **Subject:** `Your Claude Power Guide is here 🎉`
   - **Body:** a thank-you + the download link
     `https://mcbbrothersconstructions.com/claude-guide/Claude-Power-Guide.pdf`
   (Say the word and I'll wire this module for you the moment Gmail is connected.)
2. **Launch without it for now:** the **instant download already delivers the guide**, so the funnel
   works today. If you prefer, I'll drop the "we emailed you" line from the page until Gmail is on.

---

## LinkedIn post — copy/paste

> **Why "comment to get it" instead of just linking?** LinkedIn suppresses posts that contain
> outbound links. Asking for a comment boosts reach, then you deliver the link by reply/DM.

### Version A — the "99%" hook
```
Most people use Claude like a search engine.

The top 1% use it like a senior teammate — and get output that looks like magic.

The difference isn't talent. It's ~10 small moves nobody teaches you:
• giving it a role + rules instead of a question
• showing one example of "good"
• letting it plan before it answers
• putting the first words in its mouth
…and a few more that change everything.

I put all 10 into a free 4-page guide — with a copy-paste prompt template you'll use daily.

Want it? Comment "CLAUDE" 👇 and I'll send you the link.
(Follow me too so it actually lands in your feed.)
```

### Version B — the short, punchy one
```
I've sent 1,000s of prompts to Claude. 90% of people leave its best work on the table.

So I wrote the cheat sheet I wish I had on day one:
10 power moves + a plug-and-play prompt template. Free. 6-minute read.

Comment "CLAUDE" and I'll DM you the link 👇
```

### Version C — story angle
```
A year ago my prompts were one boring line. The answers matched.

Then I learned how Claude actually wants to be talked to — roles, examples, tags, "think first."
My results went from meh to "how did you make that?"

I packed the 10 moves that mattered most into a free guide.

Want a copy? Drop "CLAUDE" in the comments 👇
```

## The DM / comment reply — copy/paste

When someone comments, reply (publicly or by DM) with:
```
Thanks for the interest! 🙌 Here's your free Claude Power Guide:
https://mcbbrothersconstructions.com/claude-guide/

Pop your email in and it downloads instantly. Enjoy — and tell me which tip you try first!
```

Tip: keep the link in a **DM** (or as a reply *after* you've liked their comment). Replying to every
commenter also pushes your post to more feeds.

## Before you launch — checklist
- [ ] Open `Claude-Power-Guide.pdf` and replace **[YOUR NAME]** with your name + LinkedIn handle
- [ ] Confirm the page is live at `/claude-guide/` (deploy/merge — see repo notes)
- [ ] (Optional) connect Gmail in Make to enable the auto-email
- [ ] Post Version A/B/C, then reply to commenters with the DM template
- [ ] Watch leads arrive in the Make data store
