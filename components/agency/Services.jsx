"use client";

import { motion } from "framer-motion";

import {
Globe,
QrCode,
IdCard,
LayoutDashboard,
Wrench,
Sparkles,
Users,
MapPinned,
} from "lucide-react";
const services = [
{
icon: Globe,
title: "Business Websites",
description:
"Professional websites for bakeries, jewellery stores, hotels and local businesses.",
points: [
"Mobile Responsive",
"SEO Friendly",
"Fast Loading",
],
},

{
icon: QrCode,
title: "QR Ordering Systems",
description:
"Modern digital menu and QR ordering solutions for restaurants and cafes.",
points: [
"QR Menus",
"Order Management",
"Customer Friendly",
],
},

{
icon: IdCard,
title: "Digital Visiting Cards",
description:
"Share your business information instantly with smart digital cards.",
points: [
"QR Enabled",
"Easy Sharing",
"Professional Branding",
],
},

{
icon: LayoutDashboard,
title: "Admin Dashboards",
description:
"Custom dashboards to manage products, orders and business data.",
points: [
"Secure Access",
"Easy Management",
"Scalable",
],
},

{
icon: Wrench,
title: "Website Maintenance",
description:
"Keep your website secure, updated and running smoothly.",
points: [
"Bug Fixes",
"Performance Updates",
"Ongoing Support",
],
},

{
icon: Sparkles,
title: "Custom Solutions",
description:
"Tailored digital solutions designed around your business needs.",
points: [
"Custom Features",
"Business Focused",
"Future Ready",
],
},
{
icon: Users,
title: "CRM & Lead Management",
description:
"Manage enquiries, customers and leads through custom CRM solutions.",
points: [
"Lead Tracking",
"Customer Management",
"Business Automation",
],
},

{
icon: MapPinned,
title: "Google Business Profile",
description:
"Improve local visibility and get discovered on Google Search and Maps.",
points: [
"Google Maps Setup",
"Business Verification",
"Local SEO",
],
},
];

export default function Services() {
return ( <section id="services" className="py-12 md:py-16 bg-[#0A0A0A]"> <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >
      <div className="inline-flex px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400 text-sm mb-5">
        Our Services
      </div>

      <h2 className="text-3xl md:text-5xl font-bold text-white">
        Digital Solutions Designed
        <span className="block text-yellow-400">
          For Business Growth
        </span>
      </h2>

      <p className="text-neutral-400 mt-5 max-w-2xl mx-auto">
        From websites to QR ordering systems, we help local
        businesses build a strong digital presence.
      </p>
    </motion.div>

    {/* Cards */}

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {services.map((service, index) => {
        const Icon = service.icon;

        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            className="group relative rounded-3xl border border-white/10 bg-[#111111] p-7 overflow-hidden hover:border-yellow-500/30 transition-all"
          >
            {/* Glow */}

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-yellow-500/10 blur-3xl" />
            </div>

            {/* Icon */}

            <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">
              <Icon
                size={26}
                className="text-yellow-400"
              />
            </div>

            {/* Title */}

            <h3 className="text-xl font-semibold text-white">
              {service.title}
            </h3>

            {/* Description */}

            <p className="text-neutral-400 mt-4 leading-relaxed">
              {service.description}
            </p>

            {/* Features */}

            <div className="mt-6 space-y-3">

              {service.points.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 text-sm text-neutral-300"
                >
                  <span className="text-yellow-400">
                    ✓
                  </span>

                  {point}
                </div>
              ))}

            </div>
          </motion.div>
        );
      })}

    </div>

  </div>
</section>


);
}
