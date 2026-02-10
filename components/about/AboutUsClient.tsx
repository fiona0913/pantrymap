"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Activity,
  BookOpen,
  Ear,
  FileText,
  Gift,
  Handshake,
  Heart,
  HelpCircle,
  Home,
  Shield,
  MapPin,
  MapPinPlus,
  Search,
  Share2,
  User,
  Users,
  Wrench,
} from "lucide-react";
import AboutUsTabs from "@/components/AboutUsTabs";
import PartnerLogos from "@/components/PartnerLogos";

const featureCards = [
  {
    title: "What This Is",
    body:
      "A community-facing home for neighborhood micro-pantries and the people who support them.",
  },
  {
    title: "Why It Matters",
    body:
      "Local support helps reduce food waste and strengthen care between neighbors.",
  },
  {
    title: "How It Works",
    body:
      "Clear information helps people find pantries, donate well, and stay connected.",
  },
];

const toolFeatures = [
  {
    icon: MapPin,
    title: "Find Pantries",
    desc: "Find micro-pantries near you and see what support is available.",
  },
  {
    icon: FileText,
    title: "Share Donations",
    desc: "Share what you plan to donate or have donated with a short description to help others.",
  },
  {
    icon: HelpCircle,
    title: "Request Items",
    desc: "Request items you need or would like to see in a local pantry.",
  },
  {
    icon: Heart,
    title: "Share Kindness",
    desc: "Leave a kind note to encourage neighbors and strengthen community care.",
  },
  {
    icon: Activity,
    title: "Live Updates",
    desc: "See recent activity and signals that help indicate pantry needs.",
  },
];

const values = [
  {
    icon: Users,
    text: "Dignity and respect for every neighbor.",
  },
  {
    icon: Handshake,
    text: "Community-led care and collaboration.",
  },
  {
    icon: BookOpen,
    text: "Clear, welcoming information for everyone.",
  },
  {
    icon: Wrench,
    text: "Practical support that meets everyday needs.",
  },
  {
    icon: Ear,
    text: "Learning and listening as the work grows.",
  },
  {
    icon: Shield,
    text: "Respectful privacy and anonymous participation.",
  },
];

const actions = [
  {
    icon: Search,
    title: "Explore",
    desc: "Find micro-pantries near you on our interactive map.",
    cta: "Open Map",
    href: "/",
    comingSoon: true,
  },
  {
    icon: Gift,
    title: "Donate",
    desc: "Check our donation guidelines and contribute to a local pantry.",
    cta: "Pantry Donation Guide",
    href: "/food-donation-guide",
    comingSoon: false,
  },
  {
    icon: MapPinPlus,
    title: "Update",
    desc: "Submit updates or report issues related to micro-pantries. Submissions are reviewed before changes go live.",
    cta: "Open Form",
    href: "/update",
    comingSoon: false,
  },
  {
    icon: Share2,
    title: "Share",
    desc: "Tell your neighbors about local micro-pantries and spread the word.",
    cta: "Share",
    href: "#",
    comingSoon: false,
  },
];

const faqs = [
  {
    question: "Are micro-pantries open to everyone?",
    answer:
      "Yes. Micro-pantries are “take what you need, leave what you can.” No sign-up is required, and neighbors are welcome to participate respectfully.",
  },
  {
    question: "What can I donate?",
    answer:
      "Shelf-stable, unopened items are generally best (e.g., canned goods, pasta, rice, peanut butter). For items that require refrigeration, homemade food, or anything near expiration, please check the Pantry Donation Guide or confirm with the site.",
  },
  {
    question: "What should I avoid donating?",
    answer:
      "Please avoid:\nOpened packages, homemade meals, or home-canned goods\nItems past the expiration date or with damaged packaging\nPerishable items unless the pantry clearly supports refrigeration\nWhen in doubt, use the Pantry Donation Guide or choose shelf-stable options.",
  },
  {
    question: "Can I take items if I didn’t donate?",
    answer:
      "Yes. Micro-pantries exist to support neighbors. Take what you need, and consider leaving something later when you can.",
  },
  {
    question: "How much should I take?",
    answer:
      "Take what you need for now and leave enough for others. If you’re able, consider making smaller visits more often rather than taking large quantities at once.",
  },
  {
    question: "Is it okay to donate fresh produce or refrigerated items?",
    answer:
      "Sometimes. Some sites can support produce or refrigerated items, but not all. Please check the Pantry Donation Guide and follow any posted pantry notes.",
  },
  {
    question: "How do I know if a pantry is active or stocked?",
    answer:
      "Stock levels change frequently. If a pantry looks low, that’s a great time to donate shelf-stable items. If you notice a pantry that appears inactive or needs attention, you can submit an update using the Update form.",
  },
  {
    question: "How do I report an issue or suggest a new pantry location?",
    answer:
      "Use the Update form available on the Take Action page. Submissions are reviewed by the project team before any changes appear on the map.",
  },
  {
    question: "Will information change over time?",
    answer:
      "Yes. Pantry availability and guidelines can change. We review updates regularly, and the Pantry Donation Guide may be refined based on partner feedback.",
  },
  {
    question: "Is this tool the only source of guidance?",
    answer:
      "No. Some pantries may post on-site guidelines. When local guidance differs, please follow the pantry’s posted instructions and use this tool as a general reference.",
  },
];

