'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import MapPicker without SSR
const MapPicker = dynamic(() => import('@/components/MapPicker'), {
  ssr: false,
  loading: () => (
    <div className="h-72 w-full rounded-2xl bg-slate-100/80 backdrop-blur-md animate-pulse flex items-center justify-center text-xs text-slate-500 border border-slate-200/60 shadow-inner">
      Loading Interactive Map...
    </div>
  ),
});

interface FormData {
  incidentType: string;
  locationCoords: { lat: number; lng: number } | null;
  date: string;
  time: string;
  description: string;
  species: string;
  phone: string;
  informantName: string;
  isAnonymous: boolean;
  files: File[];
}

export default function ReportPoachingPage() {
  const [formData, setFormData] = useState<FormData>({
    incidentType: 'active_poaching',
    locationCoords: null,
    date: '',
    time: '',
    description: '',
    species: '',
    phone: '',
    informantName: '',
    isAnonymous: true,
    files: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check if phone number must be required
  const isPhoneRequired = formData.files.length > 0;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrorMsg(null);
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, locationCoords: { lat, lng } }));
    setErrorMsg(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...selectedFiles],
      }));
    }
    setErrorMsg(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation 1: Require map location selection
    if (!formData.locationCoords) {
      setErrorMsg('Please select an incident location on the map.');
      return;
    }

    // Validation 2: Require phone number if evidence files are attached
    if (isPhoneRequired && !formData.phone.trim()) {
      setErrorMsg('A contact phone number is required whenever evidence files are attached.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('incidentType', formData.incidentType);
      payload.append('lat', String(formData.locationCoords.lat));
      payload.append('lng', String(formData.locationCoords.lng));
      payload.append('date', formData.date);
      payload.append('time', formData.time);
      payload.append('description', formData.description);
      payload.append('species', formData.species);
      payload.append('phone', formData.phone);
      payload.append('informantName', formData.informantName);
      payload.append('isAnonymous', String(formData.isAnonymous));

      formData.files.forEach((file) => {
        payload.append('files', file);
      });

      const response = await fetch('/api/reports', {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Failed to submit report');
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg('An error occurred while submitting your report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Section Card */}
        <div className="bg-white/70 backdrop-blur-md border border-white/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Confidential Wildlife Hotline
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Report Poaching or Wildlife Crime
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            Your report helps wildlife enforcement respond quickly. Pin the incident location directly on the map.
          </p>
        </div>

        {/* Global Error Banner */}
        {errorMsg && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 backdrop-blur-md rounded-xl text-sm text-red-700 font-medium shadow-sm">
            <strong>Action Required:</strong> {errorMsg}
          </div>
        )}

        {/* Success Alert */}
        {submitted ? (
          <div className="p-8 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 rounded-2xl text-center shadow-lg">
            <h2 className="text-2xl font-bold text-emerald-800 mb-2">
              Report Submitted Successfully
            </h2>
            <p className="text-slate-700 text-sm max-w-lg mx-auto">
              Thank you for taking action to protect wildlife. Your report and location data have been dispatched to anti-poaching teams.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  incidentType: 'active_poaching',
                  locationCoords: null,
                  date: '',
                  time: '',
                  description: '',
                  species: '',
                  phone: '',
                  informantName: '',
                  isAnonymous: true,
                  files: [],
                });
              }}
              className="mt-6 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition shadow-md"
            >
              Submit Another Report
            </button>
          </div>
        ) : (
          /* Main Form divided into Glassy Cards */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* SECTION 1: Incident Details */}
            <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-6 shadow-xl shadow-slate-200/40 space-y-6">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200/60 pb-3">
                1. Incident Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="incidentType" className="block text-xs font-bold uppercase text-slate-600 mb-2">
                    Incident Type *
                  </label>
                  <select
                    id="incidentType"
                    name="incidentType"
                    value={formData.incidentType}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-50/80 border border-slate-300/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                  >
                    <option value="active_poaching">Active Poaching / Trapping</option>
                    <option value="illegal_trade">Illegal Animal Trade / Sale</option>
                    <option value="suspicious_activity">Suspicious Activity in Reserve</option>
                    <option value="carcass_found">Wildlife Carcass Found</option>
                    <option value="other">Other Wildlife Crime</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="species" className="block text-xs font-bold uppercase text-slate-600 mb-2">
                    Targeted Species (If known)
                  </label>
                  <input
                    type="text"
                    id="species"
                    name="species"
                    placeholder="e.g., Rhinoceros, Tiger, Elephant"
                    value={formData.species}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-300/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-xs font-bold uppercase text-slate-600 mb-2">
                    Date Observed
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-300/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-xs font-bold uppercase text-slate-600 mb-2">
                    Approximate Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-300/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-xs font-bold uppercase text-slate-600 mb-2">
                  Incident Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  placeholder="Provide detailed information (number of individuals, vehicles, weapons, traps, direction of movement, etc.)."
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50/80 border border-slate-300/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                />
              </div>
            </div>

            {/* SECTION 2: Location Map */}
            <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-6 shadow-xl shadow-slate-200/40 space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200/60 pb-3">
                2. Pin Location
              </h2>

              <MapPicker onLocationSelect={handleLocationSelect} />
              
              {formData.locationCoords ? (
                <div className="p-3 bg-slate-100/80 border border-slate-200/80 rounded-xl text-xs text-slate-700 flex justify-between items-center shadow-inner">
                  <span className="font-medium">Selected Location:</span>
                  <span className="font-mono text-red-600 font-semibold">
                    {formData.locationCoords.lat.toFixed(5)}, {formData.locationCoords.lng.toFixed(5)}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-red-600 font-medium">
                  * Click on the map or click &quot;Use Current Location&quot; to pin the incident site.
                </p>
              )}
            </div>

            {/* SECTION 3: Evidence Upload */}
            <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-6 shadow-xl shadow-slate-200/40 space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200/60 pb-3">
                3. Upload Evidence
              </h2>

              <div>
                <label htmlFor="files" className="block text-xs font-bold uppercase text-slate-600 mb-2">
                  Photos / Video (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300/80 hover:border-slate-400/80 rounded-2xl p-6 bg-slate-50/50 text-center transition">
                  <input
                    type="file"
                    id="files"
                    name="files"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="files" className="cursor-pointer text-sm text-red-600 hover:text-red-700 font-bold">
                    Choose files
                  </label>
                  <span className="text-sm text-slate-500"> or drag & drop here</span>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG, MP4 up to 25MB total</p>

                  {formData.files.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-slate-200/80 text-left">
                      <p className="text-xs text-emerald-700 font-bold mb-1">
                        ✓ {formData.files.length} file(s) attached:
                      </p>
                      <ul className="text-xs text-slate-600 space-y-1">
                        {formData.files.map((file, i) => (
                          <li key={i}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 4: Contact & Verification */}
            <div className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-6 shadow-xl shadow-slate-200/40 space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200/60 pb-3">
                4. Informant Contact & Confidentiality
              </h2>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Phone Number {isPhoneRequired ? <span className="text-red-600 font-bold">* (Required when evidence is attached)</span> : '(Optional)'}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required={isPhoneRequired}
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full bg-slate-50/80 border rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 transition ${
                    isPhoneRequired && !formData.phone
                      ? 'border-red-400 focus:ring-red-500/20'
                      : 'border-slate-300/80 focus:border-red-500 focus:ring-red-500/20'
                  }`}
                />
                {isPhoneRequired && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ Required for evidence verification by wildlife officials.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isAnonymous"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500/20"
                />
                <label htmlFor="isAnonymous" className="text-sm text-slate-700 font-medium cursor-pointer">
                  Keep my full name anonymous
                </label>
              </div>

              {!formData.isAnonymous && (
                <div>
                  <label htmlFor="informantName" className="block text-xs font-bold uppercase text-slate-600 mb-2">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="informantName"
                    name="informantName"
                    value={formData.informantName}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50/80 border border-slate-300/80 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white font-bold rounded-2xl shadow-lg shadow-red-600/30 transition duration-150 flex items-center justify-center gap-2 text-base"
            >
              {isSubmitting ? (
                <span>Submitting Incident Report...</span>
              ) : (
                <span>Submit Confidential Report</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}