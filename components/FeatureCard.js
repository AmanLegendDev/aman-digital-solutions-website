export default function FeatureCard({ title, desc }) {
  return (
    <div className="border p-4 rounded-lg">
      <h3 className="font-bold">{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
