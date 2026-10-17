# Future Tasks

Things to do on itsmeahmed.info later. Tick items off as you go.

---

## 1. Turn on Testimonials

The Testimonials section is already built but **disabled**. It stays hidden until you switch it on and add at least one real testimonial.

### Collect testimonials
Ask two to four people who know your work well:

- [ ] A professor or supervisor from Algoma University (for example, a co-author on the SNPD 2025 paper)
- [ ] A manager from Ebryx
- [ ] A colleague from Ebryx (security team)
- [ ] Optional: a manager from Canadian Tire

For each person, collect:

| Field | Example | Required |
|---|---|---|
| Quote | 2–3 sentences about your work | Yes |
| Full name | Jane Doe | Yes |
| Role / title | SOC Manager, Ebryx | Yes |
| Relationship | Professor / Supervisor / Colleague / Manager | Yes |
| Photo | Square headshot, about 200×200 | No |

Ask each person whether they're comfortable having their name and words on a public site. A LinkedIn recommendation is an easy source, but ask before you reuse it.

### Add them to the site
1. Open [`data/testimonials.json`](data/testimonials.json). On GitHub, click the file, then the ✏️ pencil icon.
2. Change `"enabled": false` to `"enabled": true`.
3. Replace a template entry with real content and set `"visible": true`:
   ```json
   {
     "quote": "Ahmed took ownership of our most demanding clients ...",
     "name": "Jane Doe",
     "role": "SOC Manager, Ebryx",
     "relationship": "Manager",
     "photo": "",
     "visible": true
   }
   ```
4. Delete any template entries you don't use, or leave them with `"visible": false`.
5. **Optional photo:** upload the image to `assets/img/testimonials/` and set `"photo": "assets/img/testimonials/jane-doe.jpg"`. Without a photo, the person's initials are shown.
6. Commit. The site updates in about a minute.

**To hide one later:** set its `"visible"` to `false`.
**To hide the whole section again:** set `"enabled"` to `false`.

> Make sure the file is still valid JSON. Each entry except the last needs a comma after its closing `}`. You can paste the file into https://jsonlint.com to check.

---

## 2. Publish the site

- [ ] Install the GitHub CLI: `winget install --id GitHub.cli`
- [ ] Sign in: `gh auth login`
- [ ] Create and push the repo (from this folder):
      `gh repo create itsmeahmed.info --public --source . --push --homepage "https://itsmeahmed.info"`
- [ ] In the repo, open **Settings → Pages**, set the source to `main` and `/ (root)`, and the custom domain to `itsmeahmed.info`
- [ ] In GoDaddy, unpublish the old Website Builder site and remove any forwarding
- [ ] Add the GoDaddy DNS records. The README's Deployment section lists them: four `A` records plus a `CNAME` record for `www` pointing to `malcomx21.github.io`
- [ ] When the DNS check passes, tick **Enforce HTTPS**
- [ ] Verify the domain under GitHub **profile Settings → Pages** to protect it from takeover

## 3. Contact form (Formspree)

- [ ] Send a test message from the live site and confirm it reaches itsme_ahmed@outlook.com. Confirm the first submission in Formspree if it asks.
- [ ] In the Formspree dashboard, restrict the form to the domain `itsmeahmed.info`

## 4. Keep content current

- [ ] **CHFI:** confirm whether it was renewed (the renewal date was 30 Apr 2025), then update its card
- [ ] **AWS:** if you recertify Solutions Architect or pass Security Specialty, update the Credly badge link and remove "(expired)"
- [ ] **SC-300 / CyberArk / AWS Security Specialty:** when you pass, add a cert card and update the *Currently Learning* progress bars (`--p` and `aria-valuenow` in `index.html`)
- [ ] **Resume:** replace `assets/resume/Ahmed-Sartaj-Resume.pdf` when your CV changes. Consider a version without your phone number for the public site.
- [ ] **Projects:** add GitHub repository links as you publish tools (for example, the automation scripts)
- [ ] **Medium:** link new articles from a project card or a future "Writing" section
- [ ] **Optional:** add an X/Twitter link and a booking link (Calendly or Microsoft Bookings). Placeholders are commented out in `index.html`.
- [ ] After big updates, change `<lastmod>` in `sitemap.xml`
