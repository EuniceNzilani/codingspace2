import React, { useState, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

// --- SuccessPopup component ---
function SuccessPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center min-w-[360px] max-w-[90vw] font-nunito">
        <div className="mb-4">
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" className="mx-auto">
            <circle cx="27" cy="27" r="27" fill="#14A388"/>
            <path d="M18 28l6.3 6.3L36 22.6" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="39" cy="12" r="2.2" fill="#14A388"/>
            <circle cx="14" cy="16" r="1.6" fill="#14A388"/>
            <circle cx="46" cy="26" r="1.2" fill="#14A388"/>
          </svg>
        </div>
        <div className="font-oswald font-semibold text-xl text-dark mb-2">
          Application Submitted Successfully
        </div>
        <div className="font-nunito text-base text-gray-600 mb-2">
          You will receive an email once the process is complete
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-[#170961] text-white border-none px-8 py-3 rounded-lg font-medium text-base shadow-md cursor-pointer font-nunito"
        >Close</button>
      </div>
    </div>
  );
}

export default function StartProject() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timelineDateRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const projectData = {
        ...form,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      const projectsRef = collection(db, 'projects');
      await addDoc(projectsRef, projectData);

      setPopupOpen(true);
      setForm({
        name: "",
        email: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        description: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the project');
      console.error('Error submitting project:', err);
    } finally {
      setLoading(false);
    }
  }

  function handlePopupClose() {
    setPopupOpen(false);
  }

  function handleTimelineCalendarClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (timelineDateRef.current) {
      // @ts-ignore
      timelineDateRef.current.showPicker
        ? timelineDateRef.current.showPicker()
        : timelineDateRef.current.click();
    }
  }

  function handleTimelineDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({
      ...f,
      timeline: e.target.value
    }));
  }

  return (
    <div className="bg-white min-h-screen w-screen overflow-x-hidden font-nunito pt-10">
      <Header />
      <main className="max-w-3xl mx-auto px-2 sm:px-6 py-16">
        <h1 className="font-oswald font-black text-3xl sm:text-4xl text-center mb-2 text-[#170961]">
          Start a project
        </h1>
        <div className="text-base sm:text-lg text-dark text-center mb-8 font-nunito">
          Fill in your details for a preferred project and for a streamlined deliverances
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 mx-auto flex flex-col max-w-2xl"
          style={{ border: "none" }}
        >
          <div className="font-oswald font-bold text-xl text-dark mb-7 text-center">
            Basic Details
          </div>

          {/* Full Name */}
          <label className="block font-oswald font-semibold text-base text-dark mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Enter your Full name"
            className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito mb-6 focus:ring-2 focus:ring-[#170961] focus:border-transparent"
          />

          {/* Email Address */}
          <label className="block font-oswald font-semibold text-base text-dark mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
            className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito mb-6 focus:ring-2 focus:ring-[#170961] focus:border-transparent"
          />

          {/* Company/Organization */}
          <label className="block font-oswald font-semibold text-base text-dark mb-2">Company/Organization</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your Company Name"
            className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito mb-6 focus:ring-2 focus:ring-[#170961] focus:border-transparent"
          />

          {/* Project Type & Budget Range */}
          <div className="flex flex-col sm:flex-row gap-5 mb-6">
            <div className="flex-1">
              <label className="block font-oswald font-semibold text-base text-dark mb-2">Project Type</label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                required
                className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito w-full focus:ring-2 focus:ring-[#170961] focus:border-transparent appearance-none"
              >
                <option value="">Select type of project</option>
                <option value="Website">Website</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="MVP">MVP</option>
                <option value="Web Application">Web Application</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block font-oswald font-semibold text-base text-dark mb-2">Budget Range</label>
              <input
                type="text"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                required
                placeholder="Enter your budget range"
                className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito w-full focus:ring-2 focus:ring-[#170961] focus:border-transparent"
              />
            </div>
          </div>

          {/* Timeline */}
          <label className="block font-oswald font-semibold text-base text-dark mb-2">Timeline</label>
          <div className="relative mb-6">
            <input
              type="date"
              name="timeline"
              value={form.timeline}
              onChange={handleTimelineDateChange}
              ref={timelineDateRef}
              required
              placeholder="What is your preferred timeline"
              className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito w-full focus:ring-2 focus:ring-[#170961] focus:border-transparent"
            />
            <button
              onClick={handleTimelineCalendarClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#170961]"
              type="button"
              tabIndex={-1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#170961"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>

          {/* Brief Description */}
          <label className="block font-oswald font-semibold text-base text-dark mb-2">Brief Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="Explain briefly about your project"
            rows={5}
            className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito mb-4 resize-y focus:ring-2 focus:ring-[#170961] focus:border-transparent"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`mx-auto w-52 bg-[#170961] hover:bg-[#130755] text-white font-bold py-3 rounded-lg shadow-md transition-colors duration-200 mt-6 block ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </main>
      <SuccessPopup open={popupOpen} onClose={handlePopupClose} />
    </div>
  );
}