"use client";

import React, { useState } from "react";
import Image from "next/image";

/* =========================================================
   TYPES
========================================================= */

type Person = {
  name: string;
  role: string;
  description?: string;
  image?: string;
  linkedin?: string;
};

/* =========================================================
   ORGANIZATION LEADERS
========================================================= */

const organizationLeaders: Person[] = [
  {
    name: "Aashish Panthi",
    role: "President — COSOG Nepal",
    description:
      "President of Coding for Social Good Nepal, supporting technology education and youth-led innovation for social impact.",
    image: "/team/aasish panthi.jpg",
    linkedin: "https://np.linkedin.com/in/aashishpanthi",
  },

  {
    name: "Bibek Bhandari",
    role: "Executive Chairman — COSOG Nepal",
    description:
      "Executive Chairman of Coding for Social Good Nepal, helping expand access to computer science education and technology-driven opportunities.",
    image: "/team/bibek.png",
     linkedin: "https://np.linkedin.com/in/aashishpanthi",
  },
];

/* =========================================================
   MENTORS
========================================================= */

const mentors: Person[] = [
  {
    name: "Sabina Shakya",
    role: "Environmental Science Researcher & Conservationist",
    description:
      "Environmental science researcher and conservationist contributing environmental expertise, research, and conservation knowledge to the E-STEM initiative.",
    image: "/team/sabina.jpg",
    linkedin: "https://np.linkedin.com/in/sabinashakya7",
  },

  {
    name: "Samikshya Khadka",
    role: "Software Engineer",
    description:
      "Software engineer contributing technical expertise, software development experience, and technology-focused mentorship.",
    image: "/team/samikshya.png",
    linkedin:
      "https://np.linkedin.com/in/samiksha-khadka-865b281a1",
  },

  {
    name: "Raushan Pandit",
    role: "Co-Mentor",
    description:
      "Supporting the mentees through technical guidance, problem solving, project development, and mentorship.",
    image: "/team/raushan.png",
    linkedin:
      "https://www.linkedin.com/in/raushanpandit",
  },
];

/* =========================================================
   MENTEES
========================================================= */

const mentees: Person[] = [
  {
    name: "Dikshya Poudel",
    role: "Mentee",
    image: "/team/dikshya.png",
    linkedin:
      "https://np.linkedin.com/in/dikshya-poudel-96724a22a",
  },

  {
    name: "Prashant Subedi",
    role: "Mentee",
    image: "/team/me.jpeg",
    linkedin:""
  },

  {
    name: "Sagar Pandey",
    role: "Mentee",
    image: "/images/team/sagar-pandey.png",
    linkedin:""
  },

  {
    name: "Sarjak",
    role: "Mentee",
    image: "/images/team/sarjak.png",
    linkedin:""
  },

  {
    name: "Easika Neupane",
    role: "Mentee",
    image: "/images/team/easika-neupane.png",
    linkedin:""
  },
];

/* =========================================================
   IMAGE
========================================================= */

