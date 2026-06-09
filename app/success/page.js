import Link from "next/link";
import { CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">

      <div className="max-w-2xl mx-auto text-center">

        {/* Glow */}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-500/10 blur-[180px] rounded-full pointer-events-none" />

        {/* Success Icon */}

        <div className="relative z-10 flex justify-center">

          <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">

            <CheckCircle2
              size={56}
              className="text-green-400"
            />

          </div>

        </div>

        {/* Heading */}

        <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-white mt-8">
          Inquiry Submitted
        </h1>

        <p className="relative z-10 text-neutral-400 text-lg mt-6 leading-relaxed max-w-xl mx-auto">
          Thank you for contacting
          <span className="text-white font-medium">
            {" "}Aman Digital Solutions
          </span>.
          <br />
          We have successfully received your inquiry and
          will review your requirements shortly.
        </p>

        {/* Info Card */}

        <div className="relative z-10 mt-10 rounded-3xl border border-white/10 bg-[#111111] p-6">

          <h3 className="text-white font-semibold text-lg">
            What Happens Next?
          </h3>

          <div className="space-y-3 mt-5 text-neutral-400">

            <p>
              ✅ Your inquiry has been saved successfully.
            </p>

            <p>
              ✅ We will review your project requirements.
            </p>

            <p>
              ✅ You'll receive a response within 24 hours.
            </p>

            <p>
              ✅ We'll discuss the best solution for your business.
            </p>

          </div>

        </div>

        {/* Buttons */}

        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center mt-10">

          <a
            href="https://wa.me/918219174058"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-black px-7 py-4 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-white/10 text-white px-7 py-4 rounded-xl hover:border-yellow-400 transition"
          >
            <ArrowLeft size={18} />
            Return Home
          </Link>

        </div>

        {/* Footer Text */}

        <p className="relative z-10 text-neutral-500 text-sm mt-10">
          Aman Digital Solutions • Shimla, Himachal Pradesh
        </p>

      </div>

    </main>
  );
}