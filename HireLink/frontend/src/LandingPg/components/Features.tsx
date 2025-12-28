import { Users, FileText, Bookmark, TrendingUp, Shield } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      color: "bg-indigo-50 text-indigo-600",
      title: "Role-Based Dashboards",
      description:
        "Tailored experiences for job seekers and employers with dedicated dashboards.",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      color: "bg-teal-50 text-teal-600",
      title: "Application Tracking",
      description:
        "Track your job applications and manage candidate pipelines efficiently",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      color: "bg-indigo-50 text-indigo-600",
      title: "Resume Management",
      description:
        "Upload and manage multiple resumes. Apply to jobs with a single click.",
    },
    {
      icon: <Bookmark className="w-6 h-6" />,
      color: "bg-emerald-50 text-emerald-600",
      title: "Job Bookmarking",
      description:
        "Save interesting jobs to review later and never miss an opportunity",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-indigo-50 text-indigo-600",
      title: "Real-Time Updates",
      description: "Get instant notifications on application status changes.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      color: "bg-cyan-50 text-cyan-600",
      title: "Secure & Private",
      description:
        "Your data is protected with industry-standard security measures.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <h3 className="mt-16 text-center text-2xl font-medium">
        Platform Features
      </h3>

      <div className="grid gap-6 md:grid-cols-3 mt-20">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.color}`}
            >
              {item.icon}
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              {item.title}
            </h4>
            <p className="text-gray-500 leading-relaxed text-base">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
