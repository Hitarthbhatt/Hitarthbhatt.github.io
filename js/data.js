window.HB = {
  name: "Hitarth Bhatt",
  role: "iOS Engineer",
  location: "Bengaluru, India",
  email: "hitarthbhatt12@gmail.com",
  phone: "+91 8302880263",
  github: "Hitarthbhatt",
  githubUrl: "https://github.com/Hitarthbhatt",
  linkedin: "HitarthBhatt_",
  linkedinUrl: "https://www.linkedin.com/in/hitarth-bhatt/",
  twitter: "Hitarthbhatt",
  twitterUrl: "https://twitter.com/HitarthBhatt10",
  resumeUrl: "resume/HitarthResume.pdf",

  highlights: [
    { value: "40M+", label: "Users at Meesho" },
    { value: "10+ MB", label: "Binary size shaved" },
    { value: "5+ yrs", label: "Shipping iOS" },
    { value: "4", label: "Apps in production" }
  ],

  projects: [
    {
      id: "meesho",
      name: "Meesho",
      company: "Meesho",
      year: "2025 — Present",
      tagline: "Social-first commerce for India's next billion shoppers.",
      description: "Architecting modular features, AI developer tooling, and binary optimizations across an app used by 40M+ shoppers and resellers.",
      stack: ["Swift", "SwiftUI", "UIKit", "SPM", "Mergeable Binaries"],
      link: { label: "App Store", url: "https://apps.apple.com/in/app/meesho-online-shopping/id1457958492" },
      accent: "#F43F5E",
      image: "images/Meesho.png",
      kpis: [
        { value: "−6.2 MB", label: "App size (CocoaPods → SPM)" },
        { value: "+10%", label: "1ODNR (First-order discount)" },
        { value: "+15%", label: "Sale revamp DAU uplift" }
      ]
    },
    {
      id: "walmart",
      name: "Walmart",
      company: "Walmart Global Tech",
      year: "2024 — 2025",
      tagline: "The everything store, in your pocket.",
      description: "Shipped item-page and apparel features for Walmart's flagship iOS app — Complete the Look, Dynamic Size Guide — and integrated Bazel for faster builds.",
      stack: ["Swift", "UIKit", "SwiftUI", "Bazel"],
      link: { label: "App Store", url: "https://apps.apple.com/us/app/walmart-shopping-savings/id338137227" },
      accent: "#0071DC",
      image: "images/Walmart.png",
      kpis: [
        { value: "Bazel", label: "Faster iOS builds" },
        { value: "Apparel", label: "Item-page improvements" }
      ]
    },
    {
      id: "psx",
      name: "Photoshop Express",
      company: "Adobe (via HSC)",
      year: "2023 — 2024",
      tagline: "Pro photo edits, on the go.",
      description: "Growth-team contributor on Adobe's 4.8★ photo editor (~700K users). Built an animated tool selection/deselection flow in Objective-C and shipped A/B variants across markets.",
      stack: ["Objective-C", "Swift", "UIKit", "Core Graphics"],
      link: { label: "App Store", url: "https://apps.apple.com/us/app/photoshop-express-photo-editor/id331975235" },
      accent: "#31A8FF",
      image: "images/Adobe.png",
      kpis: [
        { value: "4.8★", label: "App Store rating" },
        { value: "700K", label: "Active users" },
        { value: "A/B", label: "Country-level rollouts" }
      ]
    },
    {
      id: "ai-health",
      name: "AI-Health",
      company: "Simform Solutions",
      year: "2021 — 2023",
      tagline: "24/7 health monitoring across iPhone, iPad, watchOS.",
      description: "Fitness platform applying sub-symbolic AI to screen for high MetS risk, low HRR, and VO₂ max. Refactored 80% of watchOS to SwiftUI; led MVVM rewrite.",
      stack: ["Swift", "SwiftUI", "Combine", "Firebase", "AVFoundation", "CoreLocation"],
      link: { label: "Live", url: "https://www.ai-health.com" },
      accent: "#7C3AED",
      image: "images/AI-Health.webp",
      kpis: [
        { value: "80%", label: "watchOS migrated to SwiftUI" },
        { value: "iPhone · iPad · Watch", label: "Three surfaces" }
      ]
    },
    {
      id: "jainfastfood",
      name: "Jain Fast Food",
      company: "Personal Project",
      year: "2020 — 2021",
      tagline: "First app I shipped — for my hometown.",
      description: "End-to-end ordering app built solo and published to the App Store. Plus an admin companion app for tracking profits and managing menu data.",
      stack: ["Swift", "SwiftUI", "Combine", "Firebase", "CoreLocation"],
      link: { label: "App Store", url: "https://apps.apple.com/us/app/jain-fast-food/id1550106944" },
      accent: "#F59E0B",
      image: "images/JainFastFood.png",
      kpis: [
        { value: "Solo", label: "Built end-to-end" },
        { value: "Published", label: "On the App Store" }
      ]
    },
    {
      id: "sslinechart",
      name: "SSLineChart",
      company: "Open source",
      year: "2022",
      tagline: "Drop-in gradient line charts for watchOS.",
      description: "Open-source WatchKit library that lets developers add smooth gradient line charts to their watchOS apps with a single declarative call.",
      stack: ["Swift", "WatchKit"],
      link: { label: "Source", url: "https://github.com/SimformSolutionsPvtLtd/SSLineChart" },
      accent: "#10B981",
      image: "images/SSLineChart.png",
      kpis: [
        { value: "watchOS", label: "Built for the wrist" },
        { value: "MIT", label: "Open source" }
      ]
    }
  ],

  experience: [
    { co: "Meesho", role: "iOS Engineer", years: "Apr 2025 — Present" },
    { co: "Walmart Global Tech", role: "iOS Engineer", years: "Mar 2024 — Apr 2025" },
    { co: "Adobe (via HSC)", role: "iOS Engineer", years: "Apr 2023 — Mar 2024" },
    { co: "Simform Solutions", role: "Swift / iOS Developer", years: "Jul 2021 — Feb 2023" },
    { co: "Jain Fast Food", role: "Solo iOS Developer", years: "Oct 2020 — Mar 2021" }
  ],

  blog: {
    handle: "hitarth",
    url: "https://hitarth.hashnode.dev",
    posts: [
      {
        title: "Tired of slow Xcode builds? Meet Bazel.",
        excerpt: "How adopting Bazel transformed our iOS build pipeline at Walmart — from waiting on Xcode to a snappier, more reliable dev loop.",
        date: "2025",
        readTime: "8 min read",
        tag: "Build Tooling",
        url: "https://hitarth.hashnode.dev/tired-of-slow-xcode-builds-meet-bazel"
      }
    ]
  }
};
