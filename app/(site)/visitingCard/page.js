// app/visiting-card/page.jsx  (Next.js App Router)
// ya pages/visiting-card.jsx  (agar old pages router use kar raha hai)

import Image from "next/image";

export default function VisitingCardPage() {
  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center gap-10 p-6">
      {/* FRONT SIDE */}
      <section className="w-[340px] h-[200px] rounded-2xl bg-black border border-emerald-400/80 shadow-[0_0_30px_rgba(16,185,129,0.6)] flex flex-col justify-between p-5">
        {/* Top: Logo + Brand */}
        <div className="flex items-center gap-3">
          {/* TODO: yaha apna ADS logo laga */}
          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center border border-black-400/70">
            {/* Agar image use karna hai: 
                <Image src="/logo-ads.png" alt="ADS Logo" fill className="object-contain" /> */}
            <span className="text-emerald-400 font-semibold text-xl">ADS</span>
          </div>

          <div>
            <h1 className="text-xl font-semibold text-white leading-tight">
              Aman Digital Solutions
            </h1>
            <p className="text-xs text-emerald-300/80">
              Custom digital menus & web solutions
            </p>
          </div>
        </div>

        {/* Center: tagline */}
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
            Shimla · Himachal Pradesh
          </p>
          <p className="text-sm text-slate-100">
            We build fast, modern QR menus that actually{" "}
            <span className="text-emerald-400 font-semibold">increase orders</span>.
          </p>
        </div>

        {/* Bottom: name + role */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Aman Ansari</p>
            <p className="text-xs text-slate-400">Founder & Web Developer</p>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-slate-400">Powered by</p>
            <p className="text-xs font-medium text-emerald-300">
              Next.js · MongoDB · Cloud
            </p>
          </div>
        </div>
      </section>

      {/* BACK SIDE */}
      <section className="w-[340px] h-[200px] rounded-2xl bg-black border border-slate-700 shadow-[0_0_25px_rgba(15,23,42,0.9)] flex flex-col justify-between p-5">
        {/* QR + text */}
        <div className="flex gap-4">
          {/* TODO: yaha apna website ka QR image laga */}
          <img
          src="aman-digital.png"
           className="w-20 h-20 rounded-xl bg-slate-900 border border-slate-600 flex items-center justify-center text-[10px] text-slate-400">
          </img>
<div className="flex-1">
  <p className="text-xs font-semibold text-white mb-1">
    Scan to visit our official website
  </p>
  <p className="text-[11px] text-slate-400">
    Explore our digital menu system, pricing, and services directly on the ADS
    website.
  </p>
</div>

        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 my-2" />

        {/* Contact info */}
        <div className="space-y-1 text-xs">
          <p className="text-slate-300">
            📞 <span className="font-medium text-white">+91-82191-74058</span>
                 
          </p>
          <p>
            📞 <span className="font-medium text-white">+91-78764-76321</span>
          </p>
          <p className="text-slate-300">
            📧{" "}
            <span className="font-medium text-white">
              amanansaricodes@gmail.com
            </span>
          </p>
          <p className="text-slate-300">
            🌐{" "}
            <span className="font-medium text-emerald-400">
            aman-digital-solutions-website.vercel.app/
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
