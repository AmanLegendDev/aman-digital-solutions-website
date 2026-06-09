"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();

      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-8">
          Leads Dashboard
        </h1>

        {loading ? (
          <p className="text-neutral-400">
            Loading...
          </p>
        ) : leads.length === 0 ? (
          <p className="text-neutral-400">
            No Leads Yet
          </p>
        ) : (
          <div className="grid gap-5">

            {leads.map((lead) => (
              <div
                key={lead._id}
                className="rounded-3xl border border-white/10 bg-[#111111] p-6"
              >

                <div className="flex justify-between flex-wrap gap-3">

                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {lead.name}
                    </h2>

                    <p className="text-yellow-400 mt-1">
                      {lead.businessName}
                    </p>
                  </div>

                  <div className="text-sm text-neutral-500">
                    {new Date(
                      lead.createdAt
                    ).toLocaleString()}
                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">

                  <div>
                    <p className="text-neutral-400">
                      Phone
                    </p>

                    <p className="text-white">
                      {lead.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-neutral-400">
                      Email
                    </p>

                    <p className="text-white">
                      {lead.email || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-neutral-400">
                      Service
                    </p>

                    <p className="text-white">
                      {lead.businessType || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-neutral-400">
                      Budget
                    </p>

                    <p className="text-white">
                      {lead.budget || "-"}
                    </p>
                  </div>

                </div>

                <div className="mt-6">
                  <p className="text-neutral-400">
                    Requirement
                  </p>

                  <p className="text-white mt-2">
                    {lead.requirement}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-neutral-400">
                    Message
                  </p>

                  <p className="text-white mt-2">
                    {lead.message || "-"}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}