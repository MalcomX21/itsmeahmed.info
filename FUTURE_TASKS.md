# Future Tasks

Things to do on itsmeahmed.info later. Tick items off as you go.

---

## 1. Turn on Testimonials

The Testimonials section is already built but **disabled**. It stays hidden until you switch it on and add at least one real testimonial.

### Share the private submission link

Send mentors this link (it works once the site is live):

**https://itsmeahmed.info/testimonial.html**

- It isn't linked from the site, and search engines are told not to index it (`noindex` plus `robots.txt`).
- Each person enters their name, title, organization, relationship and quote, and must tick a consent box.
- Submissions go to **itsme_ahmed@outlook.com** via Formspree, with a subject like *"New testimonial from Jane Doe (Manager)"*. **Nothing is published automatically.**
- Each email includes a `json_entry` field: a ready-to-paste entry for `data/testimonials.json`.
- Formspree's free plan allows 50 submissions a month, shared with the contact form.

**Email template**

> **Subject:** Would you write a short testimonial for my portfolio?
>
> Hi [Name],
>
> I hope you're doing well! I've just launched my professional portfolio at itsmeahmed.info, and I'd be grateful if you could write a short testimonial about our time working together at [Ebryx / Algoma University].
>
> It only takes a couple of minutes. Two to four sentences about my work, how I approach problems, or what it was like to collaborate would be perfect:
>
> 👉 https://itsmeahmed.info/testimonial.html
>
> I review everything before it goes live, and only your name, title and quote will be shown.
>
> Thank you so much. It means a lot!
>
> Best regards,
> Ahmed Sartaj

Tick off who you've asked:

- [ ] A professor or supervisor from Algoma University (for example, a co-author on the SNPD 2025 paper)
- [ ] A manager from Ebryx
- [ ] A colleague from Ebryx (security team)
- [ ] Optional: a manager from Canadian Tire

A LinkedIn recommendation is another easy source, but ask the person before you reuse it.

### Add them to the site
1. Open [`data/testimonials.json`](data/testimonials.json). On GitHub, click the file, then the ✏️ pencil icon.
2. Change `"enabled": false` to `"enabled": true`.
3. Paste the `json_entry` from the submission email in place of a template entry. Light edits for length are fine. To add one manually, it looks like this:
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

- [x] Install the GitHub CLI: `winget install --id GitHub.cli`
- [x] Sign in: `gh auth login`
- [x] Create and push the repo (from this folder):
      `gh repo create itsmeahmed.info --public --source . --push --homepage "https://itsmeahmed.info"`
- [x] In the repo, open **Settings → Pages**, set the source to `main` and `/ (root)`, and the custom domain to `itsmeahmed.info`
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
