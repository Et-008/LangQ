---
title: "Over-the-air and Mobile SDKs: Recommended Practices for Optimization"
description: "This guide details six practices for optimizing Over-the-Air (OTA) localization updates to reduce data costs under the new usage-based pricing. Key strategies include using Bundle Freezes to manage version-specific translations and ensuring OTA bundles only contain incremental changes since the last app release. Follow these tips to prevent large bundle sizes and corresponding performance issues."
author: { name: "Aet-008", designation: "Developer" }
date: "2025-10-29"
image: /images/over-the-air.jpeg
tags: ["OTA", "Mobile SDK", "Lang Q", "Localization Optimization"]
---

## Optimize Your OTA Usage and Reduce Costs

Your data usage is influenced by three key factors: **number of users**, **bundle size**, and **number of bundle releases**. By following the optimization tips below, you can significantly reduce your bundle size and avoid overpaying.

---

## 1. Establish a Single Source of Truth

We highly recommend using a single source for all your translation data, ideally [Lang Q](https://lang-q.com). This means **all modifications** to keys and values should happen in your Translation Management System (TMS). Changes should then be pushed to other locations like your local development environment, GitHub, and servers.

**Avoid modifying translations in multiple places simultaneously** to prevent complex data management and inconsistencies, such as accidentally overwriting or deleting new keys. Remember that our mobile SDKs do not automatically export local changes back to [Lang Q](https://lang-q.com); you must use other tools for this.

---

## 2. Sync Local Files Before Building Apps

Before creating a new mobile app build, make sure it includes **all translation data** and that your local files are synced with [Lang Q](https://lang-q.com). Why? This practice is crucial for minimizing the OTA bundle size later, especially when combined with the other techniques in this guide.

**The Golden Rule:** **OTA is only meant to deliver translations modified _between_ app releases.**

---

## 3. Limit OTA Bundles to Only Necessary Keys

When creating an OTA bundle on [Lang Q](https://lang-q.com), only include keys that were **modified since the last app build**. **Do not** include all translation data in every OTA bundle. App builds should contain all available translations, but OTA bundles should only contain the incremental changes.

### How to Filter and Tag Modified Translations

To easily select only the relevant data, use [Lang Q](https://lang-q.com) filters and tags:

1.  **Filter:** Open your project editor and apply a new filter: `Translation — was modified after — [Date of your last app release]`. This isolates the keys that need an OTA update.
2.  **Tag:** Select all filtered keys and use the bulk action to add a unique tag, such as `post-release-1`.
3.  **Build Bundle:** Proceed to the Download page, choose your SDK format, and in the "Content to export" section, add the unique tag (`post-release-1`) to the **Include tags** field. Click **Build only**.

Your resulting bundle will contain only the modified data, significantly optimizing its size.

### Performance Impact of Large Bundles

**Bundle sizes larger than 2 MB can cause significant performance degradation**, such as slow app startup or hanging, particularly for Android apps that use a dedicated database for translation storage. Optimize your bundles to keep them as small as possible.

---

## 4. Automate Bundle Generation Wisely

Automation is great, but we advise against overusing tools like the API or webhooks for OTA bundle generation.

**Undesirable Approach:** Creating a webhook that generates a new OTA bundle every time _any_ translation is updated. Translators often make multiple changes before a final version, leading to dozens of redundant bundles and overused OTA capacity.

**Recommended Approach:** Create a webhook that listens to finalization events, such as `project.task.closed` or `team.order.completed`. This ensures a bundle is generated only when a set of translations is ready for deployment, preventing redundancy.

---

## 5. Utilize Bundle Freezes for Stability

A **Bundle Freeze** lets you assign a specific OTA bundle version to serve all users on a selected app build range.

**Example:** You can set app builds 1-5 to always use `v1_2022_11_05`, while later versions use `v2_2022_12_30`.

This prevents users on older app versions from accidentally receiving translations that were meant for newer builds.

### Avoiding Translation Overrides with Bundle Freeze

A key use case is preventing a newer OTA bundle from overwriting local translations in a fresh app version.

**Scenario:**

1.  **App v1** released. OTA `v1_2022_11_05` created.
2.  A translation key (`welcome`) is updated on Lang Q.
3.  **App v2** is built with the _new, updated_ `welcome` translation included locally.
4.  **App v2** is released. The Lang Q SDK automatically downloads the most recent OTA bundle, which is still `v1_2022_11_05` or a subsequent, more recent one that _overwrites_ the `welcome` key's local translation in v2.
5.  Users on **App v2** see the overridden (older) value.

**Solution:** **Create a Bundle Freeze before building and releasing App v2.** Freeze OTA bundle `v1_2022_11_05` to only be served to App v1 users. This prevents the old OTA from being downloaded by v2, ensuring v2's correct local translation is used.

### The Lite Bundle Trick

If a new app version (e.g., v3) contains all necessary translations locally and has no specific bundle freeze, it will still download the latest **Production** bundle by default. This redundant download can be fixed using a **lite bundle trick**:

1.  Create an OTA bundle containing only a **single key** across all project languages (making it extremely small).
2.  Create a **new Bundle Freeze** that distributes this lite bundle _only_ to App v3.

This ensures a bundle is downloaded, but its minimal size minimizes performance impact while preventing the download of an unnecessarily large Production bundle.

---

## 6. Use OTA as an Enhancement, Not a Replacement

[Lang Q](https://lang-q.com) mobile SDKs are designed to **enhance** your localization process, **not completely replace native solutions**. Continue to use in-built libraries and include local translation files in your app builds.

**Only use OTA to deliver translation data that was modified between releases.** It is not intended to be the sole mechanism for delivering _all_ translations since the app's first release.

---
