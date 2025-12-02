export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div>
          <h2 className="text-xl font-semibold mb-3">Aman Digital Solutions</h2>
          <p className="text-neutral-300">
            Premium QR Digital Menu system for restaurants & hotels in Himachal.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-neutral-300">
            <li>Features</li>
            <li>Pricing</li>
            <li>Demo</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-neutral-300">Shimla, Himachal Pradesh</p>
          <p className="text-neutral-300">Email: amanansaricodes@gmail.com  </p>
          <p className="text-neutral-300 mt-3">
            © {new Date().getFullYear()} Aman Digital Solutions
          </p>
        </div>

      </div>
    </footer>
  );
}
