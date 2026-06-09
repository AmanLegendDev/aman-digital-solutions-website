"use client";

import { motion } from "framer-motion";

const steps = [
{
number: "01",
title: "Discussion",
description:
"We understand your business, goals and requirements before starting the project.",
},
{
number: "02",
title: "Planning",
description:
"A clear project roadmap is created with structure, features and timelines.",
},
{
number: "03",
title: "Design",
description:
"Premium UI/UX designs focused on trust, conversions and customer experience.",
},
{
number: "04",
title: "Development",
description:
"Fast, scalable and responsive development using modern technologies.",
},
{
number: "05",
title: "Launch",
description:
"After testing and optimization, your project goes live and ready for customers.",
},
];

export default function HowItWorks() {
return ( <section className="py-12 md:py-16 bg-[#0A0A0A]"> <div className="max-w-7xl mx-auto px-6">


    {/* Heading */}

    <div className="text-center mb-20">

      <div className="inline-flex px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-sm mb-5">
        Our Process
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-white">
        Simple Process,
        <span className="block text-yellow-400">
          Powerful Results
        </span>
      </h2>

      <p className="text-neutral-400 mt-5 max-w-2xl mx-auto">
        A streamlined workflow designed to take your business
        from idea to launch without unnecessary complexity.
      </p>

    </div>

    {/* Timeline */}

    <div className="relative">

      {/* Vertical Line */}

      <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

      <div className="space-y-8">

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            className="relative md:pl-20"
          >

            {/* Number Circle */}

            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center z-10">
              {step.number}
            </div>

            {/* Card */}

            <div className="rounded-[28px] border border-white/10 bg-[#111111] p-7 hover:border-yellow-500/30 transition-all duration-300">

              <h3 className="text-xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="text-neutral-400 mt-3 leading-relaxed">
                {step.description}
              </p>

            </div>

          </motion.div>
        ))}

      </div>

    </div>

  </div>
</section>


);
}
