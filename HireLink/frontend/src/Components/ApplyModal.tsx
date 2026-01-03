import React, { useState,useEffect } from "react";
import { X, Upload, CheckCircle, FileText } from "lucide-react";
//my added code
import axios from "axios";
import { resume } from "react-dom/server";

interface ApplyModalProps {
  job_Id: number;
  jobTitle: string;
  companyName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal = ({
  //Added code
  job_Id,
  jobTitle,
  companyName,
  isOpen,
  onClose,
}: ApplyModalProps) => {
  const [step, setStep] = useState(1);
  const [cvFile, setCvFile] = useState("timmy");
const [coverLetter, setCoverLetter] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
//${localStorage.getItem("token")
    try {
      const response = await axios.post(
        `http://localhost:3000/api/application/${job_Id}`, // backend endpoint
        {
          resume_url: cvFile, // You might need to handle file upload differently
          coverLetter,
           notes,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("Success:", response.data);
      alert("Application submitted!");
    } catch (error: any) {
      console.error(
        "Error:",
        error.response?.data || error.message
      );
      alert("Failed to submit application");
    } finally {
      setLoading(false);
    }
  };


  if (!isOpen) return null;

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setCvFile(e.target.files[0]);
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!cvFile) {
  //     alert("Please upload your Resume/CV before submitting.");
  //     return;
  //   }

  //   setTimeout(() => {
  //     setStep(2);
  //   }, 1000);
  // };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Apply for {jobTitle}
            </h2>
            <p className="text-sm text-gray-500">{companyName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="John"
                />
              </div>
              <div> */}
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                  placeholder="Doe"
                />
              </div>
            </div> */}

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="john@example.com"
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume / CV <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative ${
                  !cvFile ? "border-gray-300" : "border-indigo-500 bg-indigo-50"
                }`}
              >
                <input
                  type="text"  //file
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {e.target.value && setCvFile(e.target.value);}}
                  // required={!cvFile}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={cvFile}
                />
                {/* {cvFile ? (
                  <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium">
                    <FileText className="w-5 h-5" />
                    {cvFile.name}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCvFile(null);
                      }}
                      className="ml-2 p-1 bg-white rounded-full hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Upload className="w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="text-indigo-600 font-semibold">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </>
                )} */}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Tell us why you're a great fit..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-none"
                placeholder="Tell us why you're a great fit..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                onClick={handleSubmit}
             >
                
                Submit Application
              </button>
            </div>
          </form>
        )}
        {step === 2 && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Application Sent!
            </h3>
            <p className="text-gray-500 mb-8">
              Your application for <strong>{jobTitle}</strong> has been sent to{" "}
              <strong>{companyName}</strong>. Good luck!
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Back to Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;