function PersonImage({
  person,
  featured = false,
}: {
  person: Person;
  featured?: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`
        relative
        shrink-0
        overflow-hidden
        rounded-full
        bg-[#eeeeee]
        ring-4
        ring-[#ffc400]/20

        ${
          featured
            ? "h-28 w-28 sm:h-32 sm:w-32"
            : "h-20 w-20 sm:h-24 sm:w-24"
        }
      `}
    >
      {person.image && !imageError ? (
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes={featured ? "128px" : "96px"}
          className="
            object-cover
            grayscale
            transition-transform
            duration-500
            group-hover:scale-105
          "
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="px-2 text-center text-[9px] font-bold uppercase tracking-wider text-gray-400">
            No Image
          </span>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   LINKEDIN BUTTON
========================================================= */

function LinkedInButton({
  url,
  name,
}: {
  url: string;
  name: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${name}'s LinkedIn profile`}
      className="
        mt-4
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-[#0A66C2]/20
        bg-[#0A66C2]/5
        px-3
        py-1.5
        text-xs
        font-semibold
        text-[#0A66C2]
        transition
        hover:bg-[#0A66C2]
        hover:text-white
      "
    >
      {/* LinkedIn-style badge */}

      <span
        className="
          flex
          h-4
          w-4
          items-center
          justify-center
          rounded-[3px]
          bg-[#0A66C2]
          text-[9px]
          font-bold
          text-white
        "
      >
        in
      </span>

      <span>LinkedIn</span>

      <span className="text-[11px]">↗</span>
    </a>
  );
}

/* =========================================================
   PERSON CARD
========================================================= */

function PersonCard({
  person,
  featured = false,
}: {
  person: Person;
  featured?: boolean;
}) {
  return (
    <article
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-black/[0.06]
        bg-white
        p-5
        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]
      `}
    >
      <div
        className={`
          flex
          gap-5

          ${
            featured
              ? "flex-col sm:flex-row sm:items-center"
              : "items-center"
          }
        `}
      >
        {/* IMAGE */}

        <div
          className={
            featured
              ? "mx-auto sm:mx-0"
              : ""
          }
        >
          <PersonImage
            person={person}
            featured={featured}
          />
        </div>

        {/* INFORMATION */}

        <div
          className={`
            min-w-0
            flex-1

            ${
              featured
                ? "text-center sm:text-left"
                : ""
            }
          `}
        >
          {/* ROLE */}

          <p
            className="
              mb-1
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#b08b00]
            "
          >
            {person.role}
          </p>

          {/* NAME */}

          <h3
            className={`
              font-bold
              tracking-tight
              text-gray-950

              ${
                featured
                  ? "text-xl sm:text-2xl"
                  : "text-base sm:text-lg"
              }
            `}
          >
            {person.name}
          </h3>

          {/* DESCRIPTION */}

          {person.description && (
            <p
              className="
                mt-2
                text-sm
                leading-6
                text-gray-500
              "
            >
              {person.description}
            </p>
          )}

          {/* LINKEDIN */}

          {person.linkedin && (
            <LinkedInButton
              url={person.linkedin}
              name={person.name}
            />
          )}
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <p
          className="
            mb-2
            text-xs
            font-bold
            uppercase
            tracking-[0.2em]
            text-[#b08b00]
          "
        >
          {eyebrow}
        </p>
      )}

      <h2
        className="
          text-3xl
          font-bold
          tracking-tight
          text-gray-950

          sm:text-4xl
        "
      >
        {title}
      </h2>

      <div
        className="
          mx-auto
          mt-4
          h-1
          w-12
          rounded-full
          bg-[#ffc400]
        "
      />

      {description && (
        <p
          className="
            mx-auto
            mt-4
            max-w-2xl
            text-sm
            leading-6
            text-gray-500

            sm:text-base
          "
        >
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   GRANT / COLLABORATION
========================================================= */

function GrantSection() {
  return (
    <section
      className="
        bg-[#111111]
        px-5
        py-14

        sm:px-8

        lg:px-12
        lg:py-20
      "
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            grid
            gap-8

            lg:grid-cols-[1fr_1.4fr]
            lg:items-center
          "
        >
          {/* LEFT */}

          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#ffc400]
              "
            >
              Our Collaboration
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-bold
                tracking-tight
                text-white

                sm:text-4xl
              "
            >
              Global E-STEM
              <br />
              Innovation Grant
            </h2>

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-white/60

                sm:text-base
              "
            >
              A collaborative initiative connecting
              environmental science, technology, engineering,
              and mathematics with young innovators to develop
              solutions for real-world environmental
              challenges.
            </p>
          </div>

          {/* RIGHT */}

          <div
            className="
              grid
              gap-4

              sm:grid-cols-2
            "
          >
            {/* COSOG */}

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                p-6
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                "
              >
                Organization
              </p>

              <h3
                className="
                  mt-3
                  text-xl
                  font-bold
                  text-white
                "
              >
                Coding for Social Good Nepal
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-white/50
                "
              >
                Technology and computer science education
                focused on social impact across Nepal.
              </p>
            </div>

            {/* NAAEE */}

            <div
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/[0.05]
                p-6
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/40
                "
              >
                Environmental Education Partner
              </p>

              <h3
                className="
                  mt-3
                  text-xl
                  font-bold
                  text-white
                "
              >
                NAAEE
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-white/50
                "
              >
                North American Association for Environmental
                Education.
              </p>
            </div>

            {/* RTX */}

            <div
              className="
                rounded-2xl
                border
                border-[#ffc400]/20
                bg-[#ffc400]/10
                p-6

                sm:col-span-2
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#ffc400]
                "
              >
                Grant Support
              </p>

              <h3
                className="
                  mt-3
                  text-xl
                  font-bold
                  text-white
                "
              >
                Pratt & Whitney — an RTX business
              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-white/60
              "
              >
                Supporting environmental STEM education and
                youth-led innovation through the Global E-STEM
                Innovation Grant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function OurTeam() {
  return (
    <main
      className="
        w-full
        overflow-hidden
        bg-[#f7f7f7]
      "
    >
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          min-h-[500px]
          w-full
        "
      >
        <Image
          src="/team/cosog.jpg"
          alt="COSOG E-STEM Team"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div
          className="
            absolute
            inset-0
            bg-black/55
          "
        />

        <div
          className="
            relative
            z-10
            flex
            min-h-[500px]
            flex-col
            items-center
            justify-center
            px-6
            text-center
          "
        >
          <p
            className="
              mb-4
              text-xs
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#ffc400]
            "
          >
            Coding for Social Good Nepal
          </p>

          <h1
            className="
              max-w-4xl
              text-4xl
              font-bold
              tracking-tight
              text-white

              sm:text-5xl

              lg:text-7xl
            "
          >
            MEET THE TEAM
          </h1>

          <p
            className="
              mt-6
              max-w-2xl
              text-sm
              leading-7
              text-white/80

              sm:text-base
            "
          >
            Meet the leaders, mentors, and young innovators
            working together through E-STEM to connect
            environmental science and technology for
            real-world impact.
          </p>

          <a
            href="#team"
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#ffc400]
              px-7
              py-3
              text-sm
              font-bold
              text-black
              transition

              hover:-translate-y-0.5
              hover:bg-[#eeb700]
            "
          >
            MEET OUR TEAM

            <span className="text-base">→</span>
          </a>
        </div>
      </section>

      {/* =====================================================
          ORGANIZATION
      ===================================================== */}

      <section
        id="team"
        className="
          bg-[#f5f5f5]
          px-5
          py-14

          sm:px-8

          lg:px-12
          lg:py-20
        "
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Leadership"
            title="Coding for Social Good Nepal"
            description="The organization behind the initiative, bringing computer science education and technology-driven social impact to students across Nepal."
          />

          <div
            className="
              grid
              gap-5

              lg:grid-cols-2
            "
          >
            {organizationLeaders.map((person) => (
              <PersonCard
                key={person.name}
                person={person}
                featured
              />
            ))}
          </div>
        </div>
      </section>

      {/* 
          GRANT
       */}

      <GrantSection />

      {/* 
          MENTORS
       */}

      <section
        className="
          bg-white
          px-5
          py-14

          sm:px-8

          lg:px-12
          lg:py-20
        "
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Guidance & Expertise"
            title="Our Mentors"
            description="Experienced professionals supporting the team across environmental science, conservation, software engineering, technology, and project development."
          />

          <div
            className="
              flex
              gap-4
              overflow-x-auto
              pb-5
              scrollbar-hide

              lg:grid
              lg:grid-cols-3
              lg:gap-5
              lg:overflow-visible
            "
          >
            {mentors.map((person) => (
              <div
                key={person.name}
                className="
                  min-w-[300px]

                  lg:min-w-0
                "
              >
                <PersonCard
                  person={person}
                  featured
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
          MENTEES
       */}

      <section
        className="
          bg-[#f5f5f5]
          px-5
          py-14

          sm:px-8

          lg:px-12
          lg:py-20
        "
      >
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Young Innovators"
            title="Build by Mentees"
            description="The students and emerging innovators turning environmental challenges into technology-driven ideas and solutions."
          />

          <div
            className="
              flex
              gap-4
              overflow-x-auto
              pb-5
              scrollbar-hide

              sm:grid
              sm:grid-cols-2

              lg:grid-cols-3
              lg:gap-5
              lg:overflow-visible
            "
          >
            {mentees.map((person) => (
              <div
                key={person.name}
                className="
                  min-w-[280px]

                  sm:min-w-0
                "
              >
                <PersonCard person={person} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
          TEAM STRUCTURE
       */}

      <section
        className="
          bg-white
          px-5
          py-14

          sm:px-8

          lg:px-12
          lg:py-20
        "
      >
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            eyebrow="One Team"
            title="From Ideas to Impact"
            description="A collaborative structure connecting organizational leadership, expert mentorship, and student innovation."
          />

          <div
            className="
              grid
              gap-4

              md:grid-cols-3
            "
          >
            {/* ORGANIZATION */}

            <div
              className="
                rounded-2xl
                bg-[#f7f7f7]
                p-6
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-xl
                  text-[#ffc400]
                "
              >
                01
              </div>

              <h3 className="mt-4 font-bold text-gray-950">
                Organization
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                COSOG Nepal provides the platform, direction,
                and resources.
              </p>
            </div>

            {/* MENTORS */}

            <div
              className="
                rounded-2xl
                bg-[#f7f7f7]
                p-6
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-xl
                  text-[#ffc400]
                "
              >
                02
              </div>

              <h3 className="mt-4 font-bold text-gray-950">
                Mentorship
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Mentors provide environmental and technical
                expertise.
              </p>
            </div>

            {/* MENTEES */}

            <div
              className="
                rounded-2xl
                bg-[#f7f7f7]
                p-6
                text-center
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-xl
                  text-[#ffc400]
                "
              >
                03
              </div>

              <h3 className="mt-4 font-bold text-gray-950">
                Innovation
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Mentees turn environmental challenges into
                practical ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        className="
          bg-[#ffc400]
          px-5
          py-12

          sm:px-8

          lg:px-12
          lg:py-16
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            gap-6
            text-center

            lg:flex-row
            lg:justify-between
            lg:text-left
          "
        >
          <div>
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-black/50
              "
            >
              E-STEM Innovation
            </p>

            <h2
              className="
                mt-2
                text-3xl
                font-bold
                text-black

                sm:text-4xl
              "
            >
              Building solutions for a better future.
            </h2>

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                text-black/65
              "
            >
              Science, technology, and young people working
              together for environmental impact.
            </p>
          </div>

          <a
            href="#team"
            className="
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-full
              bg-black
              px-8
              py-3
              text-sm
              font-bold
              text-white
              transition

              hover:scale-105
            "
          >
            OUR TEAM

            <span className="text-base">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}