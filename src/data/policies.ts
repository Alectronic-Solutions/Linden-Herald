export type PolicySection = { heading: string; body: string[]; list?: string[] };
export type Policy = {
  slug: string;
  title: string;
  kicker: string;
  blurb: string;
  updated: string;
  sections: PolicySection[];
};

const UPDATED = "September 2026";

/**
 * These describe how the site actually behaves: a static export with no
 * analytics, no advertising trackers and no accounts. Keep them accurate if
 * that changes. They are a starting point, not legal advice, and should be
 * reviewed by the Herald's attorney before launch.
 */
export const policies: Record<string, Policy> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    kicker: "How we handle your information",
    blurb:
      "The short version. We collect what you send us. We use it to answer you. We do not sell it.",
    updated: UPDATED,
    sections: [
      {
        heading: "What we collect",
        body: [
          "This website has no accounts and no advertising trackers. We do not set cookies to follow you. We do not run analytics that build a profile of your visit.",
          "The only information we receive is what you type into one of our forms and send us: a subscription request, a classified listing, a legal notice enquiry, an obituary submission, a calendar event or a message to the newsroom.",
        ],
      },
      {
        heading: "What we do with it",
        body: [
          "Form submissions are delivered to the Herald's email inbox and read by a person in the office. We use them to answer your question, publish what you asked us to publish, or start the subscription or notice you requested.",
          "We do not sell or rent subscriber information. The same goes for advertiser information and anything else you send us.",
        ],
      },
      {
        heading: "Who else is involved",
        body: [
          "Forms are delivered through FormSubmit, a third-party service that forwards the contents to our inbox. The site is hosted on a static hosting provider that keeps standard server logs, which typically include IP addresses and are retained by that provider under its own policy.",
          "We have no control over what those providers log. We do not combine their logs with anything you send us.",
        ],
      },
      {
        heading: "Publication",
        body: [
          "Anything you submit for publication is intended to be published. Obituary notices, classified listings, calendar events, letters to the editor and legal notices appear in the printed paper and on this site, and printed pages are permanent.",
          "If some part of what you send is background only and not for print, say so and we will treat it that way.",
        ],
      },
      {
        heading: "Children",
        body: [
          "This site is not directed at children and we do not knowingly collect information from anyone under 13. We do publish photographs of local students at school and community events in the ordinary course of covering the district. If you are a parent or guardian and want a photograph or name reconsidered, call the office and we will talk it through.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "Call the Herald at any hour and ask what we hold about you, ask us to correct it, or ask us to delete it from our records. We will do what we reasonably can. We cannot unpublish a printed newspaper, and we do not remove accurate published reporting from the archive on request, though we do correct errors of fact promptly and permanently.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "If this policy changes we will post the new version here with a new date. Material changes will also be noted in the paper.",
        ],
      },
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms of Use",
    kicker: "The ground rules",
    blurb: "What you can do with what you find here, and what we can promise about it.",
    updated: UPDATED,
    sections: [
      {
        heading: "Using this site",
        body: [
          "You are welcome to read this site and to link to anything on it. Print pages for your own use if you like. Quoting a short passage with attribution is fine.",
        ],
      },
      {
        heading: "What belongs to whom",
        body: [
          "The Herald's articles, photographs, page layouts and archives are the property of the newspaper or its contributors, and are protected by copyright. Republishing an article or photograph in full, on a website, in a newsletter or in another publication, requires written permission from the office.",
          "Advertisements and legal notices remain the property of the advertisers who placed them.",
        ],
      },
      {
        heading: "What you send us",
        body: [
          "When you send us a letter, photograph, obituary, listing or news tip for publication, you confirm that it is yours to send and that we may publish it in the newspaper, on this site and in the archive. You keep ownership of your work.",
          "We may edit submissions for length and accuracy. We may also decline to publish something.",
        ],
      },
      {
        heading: "Accuracy and availability",
        body: [
          "We work hard to get things right and we correct errors when we find them. Even so, this site is provided as it is. We cannot warrant that everything on it is complete or current.",
          "Rates, deadlines and schedules published here are indicative. The figures we confirm on the phone or in writing are the ones that govern. Legal notice pricing in particular depends on the requirements of the court, and we confirm every notice before it runs.",
        ],
      },
      {
        heading: "Links to other sites",
        body: [
          "Where we link to another organization, we do so because it is useful. We are not responsible for what is on the other end of the link.",
        ],
      },
      {
        heading: "Governing law",
        body: [
          "These terms are governed by the laws of the State of California. Any dispute belongs in the state or federal courts serving San Joaquin County.",
        ],
      },
    ],
  },

  accessibility: {
    slug: "accessibility",
    title: "Accessibility",
    kicker: "Readable by everyone in the district",
    blurb: "Where we stand, and how to tell us we have fallen short.",
    updated: UPDATED,
    sections: [
      {
        heading: "What we have built for",
        body: [
          "This site was built to meet the Web Content Accessibility Guidelines, version 2.2, at level AA. That is the standard the Americans with Disabilities Act is measured against. In practice it means:",
        ],
        list: [
          "Every page works from the keyboard alone, with a visible focus outline and a skip-to-content link",
          "Nothing that has keyboard focus is left hidden underneath the navigation bar at the top of the page",
          "Text and background colors are tested for contrast, and nothing depends on color alone to make sense",
          "Buttons, links and filters are at least 44 pixels tall, well over the 24 the guidelines ask for, because a target you have to aim at is a target you can miss",
          "Images carry descriptive alternative text, and decorative artwork is hidden from screen readers",
          "Headings run in order, one main heading to a page, so a screen reader can navigate by structure",
          "Text reflows to a phone screen without sideways scrolling, and stays legible when enlarged to 400 percent",
          "Animation respects the reduced-motion setting in your operating system, and no content depends on it",
          "Every form field is labelled, says which answers are required, and lets your browser fill in your name and address for you",
        ],
      },
      {
        heading: "Where we fall short",
        body: [
          "Back issues in the archive are scanned PDFs of printed pages. Those scans are images of text, which means screen readers cannot read them and they cannot be enlarged without losing sharpness. This is an honest limitation of a print archive, and one we would like to fix as the collection is digitised.",
          "If you need something from a back issue, call the office. We will read it to you or send you a transcription.",
        ],
      },
      {
        heading: "Large print and read-aloud",
        body: [
          "There is a text size control in the thin strip at the very top of every page, beside the date. Choose Larger or Largest and the whole paper grows with it. Your choice is remembered on this device, so you only have to set it once, and it does not change anything for anyone else who uses the same computer.",
          "Every browser can also enlarge this site with Ctrl and the plus key, or Command and plus on a Mac, and the layout is built to hold together when you do.",
          "If a printed page is hard to read, call us and we will read it to you.",
        ],
      },
      {
        heading: "Tell us",
        body: [
          "If any part of this site is hard to use, we want to hear about it. Call the office at any hour or send us a note through the contact page.",
        ],
      },
    ],
  },

  corrections: {
    slug: "corrections",
    title: "Corrections & Ethics",
    kicker: "How we handle getting it wrong",
    blurb: "The standard we hold ourselves to.",
    updated: UPDATED,
    sections: [
      {
        heading: "Corrections",
        body: [
          "We correct errors of fact promptly and in print. A correction runs in the next available edition.",
          "We do not quietly edit a published story to make an error disappear. If something changed, we say what changed and when.",
          "To report an error, call the office at any hour or write to us. Tell us what is wrong and, where you can, how you know.",
        ],
      },
      {
        heading: "Where our reporting comes from",
        body: [
          "Our correspondents live and work in Linden. We attend the meetings we write about, and we call the people involved before we publish.",
          "We identify sources by name wherever we can. We grant anonymity rarely, and only when someone faces real consequences for speaking.",
        ],
      },
      {
        heading: "Opinion and news",
        body: [
          "Editorials are the view of this newspaper and are labeled as such. Columns are the view of the person who signed them. Letters are the view of the reader who wrote them. None of that belongs in a news story, and we work to keep the line visible.",
          "We publish letters from people in the district over a real name. We edit them for length and accuracy, not for whether we agree.",
        ],
      },
      {
        heading: "Advertising",
        body: [
          "Advertisers do not get favorable coverage, and they do not see stories before they run. An advertisement buys space in the paper.",
          "Advertising that could be mistaken for a news story is labeled as advertising.",
        ],
      },
      {
        heading: "Conflicts of interest",
        body: [
          "In a town this size, everybody knows everybody, so pretending otherwise would be dishonest. Where a member of our staff has a personal stake in something we are covering, we disclose it in the story or hand the story to somebody else.",
        ],
      },
      {
        heading: "Photographs",
        body: [
          "We do not stage news photographs. We do not alter them beyond ordinary adjustments to exposure and color. A photo illustration is labeled as one.",
        ],
      },
    ],
  },
};

export const policyList = Object.values(policies);
