import { Bell, Lock } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>

      {/* Notifications */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Bell className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900">Notifications</h3>
        </div>
        <div className="p-6 space-y-4">
          {[
            "New Job Alerts",
            "Application Status Updates",
            "Marketing Emails",
          ].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-slate-700 font-medium">{item}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Lock className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-900">Security</h3>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-indigo-50 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-100 transition-colors mt-2">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
