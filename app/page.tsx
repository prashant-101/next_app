"use client";

import React from "react";

import VideoBackground from "../components/ui/skiper-ui/video";
import Skiper3 from "../components/ui/skiper-ui/skiper3";
import { Skiper47 } from "../components/ui/skiper-ui/skiper47";
import ErrorCircle from "../components/ui/skiper-ui/errorcircle";
import ExpandableGrid from "../components/ui/skiper-ui/expandablegrid";
import MapComponent from "@/components/ui/mapcomponent";

export default function Page() {
  

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f4f4f1] text-[#20201e]">

      {/* ===================================================== */}
      {/* NAVBAR */}
      {/* ===================================================== */}

      <div className="relative z-50">
        <Skiper3 />
      </div>


      {/* ===================================================== */}
      {/* WILDLIFE VIDEO */}
      {/* ===================================================== */}

      <section className="relative h-screen w-full overflow-hidden bg-black">

        <VideoBackground
          src="wildlife/Wildlife.mp4"
          className="absolute inset-0 h-full w-full"
        />

        {/* Video overlay */}

        <div className="pointer-events-none absolute inset-0 bg-black/25" />

        {/* Bottom heading */}

        <div className="relative z-10 flex h-full items-end justify-center px-6 pb-16 md:pb-20">

          <div className="text-center text-white">

            <h1 className="text-4xl font-semibold tracking-tight drop-shadow-lg md:text-6xl">
              Wildlife Conservation
            </h1>

            <p className="mt-4 text-base text-white/80 drop-shadow-lg md:text-lg">
              Protecting nature. Preserving life.
            </p>

          </div>

        </div>

      </section>


      {/* ===================================================== */}
      {/* OUR ENDANGERED ANIMALS */}
      {/* ===================================================== */}

      <section className="w-full bg-[#f4f4f1] px-6 pb-10 pt-20 md:pb-14 md:pt-28">

        <div className="mx-auto max-w-6xl">

          {/* Small label */}

          <div className="mb-5 flex items-center justify-center gap-4">

            <span className="h-px w-10 bg-[#617a69]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#617a69]">
              Conservation
            </span>

            <span className="h-px w-10 bg-[#617a69]" />

          </div>


          {/* Main heading */}

          <h2 className="text-center text-3xl font-medium tracking-tight text-[#20201e] md:text-5xl">

            Our{" "}

            <span className="text-[#617a69]">
              Endangered Animals
            </span>

          </h2>


          {/* Description */}

          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-7 text-[#777771] md:text-base">

            Explore the species that need our attention, protection, and
            collective action to survive for generations to come.

          </p>

        </div>

      </section>


      {/* ===================================================== */}
      {/* SPECIES / SKIPER 47 */}
      {/* ===================================================== */}

      <section className="relative z-20 w-full bg-[#f4f4f1] py-8 md:py-12">

        <Skiper47 />

      </section>


      {/* ===================================================== */}
{/* ANIMAL FEATURE STORIES */}
{/* ===================================================== */}

<section className="relative z-20 w-full bg-[#fafaf8] px-6 py-16 md:py-24">

  <div className="mx-auto max-w-7xl">

    {/* Section Header */}

    <div className="mb-10">

      <div className="mb-5 flex items-center gap-3">

        <span className="h-px w-10 bg-[#617a69]" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#617a69]">
          Wildlife Stories
        </span>

      </div>

      <h2 className="text-3xl font-medium tracking-tight text-[#20201e] md:text-5xl">

        Animal{" "}

        <span className="text-[#617a69]">
          Feature Stories
        </span>

      </h2>

      <p className="mt-5 max-w-2xl text-sm leading-7 text-[#777771] md:text-base">

        Discover the stories behind Nepal&apos;s wildlife,
        the challenges they face, and the conservation efforts
        helping protect them for future generations.

      </p>

    </div>

    <ExpandableGrid  />

  </div>

</section> {/* ===================================================== */}
      {/* PROTECTED AREAS & WILDLIFE */}
      {/* ===================================================== */}

      <section className="relative z-20 w-full bg-[#f4f4f1] px-4 py-16 md:px-6 md:py-24">

        <div className="mx-auto max-w-7xl">

          {/* =================================================
              SECTION HEADER
          ================================================= */}

          <div className="mb-10 text-center">

            {/* Label */}

            <div className="mb-5 flex items-center justify-center gap-4">

              <span className="h-px w-10 bg-[#617a69]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#617a69]">
                Protected Areas
              </span>

              <span className="h-px w-10 bg-[#617a69]" />

            </div>


            {/* Heading */}

            <h2 className="text-3xl font-medium tracking-tight text-[#20201e] md:text-5xl">

              Protected Areas{" "}

              <span className="text-[#617a69]">
                & Wildlife
              </span>

            </h2>


            {/* Description */}

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#777771] md:text-base">

              Explore Nepal&apos;s national parks and conservation areas
              and discover the endangered animals protected within them.

            </p>

          </div>
          {/* =================================================
              INTERACTIVE MAP
          ================================================= */}

          <MapComponent />

        </div>

      </section>




     
      {/* ===================================================== */}
{/* CONSERVATION ORGANIZATIONS & CONTACTS */}
{/* ===================================================== */}

<section className="relative z-20 w-full bg-[#fafaf8] px-6 py-20 md:py-28">

  <div className="mx-auto max-w-7xl">

    {/* =================================================
        SECTION HEADER
    ================================================= */}

    <div className="mb-12">

      <div className="mb-5 flex items-center gap-3">

        <span className="h-px w-10 bg-[#617a69]" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#617a69]">
          Conservation Network
        </span>

      </div>

      <h2 className="max-w-4xl text-3xl font-medium tracking-tight text-[#20201e] md:text-5xl">

        Organizations &{" "}

        <span className="text-[#617a69]">
          Wildlife Partners
        </span>

      </h2>

      <p className="mt-5 max-w-3xl text-sm leading-7 text-[#777771] md:text-base">

        Connect with organizations, NGOs, INGOs and government
        institutions working to protect Nepal&apos;s wildlife,
        forests, biodiversity and protected areas.

      </p>

    </div>


    {/* =================================================
        ORGANIZATION CARDS
    ================================================= */}

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">


      {/* =================================================
          WWF NEPAL
      ================================================= */}

      <div className="group overflow-hidden rounded-3xl border border-[#deded9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c5d2c8] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

        {/* Logo / Photo */}

        <div className="flex h-44 items-center justify-center bg-[#eef2ee] p-8">

          <img
            src="https://wwfeu.awsassets.panda.org/img/wwf_logo_750_x_600_741023.jpg"
            alt="WWF Nepal"
            className="max-h-28 max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
          />

        </div>


        {/* Content */}

        <div className="p-6">

          <div className="mb-3 flex items-center justify-between gap-3">

            <h3 className="text-lg font-semibold text-[#292925]">
              WWF Nepal
            </h3>

            <span className="rounded-full bg-[#eaf0eb] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#617a69]">
              INGO
            </span>

          </div>

          <p className="text-sm leading-6 text-[#777771]">

            Works to conserve biodiversity, ecosystems and
            threatened wildlife across Nepal, including tiger
            and rhino conservation landscapes.

          </p>


          {/* Focus */}

          <div className="mt-5 flex flex-wrap gap-2">

            {[
              "Tiger",
              "Rhino",
              "Biodiversity",
              "Communities",
            ].map((item) => (

              <span
                key={item}
                className="rounded-full border border-[#dce1dc] px-2.5 py-1 text-[9px] text-[#777771]"
              >
                {item}
              </span>

            ))}

          </div>


          {/* Contact */}

          <div className="mt-6 border-t border-[#eeeeea] pt-5">

            <p className="text-xs text-[#888882]">
              Kathmandu, Nepal
            </p>

            <a
              href="mailto:info@wwfnepal.org"
              className="mt-1 block text-xs text-[#617a69] hover:underline"
            >
              info@wwfnepal.org
            </a>

          </div>


          {/* Website */}

          <a
            href="https://www.wwfnepal.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center rounded-xl bg-[#617a69] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#506658]"
          >
            Visit WWF Nepal
          </a>

        </div>

      </div>


      {/* =================================================
          NTNC
      ================================================= */}

      <div className="group overflow-hidden rounded-3xl border border-[#deded9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c5d2c8] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

        <div className="flex h-44 items-center justify-center bg-[#eef2ee] p-8">

          <img
            src="https://ntnc.org.np/themes/contrib/creative/images/logo.svg"
            alt="National Trust for Nature Conservation"
            className="max-h-28 max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
          />

        </div>


        <div className="p-6">

          <div className="mb-3 flex items-center justify-between gap-3">

            <h3 className="text-lg font-semibold text-[#292925]">
              National Trust for Nature Conservation
            </h3>

            <span className="rounded-full bg-[#eaf0eb] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#617a69]">
              NGO
            </span>

          </div>

          <p className="text-sm leading-6 text-[#777771]">

            A major Nepali conservation organization working
            on biodiversity, wildlife research, protected areas
            and community-based conservation.

          </p>


          <div className="mt-5 flex flex-wrap gap-2">

            {[
              "Protected Areas",
              "Research",
              "Wildlife",
              "Communities",
            ].map((item) => (

              <span
                key={item}
                className="rounded-full border border-[#dce1dc] px-2.5 py-1 text-[9px] text-[#777771]"
              >
                {item}
              </span>

            ))}

          </div>


          <div className="mt-6 border-t border-[#eeeeea] pt-5">

            <p className="text-xs text-[#888882]">
              Khumaltar, Lalitpur
            </p>

            <a
              href="mailto:info@ntnc.org.np"
              className="mt-1 block text-xs text-[#617a69] hover:underline"
            >
              info@ntnc.org.np
            </a>

          </div>


          <a
            href="https://www.ntnc.org.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center rounded-xl bg-[#617a69] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#506658]"
          >
            Visit NTNC
          </a>

        </div>

      </div>


      {/* =================================================
          NEPAL TIGER TRUST
      ================================================= */}

      <div className="group overflow-hidden rounded-3xl border border-[#deded9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c5d2c8] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

        <div className="flex h-44 items-center justify-center bg-[#eef2ee] p-8">

          <img
            src="https://www.nepaltigertrust.org/NTTLogo700x533.jpg"
            alt="Nepal Tiger Trust"
            className="max-h-28 max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
          />

        </div>


        <div className="p-6">

          <div className="mb-3 flex items-center justify-between gap-3">

            <h3 className="text-lg font-semibold text-[#292925]">
              Nepal Tiger Trust
            </h3>

            <span className="rounded-full bg-[#eaf0eb] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#617a69]">
              NGO
            </span>

          </div>

          <p className="text-sm leading-6 text-[#777771]">

            Focuses on tiger conservation, wildlife monitoring,
            research, anti-poaching initiatives and community
            participation in conservation.

          </p>


          <div className="mt-5 flex flex-wrap gap-2">

            {[
              "Tiger",
              "Monitoring",
              "Research",
              "Anti-Poaching",
            ].map((item) => (

              <span
                key={item}
                className="rounded-full border border-[#dce1dc] px-2.5 py-1 text-[9px] text-[#777771]"
              >
                {item}
              </span>

            ))}

          </div>


          <div className="mt-6 border-t border-[#eeeeea] pt-5">

            <p className="text-xs text-[#888882]">
              Meghauli, Chitwan
            </p>

            <a
              href="mailto:info@nepaltigertrust.org"
              className="mt-1 block text-xs text-[#617a69] hover:underline"
            >
              info@nepaltigertrust.org
            </a>

          </div>


          <a
            href="https://www.nepaltigertrust.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center rounded-xl bg-[#617a69] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#506658]"
          >
            Visit Nepal Tiger Trust
          </a>

        </div>

      </div>


      {/* =================================================
          DNPWC
      ================================================= */}

      <div className="group overflow-hidden rounded-3xl border border-[#deded9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c5d2c8] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

        <div className="flex h-44 items-center justify-center bg-[#eef2ee] p-8">

          <img
            src="https://giwmscdnone.gov.np/media/logo/dnpwc%20logo_fxhsrut.png"
            alt="Department of National Parks and Wildlife Conservation"
            className="max-h-28 max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
          />

        </div>


        <div className="p-6">

          <div className="mb-3 flex items-center justify-between gap-3">

            <h3 className="text-lg font-semibold text-[#292925]">
              Department of National Parks and Wildlife Conservation
            </h3>

            <span className="rounded-full bg-[#edf0ee] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#617a69]">
              Government
            </span>

          </div>

          <p className="text-sm leading-6 text-[#777771]">

            Nepal&apos;s government authority responsible for
            national parks, protected areas, wildlife management
            and conservation policy.

          </p>


          <div className="mt-5 flex flex-wrap gap-2">

            {[
              "National Parks",
              "Wildlife",
              "Protected Areas",
              "Policy",
            ].map((item) => (

              <span
                key={item}
                className="rounded-full border border-[#dce1dc] px-2.5 py-1 text-[9px] text-[#777771]"
              >
                {item}
              </span>

            ))}

          </div>


          <div className="mt-6 border-t border-[#eeeeea] pt-5">

            <p className="text-xs text-[#888882]">
              Babarmahal, Kathmandu
            </p>

          </div>


          <a
            href="https://dnpwc.gov.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center rounded-xl bg-[#617a69] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#506658]"
          >
            Visit DNPWC
          </a>

        </div>

      </div>


      {/* =================================================
          BIRD CONSERVATION
      ================================================= */}

      <div className="group overflow-hidden rounded-3xl border border-[#deded9] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c5d2c8] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

        <div className="flex h-44 items-center justify-center bg-[#eef2ee] p-8">

          <img
            src="https://www.birdsofnepal.org/public/images/birdsofnepal.png"
            alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHyMCkFMTfkhdMti06hWWJF2GYAa44DiLhxl4kKHFBuA&s=10"
            className="max-h-28 max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
          />

        </div>


        <div className="p-6">

          <div className="mb-3 flex items-center justify-between gap-3">

            <h3 className="text-lg font-semibold text-[#292925]">
              Nepalese Ornithological Union
            </h3>

            <span className="rounded-full bg-[#eaf0eb] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#617a69]">
              Conservation
            </span>

          </div>

          <p className="text-sm leading-6 text-[#777771]">

            Works on threatened birds, scientific research,
            habitat conservation and community stewardship
            for Nepal&apos;s bird biodiversity.

          </p>


          <div className="mt-5 flex flex-wrap gap-2">

            {[
              "Birds",
              "Research",
              "Habitat",
              "Biodiversity",
            ].map((item) => (

              <span
                key={item}
                className="rounded-full border border-[#dce1dc] px-2.5 py-1 text-[9px] text-[#777771]"
              >
                {item}
              </span>

            ))}

          </div>


          <div className="mt-6 border-t border-[#eeeeea] pt-5">

            <p className="text-xs text-[#888882]">
              Kathmandu, Nepal
            </p>

            <a
              href="mailto:info@birdsofnepal.org"
              className="mt-1 block text-xs text-[#617a69] hover:underline"
            >
              info@birdsofnepal.org
            </a>

          </div>


          <a
            href="https://www.birdsofnepal.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center rounded-xl bg-[#617a69] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#506658]"
          >
            Visit Organization
          </a>

        </div>

      </div>


      {/* =================================================
          CONTACT / DIRECTORY CARD
      ================================================= */}

      <div className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#cfd8d1] bg-[#26352d] p-6 text-white transition-all duration-300 hover:-translate-y-1">

        <div>

          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#617a69]">
            🌿
          </div>

          <h3 className="text-xl font-medium">
            Need a Conservation Contact?
          </h3>

          <p className="mt-4 text-sm leading-6 text-white/60">

            Find organizations, national parks and wildlife
            authorities working across Nepal.

          </p>

        </div>


        <div className="mt-8">

          <a
            href="https://dnpwc.gov.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-xs font-semibold transition hover:bg-white/15"
          >
            <span>
              Explore Wildlife Directory
            </span>

            <span>
              →
            </span>
          </a>

        </div>

      </div>

    </div>


    {/* =================================================
        NATIONAL PARK CONTACTS
    ================================================= */}

    <div className="mt-20 border-t border-[#deded9] pt-16">

      <div className="mb-8">

        <div className="mb-4 flex items-center gap-3">

          <span className="h-px w-8 bg-[#617a69]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#617a69]">
            Protected Areas
          </span>

        </div>

        <h3 className="text-2xl font-medium text-[#20201e] md:text-3xl">

          National Parks &{" "}

          <span className="text-[#617a69]">
            Wildlife Offices
          </span>

        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#777771]">

          Official contact points for Nepal&apos;s protected
          areas and national parks.

        </p>

      </div>


      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {[
          {
            name: "Chitwan National Park",
            location: "Kasara, Chitwan",
            phone: "9855092260",
          },
          {
            name: "Bardiya National Park",
            location: "Thakurdwara, Bardiya",
            phone: "084-402012",
          },
          {
            name: "Shivapuri Nagarjun National Park",
            location: "Kathmandu",
            phone: "01-4370355",
          },
          {
            name: "Langtang National Park",
            location: "Dhunche, Rasuwa",
            phone: "010-540219",
          },
        ].map((park) => (

          <div
            key={park.name}
            className="rounded-2xl border border-[#deded9] bg-white p-5 transition hover:border-[#bfcdbf]"
          >

            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef2ee]">
              🏞️
            </div>

            <h4 className="text-sm font-semibold text-[#292925]">
              {park.name}
            </h4>

            <p className="mt-2 text-xs text-[#888882]">
              {park.location}
            </p>

            <a
              href={`tel:${park.phone}`}
              className="mt-3 block text-xs font-medium text-[#617a69]"
            >
              {park.phone}
            </a>

          </div>

        ))}

      </div>

    </div>

  </div>

</section>

      {/* ===================================================== */}
      {/* COMMUNITY & POLICY */}
      {/* ===================================================== */}

      <section className="relative z-20 w-full bg-[#f4f4f1] px-6 py-20 md:py-28">

        <div className="mx-auto max-w-6xl">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-10">

            <div className="mb-5 flex items-center gap-3">

              <span className="h-px w-10 bg-[#617a69]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#617a69]">
                Conservation Action
              </span>

            </div>


            <h2 className="max-w-3xl text-3xl font-medium tracking-tight text-[#20201e] md:text-5xl">

              Community &{" "}

              <span className="text-[#617a69]">
                Policy Involvement
              </span>

            </h2>


            <p className="mt-5 max-w-3xl text-sm leading-7 text-[#777771] md:text-base">

              Wildlife conservation depends not only on protected areas and
              scientific research, but also on communities, governments and
              international cooperation working together to protect wildlife.

            </p>

          </div>


          {/* =================================================
              CARDS
          ================================================= */}

          <div className="grid gap-4 md:grid-cols-3">


            {/* =================================================
                COMMUNITY
            ================================================= */}

            <div className="group rounded-2xl border border-[#deded9] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9d5cc] hover:shadow-[0_14px_40px_rgba(0,0,0,0.07)]">

              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#d9e1da] bg-[#f1f5f1] text-lg">
                🌿
              </div>

              <h3 className="text-lg font-medium text-[#292925]">
                Local Communities
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#777771]">

                Community-based conservation, local stewardship and
                anti-poaching initiatives help protect wildlife while
                supporting sustainable livelihoods.

              </p>

              <div className="mt-6 h-px w-10 bg-[#617a69] transition-all duration-300 group-hover:w-16" />

            </div>


            {/* =================================================
                POLICY
            ================================================= */}

            <div className="group rounded-2xl border border-[#deded9] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9d5cc] hover:shadow-[0_14px_40px_rgba(0,0,0,0.07)]">

              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#d9e1da] bg-[#f1f5f1] text-lg">
                🏛
              </div>

              <h3 className="text-lg font-medium text-[#292925]">
                Wildlife Policy
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#777771]">

                National wildlife laws and international frameworks such as
                CITES provide legal mechanisms for protecting threatened
                species and controlling illegal wildlife trade.

              </p>

              <div className="mt-6 h-px w-10 bg-[#617a69] transition-all duration-300 group-hover:w-16" />

            </div>


            {/* =================================================
                EDUCATION
            ================================================= */}

            <div className="group rounded-2xl border border-[#deded9] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9d5cc] hover:shadow-[0_14px_40px_rgba(0,0,0,0.07)]">

              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#d9e1da] bg-[#f1f5f1] text-lg">
                📚
              </div>

              <h3 className="text-lg font-medium text-[#292925]">
                Education & Awareness
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#777771]">

                Education and public awareness can encourage sustainable
                coexistence between people, wildlife and the habitats that
                support them.

              </p>

              <div className="mt-6 h-px w-10 bg-[#617a69] transition-all duration-300 group-hover:w-16" />

            </div>

          </div>


          {/* =================================================
              BOTTOM STATEMENT
          ================================================= */}

          <div className="mt-12 border-t border-[#deded9] pt-6">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <p className="max-w-2xl text-xs leading-6 text-[#999993]">

                Conservation becomes stronger when science, policy and
                communities work together.

              </p>

              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#617a69]">
                People · Policy · Nature
              </span>

            </div>

          </div>

        </div> 


      </section>


      {/* ===================================================== */}
      {/* ERROR CIRCLE */}
      {/* ===================================================== */}

      <section className="relative z-20 w-full bg-[#fafaf8] py-12 md:py-20">

        <ErrorCircle />

      </section>


      {/* ===================================================== */}
      {/* FOOTER SPACE */}
      {/* ===================================================== */}

      <div className="h-20 bg-[#f4f4f1]" />

    </main>
  );
}