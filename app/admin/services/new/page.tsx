import ServiceCreateForm from "@/components/admin/services/form/ServiceCreateForm";

import { connectDB } from "@/lib/db/connect";
import FAQ from "@/models/FAQ";
import Project from "@/models/Project";

export default async function NewServicePage() {
  await connectDB();

  const [faqDocuments, projectDocuments] =
    await Promise.all([
      FAQ.find({})
        .select("_id question")
        .sort({ createdAt: -1 })
        .lean(),

      Project.find({})
        .select("_id title")
        .sort({ createdAt: -1 })
        .lean(),
    ]);

  const faqs = faqDocuments.map((faq) => ({
    id: String(faq._id),
    title: String(faq.question),
  }));

  const projects = projectDocuments.map((project) => ({
    id: String(project._id),
    title: String(project.title),
  }));

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-10 sm:px-8 lg:px-10">
      <ServiceCreateForm
        faqs={faqs}
        projects={projects}
      />
    </main>
  );
}