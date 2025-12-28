function Step1(number: number, title: string, description: string) {
  return (
    <div className="flex gap-4 mt-6">
      <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full text-white font-semibold bg-indigo-700">
        {number}
      </span>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600 mt-1 max-w-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function Step2(number: number, title: string, description: string) {
  return (
    <div className="flex gap-4 mt-6">
      <span className="shrink-0 flex h-9 w-9 items-center justify-center rounded-full text-white font-semibold bg-teal-500">
        {number}
      </span>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600 mt-1 max-w-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 bg-gray-50">
      <h3 className="mb-12 text-center text-xl font-semibold">How It Works</h3>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h4 className="mb-6 font-semibold text-blue-600 text-lg">
            For Job Seekers
          </h4>
          {Step1(
            1,
            "Create Your Profile",
            "Sign up and complete your profile with your skills and experience."
          )}
          {Step1(
            2,
            "Browse & Apply",
            "Search for jobs, bookmark interesting ones, and apply with your resume."
          )}
          {Step1(
            3,
            "Track Applications",
            "Monitor your application status and get hired!"
          )}
        </div>

        <div>
          <h4 className="mb-6 font-semibold text-teal-500 text-lg">
            For Employers
          </h4>
          {Step2(
            1,
            "Set Up Company Profile",
            "Create your company profile and showcase your brand."
          )}
          {Step2(
            2,
            "Post Job Openings",
            "Create detailed job listings with requirements and compensation."
          )}
          {Step2(
            3,
            "Review & Hire",
            "Review applications, shortlist candidates, and make your hire."
          )}
        </div>
      </div>
    </section>
  );
}
