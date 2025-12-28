import {  Save } from "lucide-react";
import { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import { EmployerApi } from "../../api/EmployerApi/profileApi";


 

const EmployerProfile = () => {
   const navigate = useNavigate();

  // // Form state
  
  const[companyEmail,setcompanyEmail]=useState('');
  const[companyName,setcompanyName]=useState('');
  const[companyDescription,setcompanyDescription]=useState('');


  type EmployerProfilePayload = {
    company_name: string;
    company_email: string;
    company_description: string;
  }
  // // Loading state
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const payload :EmployerProfilePayload= {
      company_name:companyName,
      company_email:companyEmail,
      company_description:companyDescription
    };

    try {
      const response = await EmployerApi(payload);
      console.log(response);

       if (response.message === 'success' && response.role === 'employer') {
        navigate('/employer');
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

      <form className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-8" onSubmit={handleSave}>
        {/* Personal Info */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                companyName
              </label>
              <input
                type="text"
                defaultValue="John"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e)=>setcompanyName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                companyEmail
              </label>
              <input
                type="text"
                defaultValue="Paul"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e)=>setcompanyEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Headline
              </label>
              <input
                type="text"
                defaultValue="Employer"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-500"
                placeholder="Employer"
                disabled
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
              Company Description
              </label>
              <textarea
                rows={4}
                defaultValue="I am a passionate developer..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
               onChange={(e)=>setcompanyDescription(e.target.value)}
             />
            </div>
          </div>
        </section>

      

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
            <Save className="w-5 h-5" />
            {isLoading ? 'Saving' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerProfile;
