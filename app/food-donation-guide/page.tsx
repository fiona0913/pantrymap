"use client";

import Link from "next/link";
import { useState } from "react";
import Modal from "../../components/donation-guide/Modal";
import { X } from "lucide-react";

const cardListClassName =
  "mt-2 list-disc pl-6 space-y-2 text-sm text-black leading-6";
const faqAnswerParagraphClassName = "w-full max-w-none whitespace-normal";

const faqItems = [
  {
    question:
      "Will a micro-pantry/community fridge or donors be liable if someone gets sick?",
    answer: (
      <p className={faqAnswerParagraphClassName}>
        Donations made in good faith are generally protected under the Bill
        Emerson Good Samaritan Food Donation Act. Protections do not apply to
        gross negligence or intentional misconduct. Only donate food you would
        serve your family; when in doubt, throw it out.
      </p>
    ),
  },
  {
    question: "Can I donate food past best-by or use-by dates?",
    answer: (
      <div className="space-y-2">
        <p className={faqAnswerParagraphClassName}>
          Often yes, if the item is wholesome and in good condition. Most dates
          describe quality, not safety. Infant formula best-by dates are a
          safety guideline.
        </p>
        <ul className={cardListClassName}>
          <li>
            <span className="font-semibold">Best If Used By/Before:</span>{" "}
            quality.
          </li>
          <li>
            <span className="font-semibold">Sell-By:</span> inventory guidance.
          </li>
          <li>
            <span className="font-semibold">Use-By:</span> peak quality (except
            infant formula).
          </li>
          <li>
            <span className="font-semibold">Freeze-By:</span> quality guidance
            for freezing.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question:
      "Why are homemade baked goods acceptable but other homemade foods are not?",
    answer: (
      <p className={faqAnswerParagraphClassName}>
        Baked goods are typically lower risk and less temperature sensitive.
        Other homemade foods carry higher food safety risk.
      </p>
    ),
  },
  {
    question: "How should I prepare homemade baked goods?",
    answer: (
      <p className={faqAnswerParagraphClassName}>
        Follow safe food handling guidance from your local health department,
        such as Washington Department of Health recommendations.
      </p>
    ),
  },
  {
    question:
      "How should I package and label baked goods or donor-kitchen prepared food?",
    answer: (
      <div className="space-y-2">
        <p className={faqAnswerParagraphClassName}>
          Include key details so neighbors can make safe choices.
        </p>
        <ul className={cardListClassName}>
          <li>Dish name, date made, and location made.</li>
          <li>Ingredients and common allergens.</li>
          <li>
            Keep original labels on commercially packaged foods when possible.
          </li>
          <li>Repackaged bulk staples should list the common name.</li>
          <li>
            Common allergens: peanuts, tree nuts, eggs, soy, wheat, seafood,
            milk.
          </li>
        </ul>
      </div>
    ),
  },
  {
    question: "How should food be safely transported?",
    answer: (
      <ul className={cardListClassName}>
        <li>Prevent unsafe temperature changes and cross-contamination.</li>
        <li>Use clean insulated containers when needed.</li>
        <li>Keep items sealed when possible.</li>
        <li>
          Return temperature-sensitive foods to refrigeration within two hours.
        </li>
      </ul>
    ),
  },
  {
    question: "How should food be stored?",
    answer: (
      <p className={faqAnswerParagraphClassName}>
        Some foods require refrigeration. Only donate time/temperature control
        for safety foods at sites with working refrigerators.
      </p>
    ),
  },
];

export default function FoodDonationGuideLandingPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [showAllResources, setShowAllResources] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const heroButtonClassName =
    "rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2";
  const cardBaseClassName =
    "rounded-2xl border border-gray-200 bg-white p-6 shadow-sm";
  const guidanceCardClassName =
    "rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm";
  const okDecisionCardClassName =
    "rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm";
  const avoidDecisionCardClassName =
    "rounded-2xl border border-rose-200 bg-rose-50 p-6 shadow-sm";
  const cardTitleClassName = "text-lg font-semibold text-black mt-0 mb-4";
  const cardBodyClassName = "text-sm text-black leading-6";
  const bulletListClassName = cardListClassName;
  const numberedListClassName =
    "mt-2 list-decimal pl-6 space-y-2 text-sm text-black leading-6";
  const resources = [
    {
      title: "Washington Department of Health — Charity Food Donations",
      href: "https://doh.wa.gov/community-and-environment/food/food-worker-and-industry/charity-food-donations",
      description:
        "State guidance on safe food donation practices and compliance.",
    },
    {
      title: "USDA FSIS — Food Product Dating",
      href: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-product-dating",
      description:
        "Federal guidance on best-by, sell-by, and use-by dates.",
    },
    {
      title: "Bill Emerson Good Samaritan Food Donation Act",
      href: "https://www.congress.gov/bill/117th-congress/senate-bill/5329/text",
      description:
        "Federal law text on liability protections for food donations.",
    },
    {
      title: "Free Fridge / Community Fridge Q&A",
      href: "https://chlpi.org/wp-content/uploads/2022/01/Fridge-QA-FINAL.pdf",
      description:
        "Common questions and answers about community fridge operations.",
    },
    {
      title: "Donor Guidelines for Freedge",
      href: "https://sustainableconnections.org/wp-content/uploads/Donor-Guidelines-for-Freedge.pdf",
      description: "Donor-facing guidelines for safe items and handling.",
    },
    {
      title: "Freedge Manual",
      href: "https://sustainableconnections.org/wp-content/uploads/Freedge-Manual-for-Webpage.pdf",
      description: "Operational guidance for running and maintaining a freedge.",
    },
    {
      title: "NCR FSMA — Free Fridge / LFSC Updated Guidance",
      href: "https://www.ncrfsma.org/files/page/files/freefridge_lfsc_updated.pdf",
      description: "Updated safety guidance for free fridges and LFSC sites.",
    },
    {
      title: "WA DOH Publication 333-241",
      href: "https://doh.wa.gov/sites/default/files/legacy/Documents/Pubs/333-241.pdf",
      description:
        "State handout on safe food handling and donation practices.",
    },
    {
      title: "WA DOH Publication 333-248",
      href: "https://doh.wa.gov/sites/default/files/legacy/Documents/Pubs//333-248.pdf",
      description:
        "State handout on safe food storage and temperature guidance.",
    },
    {
      title: "WA DOH Publication 333-257",
      href: "https://doh.wa.gov/sites/default/files/legacy/Documents/Pubs//333-257.pdf",
      description:
        "State handout on labeling, allergens, and donation safety tips.",
    },
  ];

  const handleFaqClick = () => {
    const target = document.getElementById("faq");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const guideModal = (
    <Modal
      isOpen={isGuideOpen}
      onClose={() => setIsGuideOpen(false)}
      contentClassName="max-w-5xl bg-emerald-50"
    >
      <div className="sticky top-0 bg-emerald-50 border-b border-gray-200 p-6 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">How to Use This Guide</h2>
          <p className="text-sm text-black">
            This page walks you through the key sections below, from quick
            preparation tips to donation decisions and FAQs.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsGuideOpen(false)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6 space-y-6">
        <ul className="list-disc list-inside space-y-4 text-sm leading-7 text-black">
          <li>
            <strong>How to Donate (Quick Steps):</strong> A short checklist to
            prepare safe, shelf-stable donations.
          </li>
          <li>
            <strong>Food Safety Basics:</strong> Temperature, timing, and
            handling rules to reduce risk.
          </li>
          <li>
            <strong>Labeling Basics:</strong> What information to write so
            others can make safe choices.
          </li>
          <li>
            <strong>Generally OK to Donate:</strong> Common lower-risk items
            that are typically acceptable.
          </li>
          <li>
            <strong>Avoid Donating:</strong> Higher-risk or uncertain items that
            should not be left.
          </li>
          <li>
            <strong>FAQ:</strong> Expand questions to see clear answers to
            common donation concerns.
          </li>
          <li>
            <strong>Resources:</strong> Official guidelines and reference
            documents used in this guide.
          </li>
          <li>
            <strong>Check &amp; Research an Item:</strong> A separate page where
            you can search or browse categories to check a specific item before
            donating.
          </li>
        </ul>
      </div>
    </Modal>
  );

  return (
    <>
      <main className="mx-auto w-full max-w-6xl px-6 py-8">
        <section className="mb-10 relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-white p-4 shadow-sm md:p-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-neutral-900">
              Pantry Donation Guide
            </h1>
            <p className="mt-1 max-w-xl text-base text-black">
              Learn the basics of donating thoughtfully, then use the tool to
              check a specific item or category.
            </p>

            <div className="mt-2 flex flex-col items-start gap-3">
              <p className="text-xs font-medium text-neutral-600">Start here:</p>
              <button
                type="button"
                onClick={() => setIsGuideOpen(true)}
                className={heroButtonClassName}
              >
                How to Use This Guide
              </button>

              <Link
                href="/food-donation-guide/search"
                className={heroButtonClassName}
              >
                Check &amp; Research an Item
              </Link>
              <button
                type="button"
                onClick={handleFaqClick}
                className={heroButtonClassName}
              >
                FAQ
              </button>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-black">
            Guidance Overview
          </h2>
          <div className={`${guidanceCardClassName} mt-4 w-full`}>
            <div className="space-y-3 text-sm leading-6 text-black">
              <p>
                Most micro-pantries and community fridges welcome donations from
                community members. Many types of foods can be donated, including
                certain items found in your pantry and refrigerator, produce
                grown in your garden, and foods purchased at the store. However,
                it is important to follow safe food handling practices to
                ensure micro-pantries and community fridges offer safe food for
                all. The guidelines below are intended to be used by donors to
                determine which foods to donate and how donated foods should be
                labeled, transported, and stored.
              </p>
              <p>
                It is important to note that the following food safety guidance
                is just that – guidance. When in doubt, consider whether you
                would feed the food item to members of your own family.
                Sometimes, composting the food is the safest option. Your local
                micro-pantry or community fridge may also provide their own
                donation guidelines to ensure food safety at their sites. Please
                follow any site-specific policies when donating.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-black">
            Quick Guidance
          </h2>
          <p className="max-w-2xl text-sm text-black">
            Use these basics to prepare donations and reduce risk.
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div className={guidanceCardClassName}>
              <h3 className={cardTitleClassName}>How to Donate (Quick Steps)</h3>
              <ol className="mt-2 list-decimal pl-6 space-y-2 text-sm text-black leading-6">
                <li>Only donate unopened, safe items.</li>
                <li>Choose shelf-stable goods when possible.</li>
                <li>Check dates; skip past best-by.</li>
                <li>Keep labels visible; packaging intact.</li>
                <li>Place items neatly; leave space.</li>
              </ol>
            </div>

            <div className={guidanceCardClassName}>
              <h3 className={cardTitleClassName}>Food Safety Basics</h3>
              <ul className={bulletListClassName}>
                <li>
                  Keep perishables at or below 41°F / 5°C.
                </li>
                <li>
                  Follow the 2-hour rule for room temperature.
                </li>
                <li>
                  When unsure, choose shelf-stable items.
                </li>
              </ul>
            </div>

            <div className={guidanceCardClassName}>
              <h3 className={cardTitleClassName}>Labeling Basics</h3>
              <ul className={bulletListClassName}>
                <li>
                  Seal baked goods; label the date prepared.
                </li>
                <li>List ingredients when possible.</li>
                <li>Call out common allergens.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Donation Decisions
          </h2>
          <p className="max-w-2xl text-sm text-black">
            Use these lists to decide what is safe to donate.
          </p>
          <p className="mt-1 text-sm text-black">
            If you’re unsure about a specific item, click “Check &amp; Research
            An Item” above before donating.
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className={okDecisionCardClassName}>
              <h3 className={cardTitleClassName}>Generally OK to Donate</h3>
              <p className={cardBodyClassName}>
                <strong>Shelf-stable and sealed items.</strong>
              </p>
              <ul className={bulletListClassName}>
                <li>Canned vegetables, beans, soups, and fruit.</li>
                <li>Dry goods: rice, pasta, oats, cereal.</li>
                <li>Nut butters, shelf-stable milk, snacks.</li>
                <li>Baby food, formula (sealed), and diapers.</li>
                <li>Basic hygiene items and paper goods.</li>
              </ul>
            </div>

            <div className={avoidDecisionCardClassName}>
              <h3 className={cardTitleClassName}>Avoid Donating</h3>
              <p className={cardBodyClassName}>
                <strong>High-risk or unknown items.</strong>
              </p>
              <ul className={bulletListClassName}>
                <li>Opened packages or items without labels.</li>
                <li>Homemade meals, home-canned, unsealed baked goods.</li>
                <li>Past best-by or use-by dates.</li>
                <li>Damaged packaging, rust, bulging cans.</li>
                <li>
                  Perishables without reliable refrigeration.
                </li>
              </ul>
            </div>
          </div>
        </section>

      <section id="faq" className="mt-10">
        <h2 className="text-2xl font-semibold text-neutral-900">FAQ</h2>
        <div className="mt-4 space-y-3">
          {(showAllFaqs ? faqItems : faqItems.slice(0, 3)).map((faq) => (
            <details key={faq.question} className={cardBaseClassName}>
              <summary className="cursor-pointer text-sm font-semibold text-black">
                {faq.question}
              </summary>
              <div className="mt-2 w-full max-w-none whitespace-normal text-sm text-black leading-6">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
        {faqItems.length > 3 && (
          <button
            type="button"
            onClick={() => setShowAllFaqs((prev) => !prev)}
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-medium text-black hover:underline underline-offset-2"
            aria-expanded={showAllFaqs}
          >
            {showAllFaqs ? "Show fewer FAQs" : "Show all FAQs"}
            <span aria-hidden="true">{showAllFaqs ? "▲" : "▼"}</span>
          </button>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-black">Resources</h2>
        <p className="max-w-2xl text-sm text-black">
          Official guidelines and reference documents used in this guide (opens
          in a new tab).
        </p>
        <div className={`${cardBaseClassName} mt-4`}>
          <ul className={cardListClassName}>
            {(showAllResources ? resources : resources.slice(0, 4)).map(
              (resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-semibold text-black hover:underline underline-offset-2"
                  >
                    {resource.title}
                  </a>
                  <p className="mt-1 text-sm text-black">
                    {resource.description}
                  </p>
                </li>
              )
            )}
          </ul>
          <button
            type="button"
            onClick={() => setShowAllResources((prev) => !prev)}
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-medium text-black hover:underline underline-offset-2"
            aria-expanded={showAllResources}
          >
            {showAllResources ? "Show fewer resources" : "Show all resources"}
            <span aria-hidden="true">
              {showAllResources ? "▲" : "▼"}
            </span>
          </button>
        </div>
      </section>

    </main>
      {guideModal}
    </>
  );
}