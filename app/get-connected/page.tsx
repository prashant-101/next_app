"use client";

import React from "react";

export default function GetConnectedPage() {
  return (
    <main className="min-h-screen bg-[#f6f7f5] text-[#20201e]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="px-6 pb-16 pt-28 md:pb-24 md:pt-36">

        <div className="mx-auto max-w-6xl">

          <div className="max-w-3xl">

            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#617a69]">
              Get Connected
            </p>

            <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
              Connect with
              <span className="text-[#617a69]">
                {" "}conservation
              </span>
              {" "}experts
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#777771] md:text-base">
              Planning biodiversity, wildlife or ecological research
              in Nepal? Share your requirements and we can help you
              find the appropriate conservation organization, national
              park or local authority to contact.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONNECTION OPTIONS
      ===================================================== */}

      <section className="px-6 pb-20 md:pb-28">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl border border-white/80 bg-white/70 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#617a69]">
                Research
              </p>

              <h2 className="mt-4 text-xl font-medium">
                Biodiversity Research
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#777771]">
                Looking for information, local knowledge or
                institutional contacts for your biodiversity
                research?
              </p>

            </div>


            <div className="rounded-3xl border border-white/80 bg-white/70 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#617a69]">
                Protected Areas
              </p>

              <h2 className="mt-4 text-xl font-medium">
                National Parks
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#777771]">
                Planning field research inside a national park
                or conservation area? Tell us where and what
                you are studying.
              </p>

            </div>


            <div className="rounded-3xl border border-white/80 bg-white/70 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#617a69]">
                Local Connection
              </p>

              <h2 className="mt-4 text-xl font-medium">
                Forest & Wildlife Officers
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#777771]">
                Submit your request and we can help direct it
                toward an appropriate local conservation or
                forest authority.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FORM
      ===================================================== */}

      <section className="px-6 pb-24 md:pb-32">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            {/* LEFT INFORMATION */}

            <div className="pt-4">

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#617a69]">
                Research Request
              </p>

              <h2 className="mt-5 text-3xl font-medium tracking-tight md:text-4xl">
                Tell us about your
                <span className="text-[#617a69]">
                  {" "}research
                </span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#777771]">
                Provide your contact information and research
                requirements. We will review your request and,
                where appropriate, help you identify the relevant
                organization or local authority.
              </p>

              <div className="mt-8 border-l border-[#617a69]/40 pl-5">

                <p className="text-sm leading-6 text-[#555550]">
                  Please provide as much information as possible
                  about your research location, topic and objectives.
                </p>

              </div>

            </div>


            {/* GLASS FORM */}

            <div className="rounded-[28px] border border-white bg-white/75 p-7 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-2xl md:p-9">

              <form className="space-y-5">

                {/* NAME */}

                <div>

                  <label className="mb-2 block text-xs font-medium text-[#555550]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-[#e3e5e1] bg-white/80 px-4 py-3.5 text-sm text-[#20201e] outline-none transition placeholder:text-[#aaa9a3] focus:border-[#617a69] focus:ring-2 focus:ring-[#617a69]/10"
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label className="mb-2 block text-xs font-medium text-[#555550]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#e3e5e1] bg-white/80 px-4 py-3.5 text-sm text-[#20201e] outline-none transition placeholder:text-[#aaa9a3] focus:border-[#617a69] focus:ring-2 focus:ring-[#617a69]/10"
                  />

                </div>


                {/* ORGANIZATION */}

                <div>

                  <label className="mb-2 block text-xs font-medium text-[#555550]">
                    University / Organization
                  </label>

                  <input
                    type="text"
                    name="organization"
                    placeholder="University or organization"
                    className="w-full rounded-xl border border-[#e3e5e1] bg-white/80 px-4 py-3.5 text-sm text-[#20201e] outline-none transition placeholder:text-[#aaa9a3] focus:border-[#617a69] focus:ring-2 focus:ring-[#617a69]/10"
                  />

                </div>


                {/* TWO COLUMNS */}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* RESEARCH TYPE */}

                  <div>

                    <label className="mb-2 block text-xs font-medium text-[#555550]">
                      Research Type
                    </label>

                    <select
                      name="researchType"
                      required
                      className="w-full rounded-xl border border-[#e3e5e1] bg-white/80 px-4 py-3.5 text-sm text-[#20201e] outline-none transition focus:border-[#617a69] focus:ring-2 focus:ring-[#617a69]/10"
                    >

                      <option value="">
                        Select type
                      </option>

                      <option value="biodiversity">
                        Biodiversity
                      </option>

                      <option value="wildlife">
                        Wildlife
                      </option>

                      <option value="ecology">
                        Ecology
                      </option>

                      <option value="forest">
                        Forest Research
                      </option>

                      <option value="birds">
                        Birds
                      </option>

                      <option value="mammals">
                        Mammals
                      </option>

                      <option value="other">
                        Other
                      </option>

                    </select>

                  </div>


                  {/* LOCATION */}

                  <div>

                    <label className="mb-2 block text-xs font-medium text-[#555550]">
                      Research Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="National park / area"
                      className="w-full rounded-xl border border-[#e3e5e1] bg-white/80 px-4 py-3.5 text-sm text-[#20201e] outline-none transition placeholder:text-[#aaa9a3] focus:border-[#617a69] focus:ring-2 focus:ring-[#617a69]/10"
                    />

                  </div>

                </div>


                {/* DETAILS */}

                <div>

                  <label className="mb-2 block text-xs font-medium text-[#555550]">
                    Research Details
                  </label>

                  <textarea
                    name="details"
                    rows={5}
                    required
                    placeholder="Describe your research topic, objectives, timeframe and what kind of connection or information you need..."
                    className="w-full resize-none rounded-xl border border-[#e3e5e1] bg-white/80 px-4 py-3.5 text-sm text-[#20201e] outline-none transition placeholder:text-[#aaa9a3] focus:border-[#617a69] focus:ring-2 focus:ring-[#617a69]/10"
                  />

                </div>


                {/* BUTTON */}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#617a69] px-5 py-3.5 text-sm font-medium text-white transition duration-200 hover:bg-[#52685a] hover:shadow-lg"
                >
                  Request a Connection
                </button>

                <p className="text-center text-[10px] leading-5 text-[#999993]">
                  Your information will only be used to review
                  and respond to your connection request.
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="border-t border-[#e5e6e2] bg-white/50 px-6 py-20 md:py-24">

        <div className="mx-auto max-w-5xl">

          <div className="text-center">

            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#617a69]">
              How It Works
            </p>

            <h2 className="mt-4 text-3xl font-medium md:text-4xl">
              From request to connection
            </h2>

          </div>


          <div className="mt-14 grid gap-10 md:grid-cols-3">

            <div className="text-center">

              <p className="text-xs font-semibold text-[#617a69]">
                01
              </p>

              <h3 className="mt-3 text-base font-medium">
                Submit
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#777771]">
                Send us your contact information and research
                requirements.
              </p>

            </div>


            <div className="text-center">

              <p className="text-xs font-semibold text-[#617a69]">
                02
              </p>

              <h3 className="mt-3 text-base font-medium">
                Review
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#777771]">
                We review your request and determine the
                appropriate type of contact.
              </p>

            </div>


            <div className="text-center">

              <p className="text-xs font-semibold text-[#617a69]">
                03
              </p>

              <h3 className="mt-3 text-base font-medium">
                Connect
              </h3>

              <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#777771]">
                Where appropriate, we help direct your request
                to the relevant organization or authority.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}