type AboutUsClientProps = {
  initialTab?: "about" | "action";
};

export default function AboutUsClient({ initialTab }: AboutUsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const urlTab = tabParam === "action" ? "action" : "about";
  const [activeTab, setActiveTab] = useState<"about" | "action">(
    initialTab ?? urlTab
  );
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const handleTabChange = (tab: "about" | "action") => {
    setActiveTab(tab);
    router.push(`/about-us?tab=${tab}`, { scroll: false });
  };

  useEffect(() => {
    setActiveTab(urlTab);
  }, [urlTab]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-8">
      <section className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            {activeTab === "about" ? (
              <>
                <h1 className="text-3xl font-semibold text-neutral-900">
                  About Us
                </h1>
                <p className="mt-3 max-w-xl text-3xl font-semibold leading-relaxed text-emerald-700">
                  Mapping kindness! Fighting food insecurity through neighborhood
                  micro-pantries.
                </p>
                <p className="mt-4 max-w-2xl text-base text-neutral-900">
                  Our goal is to reduce food waste and fight food insecurity
                  through neighborhood micro-pantries. This online tool empowers
                  communities with information and data about micro-pantries and
                  food donations.
                </p>
                <div className="mt-5 flex flex-col items-start gap-3">
                  <Link
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2"
                    href="/"
                  >
                    Explore the map of neighborhood micro-pantries
                  </Link>
                  <Link
                    className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2"
                    href="/food-donation-guide"
                  >
                    Pantry Donation Guide
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-semibold text-neutral-900">
                  Take Action!
                </h1>
                <p className="mt-3 max-w-2xl text-base text-neutral-900">
                  Small, thoughtful actions help keep neighborhood micro-pantries
                  welcoming and well supported.
                </p>
              </>
            )}
            <AboutUsTabs active={activeTab} onChange={handleTabChange} />
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute -right-6 top-2 h-28 w-28 rounded-full bg-emerald-100" />
            <div className="absolute bottom-2 left-6 h-20 w-20 rounded-full bg-emerald-200/70" />
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-emerald-200 bg-white shadow-sm sm:h-48 sm:w-48">
              <div className="absolute h-28 w-28 rounded-full border border-emerald-100" />
              <div className="absolute h-20 w-20 rounded-full border border-emerald-100/80" />
              <div className="absolute h-12 w-14 rounded-sm border border-emerald-300" />
              <div className="absolute top-1/2 h-6 w-3 -translate-y-1 border border-emerald-200" />
              <div className="absolute h-px w-10 -translate-y-6 rotate-45 bg-emerald-300" />
              <div className="absolute h-px w-10 -translate-y-6 -rotate-45 bg-emerald-300" />
              <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/80" style={{ top: "18%", left: "30%" }} />
              <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/80" style={{ top: "20%", right: "26%" }} />
              <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/80" style={{ bottom: "26%", left: "24%" }} />
              <div className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/80" style={{ bottom: "22%", right: "22%" }} />
              <div className="absolute h-px w-10 bg-emerald-200" style={{ top: "30%", left: "32%", transform: "rotate(12deg)" }} />
              <div className="absolute h-px w-10 bg-emerald-200" style={{ top: "58%", left: "30%", transform: "rotate(-12deg)" }} />
              <div className="absolute h-px w-10 bg-emerald-200" style={{ top: "60%", left: "52%", transform: "rotate(20deg)" }} />
            </div>
          </div>
        </div>
      </section>

      {activeTab === "about" ? (
        <>
          <section className="mt-10 grid gap-4 md:grid-cols-3">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-zinc-200 bg-white p-5 text-sm text-neutral-900 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <h2 className="text-base font-semibold text-neutral-900">
                  {card.title}
                </h2>
                <p className="mt-2">{card.body}</p>
              </div>
            ))}
          </section>

          <section className="mt-10 max-w-3xl">
            <h2 className="text-xl font-semibold text-neutral-900">
              What Are Neighborhood Micro-Pantries?
            </h2>
            <p className="mt-3 text-base text-neutral-900">
              Neighborhood micro-pantries are small, community-supported spaces
              where people can leave or take food and essentials. They are built
              on trust, care, and the idea that neighbors can support one
              another directly.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold text-neutral-900">
              What Does This Tool Do?
            </h2>
            <p className="mt-3 max-w-3xl text-base text-neutral-900">
              This tool helps neighbors support neighbors by making it easy to
              share food and essentials through local micro-pantries. Here's what
              you can do:
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
              {toolFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-neutral-900 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                >
                  <feature.icon className="h-6 w-6 text-emerald-600" />
                  <h3 className="mt-3 text-base font-semibold text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-900">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 max-w-3xl">
            <h2 className="text-xl font-semibold text-neutral-900">Who We Are?</h2>
            <p className="mt-3 text-base text-neutral-900">
              We are a research team at the University of Washington collaborating
              with community partners to study how neighborhood micro-pantries
              support local food sharing. By working closely with communities, we
              aim to learn what helps these pantries thrive and how they can be
              better supported in everyday use.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-neutral-900">Our Values</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value) => (
                <div
                  key={value.text}
                  className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-neutral-900"
                >
                  <value.icon className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <p>{value.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xl font-semibold text-neutral-900">
              Partners
            </h2>
            <div className="mt-4">
              <PartnerLogos />
            </div>
          </section>

          <section className="mt-10 max-w-3xl">
            <h2 className="text-xl font-semibold text-neutral-900">FAQ</h2>
            <div className="mt-4 space-y-3">
              {(showAllFaqs ? faqs : faqs.slice(0, 3)).map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-neutral-900">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-neutral-900">{faq.answer}</p>
                </details>
              ))}
            </div>
            {faqs.length > 3 && (
              <button
                type="button"
                onClick={() => setShowAllFaqs((prev) => !prev)}
                className="mt-4 flex w-full items-center justify-center gap-2 text-sm font-medium text-neutral-900 hover:underline underline-offset-2"
                aria-expanded={showAllFaqs}
              >
                {showAllFaqs ? "Show fewer FAQs" : "Show all FAQs"}
                <span aria-hidden="true">{showAllFaqs ? "▲" : "▼"}</span>
              </button>
            )}
          </section>
        </>
      ) : (
        <>
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-neutral-900">
              How Can You Help?
            </h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {actions.map((action) => (
                <div
                  key={action.title}
                  className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-neutral-900 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex flex-1 flex-col">
                    <action.icon className="h-7 w-7 text-emerald-600" />
                    <h3 className="mt-3 text-base font-semibold text-neutral-900">
                      {action.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-900">
                      {action.desc}
                    </p>
                  </div>
                  {action.comingSoon ? (
                    <button
                      type="button"
                      aria-disabled="true"
                      className="mt-4 w-full rounded-full border border-emerald-500 bg-white px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:border-emerald-600 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2"
                    >
                      {action.cta}
                    </button>
                  ) : action.external ? (
                    <a
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2"
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {action.cta}
                    </a>
                  ) : (
                    <Link
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2"
                      href={action.href}
                    >
                      {action.cta}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
          <section className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-8 text-center">
            <h3 className="text-xl font-semibold text-neutral-900">
              Ready to Make a Difference?
            </h3>
            <p className="mt-2 text-neutral-700">
              Start by exploring pantries in your neighborhood
            </p>
            <Link
              href="/"
              className="mt-4 inline-block rounded-full bg-emerald-600 px-6 py-2 font-medium text-white transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2"
            >
              Explore the Map
            </Link>
          </section>
        </>
      )}
    </main>
  );
}
