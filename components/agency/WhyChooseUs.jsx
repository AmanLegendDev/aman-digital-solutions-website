"use client";

import { motion } from "framer-motion";
import {
Smartphone,
Zap,
Palette,
Briefcase,
MessageCircle,
Headphones,
} from "lucide-react";

const features = [
{
icon: Smartphone,
title: "Mobile First Design",
description:
"Every website is designed to look and perform perfectly on mobile devices.",
},
{
icon: Zap,
title: "Fast Delivery",
description:
"Quick turnaround without compromising quality or performance.",
},
{
icon: Palette,
title: "Modern UI/UX",
description:
"Clean, premium and conversion-focused interfaces inspired by leading brands.",
},
{
icon: Briefcase,
title: "Business Focused",
description:
"Built with business goals in mind, not just visual appearance.",
},
{
icon: MessageCircle,
title: "WhatsApp Integration",
description:
"Allow customers to connect instantly through WhatsApp.",
},
{
icon: Headphones,
title: "Ongoing Support",
description:
"Reliable support after launch to keep everything running smoothly.",
},
];

export default function WhyChooseUs() {
return ( <section className="py-12 md:py-16 bg-[#0A0A0A]"> <div className="max-w-7xl mx-auto px-6">


    {/* Heading */}

    <div className="text-center mb-16">

      <div className="inline-flex px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-sm mb-5">
        Why Choose Us
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-white">
        Built For Growth,
        <span className="block text-yellow-400">
          Not Just Appearance
        </span>
      </h2>

      <p className="text-neutral-400 mt-5 max-w-2xl mx-auto">
        We create digital experiences that help businesses
        build trust, attract customers and grow online.
      </p>

    </div>

    {/* Cards */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            className="group rounded-[28px] border border-white/10 bg-[#111111] p-7 hover:border-yellow-500/30 transition-all duration-300"
          >

            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-5">
              <Icon
                size={26}
                className="text-yellow-400"
              />
            </div>

            <h3 className="text-xl font-semibold text-white">
              {feature.title}
            </h3>

            <p className="text-neutral-400 mt-4 leading-relaxed">
              {feature.description}
            </p>

          </motion.div>
        );
      })}

    </div>

  </div>
</section>


);
}
