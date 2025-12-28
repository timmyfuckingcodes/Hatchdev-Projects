import { Upload, FileText, Save } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

      <form className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-8">
        {/* Personal Info */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue="John"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Paul"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                defaultValue="Software Engineer | React Specialist"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Bio
              </label>
              <textarea
                rows={4}
                defaultValue="I am a passionate developer..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              />
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
            Resume / CV
          </h3>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-sm font-medium text-slate-900">
              Click to upload or drag and drop
            </div>
            <p className="text-xs text-slate-500 mt-1">PDF, DOCX up to 5MB</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg border border-slate-200 text-red-500">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  John_Paul_Resume.pdf
                </p>
                <p className="text-xs text-slate-500">
                  Uploaded on Dec 15, 2025
                </p>
              </div>
            </div>
            <button
              type="button"
              className="text-sm text-indigo-600 font-medium hover:underline"
            >
              Update
            </button>
          </div>
        </section>

        <div className="pt-4 flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
