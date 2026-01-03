import {  Save } from "lucide-react";
import {  useState } from "react";    
import { useNavigate } from "react-router";




const JobSeekerBio = () => {
    const [phone,setPhone]= useState("");
    const [profile_summary,setProfile_summary]= useState("");

    const navigate = useNavigate();


    // Fetch existing profile data from backend API
    const postBio = async () => {
        try {   
            const token = localStorage.getItem('jwt');
            const response = await fetch('http://localhost:3000/api/jobseeker/profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone: phone,
                    profile_summary: profile_summary
                })
            });     
            const data = await response.json();
            console.log()
            console.log(data.message);
            if (response.ok) {
                navigate('/jobseeker');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };



  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Personal Info</h1>

      <form className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-8" onSubmit={postBio}>
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
                disabled
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
                disabled
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                defaultValue="(123) 456-7890"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e)=>setPhone(e.target.value)}
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
                onChange={(e)=>setProfile_summary(e.target.value)}
              />
            </div>
          </div>
        </section>


        <div className="pt-4 flex justify-end">
          <button type="submit"  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors">
            <Save className="w-5 h-5" />
            Save 
          </button>
        </div>
      </form>
    </div>
  );
}


export default JobSeekerBio;
