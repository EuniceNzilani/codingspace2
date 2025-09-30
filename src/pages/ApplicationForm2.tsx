import React, { useState, useRef } from "react";
import codingLogo from "@/assets/Coding PLayground 1.png";
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

function DropdownIcon() {
  return (
    <svg
      className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M6 8L10 12L14 8" stroke="#170961" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

type JoinAcademyProps = {
  onBack?: () => void;
};

export default function JoinAcademy({ onBack }: JoinAcademyProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    experience: "",
    startDate: "",
    reason: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const startDateRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleStartDateCalendarClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (startDateRef.current) {
      // @ts-ignore
      startDateRef.current.showPicker
        ? startDateRef.current.showPicker()
        : startDateRef.current.click();
    }
  }

  function handleStartDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({
      ...f,
      startDate: e.target.value
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const applicationData = {
        ...form,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const studentsRef = collection(db, 'academy_applications');
      await addDoc(studentsRef, applicationData);

      setShowSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        program: "",
        experience: "",
        startDate: "",
        reason: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your application');
      console.error('Error submitting application:', err);
    } finally {
      setLoading(false);
    }
  }

  const programOptions = [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Coding Instructor",
    "Business Development Lead",
    "Digital Marketing Specialist",
    "Robotics Engineer (Tutor)",
    "Video Editor"
  ];

  const experienceOptions = [
    "Beginner",
    "Intermediate",
    "Advanced"
  ];

  function handleSuccessClose() {
    setShowSuccess(false);
    if (onBack) onBack();
  }

  return (
    <div className="bg-white min-h-screen w-screen overflow-x-hidden font-nunito">
      <header className="bg-white flex items-center h-[70px] border-b border-gray-200 shadow-sm pl-7">
        <img src={codingLogo} alt="Coding Playground Logo" className="h-12 w-auto object-contain" />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-9 sm:px-6 lg:px-8">
        <h1 className="text-[#170961] font-oswald font-black text-3xl sm:text-4xl md:text-5xl text-center mb-2 tracking-wide">
          Application Form
        </h1>
        <div className="text-base sm:text-lg text-dark text-center mb-8 font-nunito">
          Fill in your details to become one of CodingPlayGround Technology Student
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 max-w-3xl mx-auto mb-6 flex flex-col border border-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="font-oswald font-bold text-xl text-dark mb-5 text-center">
            Basic Details
          </div>

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

          <label className="block font-oswald font-semibold text-base text-dark mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito mb-6 focus:ring-2 focus:ring-[#170961] focus:border-transparent"
          />

          <div className="relative mb-6">
            <label className="block font-oswald font-semibold text-base text-dark mb-2">Program of Interest</label>
            <div className="relative">
              <select
                name="program"
                value={form.program}
                onChange={handleChange}
                required
                className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito w-full appearance-none pr-10 focus:ring-2 focus:ring-[#170961] focus:border-transparent"
              >
                <option value="" disabled>Select your program of interest</option>
                {programOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <DropdownIcon />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 mb-6">
            <div className="flex-1 relative">
              <label className="block font-oswald font-semibold text-base text-dark mb-2">Level of experience</label>
              <div className="relative">
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  required
                  className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito w-full appearance-none pr-10 focus:ring-2 focus:ring-[#170961] focus:border-transparent"
                >
                  <option value="" disabled>Select your level of experience</option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <DropdownIcon />
              </div>
            </div>
            <div className="flex-1 relative">
              <label className="block font-oswald font-semibold text-base text-dark mb-2">Preferred start date</label>
              <div className="relative">
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleStartDateChange}
                  ref={startDateRef}
                  required
                  placeholder="Enter your preferred start date"
                  className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito w-full pr-10 focus:ring-2 focus:ring-[#170961] focus:border-transparent"
                />
                <button
                  onClick={handleStartDateCalendarClick}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary"
                  type="button"
                >
                </button>
              </div>
            </div>
          </div>

          <label className="block font-oswald font-semibold text-base text-dark mb-2">Why do you want to join?</label>
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
            placeholder="Explain briefly the reason why you want to join CodingPlayGround Academy"
            rows={5}
            className="p-3 text-base rounded-lg border border-gray-200 outline-none shadow-sm bg-white text-dark font-nunito mb-4 resize-y focus:ring-2 focus:ring-[#170961] focus:border-transparent"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#170961] text-white border-none rounded-lg text-lg font-semibold py-3 shadow-md cursor-pointer w-full sm:w-52 mx-auto mt-4 font-nunito hover:bg-primary-dark transition-colors duration-200 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </main>

      {showSuccess && (
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
              onClick={handleSuccessClose}
              className="mt-4 bg-[#170961] text-white border-none px-8 py-3 rounded-lg font-medium text-base shadow-md cursor-pointer font-nunito hover:bg-[#130755] transition-colors"
            >Close</button>
          </div>
        </div>
      )}
    </div>
  );
}