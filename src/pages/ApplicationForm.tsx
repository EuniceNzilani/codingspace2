import React, { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase';

type ApplicationFormProps = {
  onBack?: () => void;
  onNavigate?: () => void;
};

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

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onBack, onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    linkedin: '',
    github: '',
    portfolio: '',
    resume: null as File | null
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [fileName, setFileName] = useState('Inbox');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      setFileName(file.name);
    } else {
      setFormData(prev => ({
        ...prev,
        resume: null
      }));
      setFileName('Inbox');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let resumeUrl = '';
      
      // Upload resume if exists
      if (formData.resume) {
        const storageRef = ref(storage, `resumes/${formData.resume.name}-${Date.now()}`);
        await uploadBytes(storageRef, formData.resume);
        resumeUrl = await getDownloadURL(storageRef);
      }

      // Prepare application data
      const applicationData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        linkedin: formData.linkedin,
        github: formData.github,
        portfolio: formData.portfolio,
        resumeUrl, // Store the download URL
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add to Firestore
      const applicationsRef = collection(db, 'applications');
      await addDoc(applicationsRef, applicationData);

      setShowSuccessPopup(true);
      setFormData({
        name: '',
        email: '',
        role: '',
        linkedin: '',
        github: '',
        portfolio: '',
        resume: null
      });
      setFileName('Inbox');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your application');
      console.error('Error submitting application:', err);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
    setFormData({
      name: '',
      email: '',
      role: '',
      linkedin: '',
      github: '',
      portfolio: '',
      resume: null
    });
    setFileName('Inbox');
    onBack && onBack();
  };

  const uploadIconClick = () => {
    const input = document.getElementById('resume-input');
    if (input) input.click();
  };

  return (
    <div className="bg-white min-h-screen w-screen overflow-x-hidden font-nunito">
      <Header />
      <main className="max-w-4xl mx-auto px-4 pt-32 py-9 sm:px-6 lg:px-8">
        <h1 className="text-primary font-oswald font-black text-3xl sm:text-4xl md:text-5xl text-center mb-2 tracking-wide">
          Join Our Team
        </h1>
        <div className="text-base sm:text-lg text-dark text-center mb-8 font-nunito">
          Apply to your preferred available role and become part of our innovative team
        </div>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 max-w-3xl mx-auto border border-gray-200 mb-6">
          <div className="font-oswald font-bold text-xl text-primary mb-5 text-center">
            Basic Details
          </div>
          
          {/* Full Name */}
          <label className="block font-oswald font-medium text-base text-dark mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Enter your Full name"
            className="w-full mb-4 p-3 text-base rounded-lg border-none outline-none shadow-sm box-border font-nunito focus:ring-2 focus:ring-primary focus:border-transparent"
          />

          {/* Email Address */}
          <label className="block font-oswald font-medium text-base text-dark mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Enter your Email Address"
            className="w-full mb-4 p-3 text-base rounded-lg border-none outline-none shadow-sm box-border font-nunito focus:ring-2 focus:ring-primary focus:border-transparent"
          />

          {/* Interested Role with dropdown icon */}
          <label className="block font-oswald font-medium text-base text-dark mb-1">Interested Role</label>
          <div className="relative mb-4">
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              className="w-full p-3 text-base rounded-lg border-none outline-none shadow-sm box-border font-nunito text-dark appearance-none focus:ring-2 focus:ring-primary focus:border-transparent pr-10"
            >
              <option value="" disabled>Select your interested role</option>
              <option value="Software Engineer">Software Engineer</option>
              <option value="Frontend/Backend Developer">Frontend/Backend Developer</option>
              <option value="Coding Instructor">Coding Instructor</option>
              <option value="Business Development Lead">Business Development Lead</option>
              <option value="Digital Marketing Specialist">Digital Marketing Specialist</option>
              <option value="Robotics Engineer (Tutor)">Robotics Engineer (Tutor)</option>
              <option value="Video Editor">Video Editor</option>
            </select>
            <DropdownIcon />
          </div>

          {/* LinkedIn and Github - Side by Side */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block font-oswald font-medium text-base text-dark mb-1">LinkedIn profile (URL)</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="Enter your linkedin link"
                className="w-full p-3 text-base rounded-lg border-none outline-none shadow-sm box-border font-nunito focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex-1">
              <label className="block font-oswald font-medium text-base text-dark mb-1">Github link (URL)</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                placeholder="Enter your github link"
                className="w-full p-3 text-base rounded-lg border-none outline-none shadow-sm box-border font-nunito focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Portfolio */}
          <label className="block font-oswald font-medium text-base text-dark mb-1">Portfolio</label>
          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            placeholder="Enter your portfolio link"
            className="w-full mb-4 p-3 text-base rounded-lg border-none outline-none shadow-sm box-border font-nunito focus:ring-2 focus:ring-primary focus:border-transparent"
          />

          {/* Resume Upload */}
          <label className="block font-oswald font-medium text-base text-dark mb-1">Upload a Resume</label>
          <div onClick={uploadIconClick} className="mb-4 border-2 border-dashed border-primary rounded-lg shadow-sm p-4 text-center cursor-pointer relative w-full sm:w-64 inline-block font-nunito">
            <input
              id="resume-input"
              type="file"
              accept=".pdf,.png"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex justify-center items-center">
              <svg width="36" height="36" fill="none">
                <path d="M18 29V13M18 13l-5 5m5-5l5 5" stroke="#170961" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="4" y="4" width="28" height="28" rx="7" stroke="#170961" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="mt-2 text-dark font-medium text-sm font-nunito">
              Upload a Resume here (PNG/PDF)<br />
              <span className={`${formData.resume ? 'text-[#14A388]' : 'text-inherit'}`}>
                {fileName}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`bg-primary text-white border-none rounded-lg text-lg font-semibold py-3 shadow-md cursor-pointer w-full sm:w-52 mt-6 font-nunito hover:bg-primary-dark transition-colors duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>
      </main>

      {/* Success Popup */}
      {showSuccessPopup && (
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
              onClick={closePopup}
              className="mt-4 bg-[#14A388] text-white border-none px-8 py-3 rounded-lg font-medium text-base shadow-md cursor-pointer font-nunito"
            >Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationForm;