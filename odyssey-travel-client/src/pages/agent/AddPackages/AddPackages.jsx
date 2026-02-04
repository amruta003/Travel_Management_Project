import React, { useState, useEffect } from 'react';
import api from "../../../api/axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddPackages() {
  const navigate = useNavigate();
  const [agentId, setAgentId] = useState(null);

  const [packageData, setPackageData] = useState({
    title: '',
    description: '',
    destination: '',
    price: '',
    startDate: '',
    endDate: '',
    maxTravelers: '',
  });

  const [itinerary, setItinerary] = useState(['']);

  const [images, setImages] = useState([]); // Store real File objects for backend
  const [imagesPreview, setImagesPreview] = useState([]); // For display only

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userObj = JSON.parse(savedUser);
      setAgentId(userObj.id);
    } else {
      toast.error("Please login as an agent");
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItineraryChange = (index, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index] = value;
    setItinerary(newItinerary);
  };

  const addNewDay = () => {
    setItinerary((prev) => [...prev, '']);
  };

  const removeDay = (index) => {
    setItinerary((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Store real files for upload
    setImages((prev) => [...prev, ...files]);

    // Generate previews
    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImagesPreview((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    // Revoke preview URL
    URL.revokeObjectURL(imagesPreview[index].url);

    // Remove from both preview and real files
    setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e, action = 'submit') => {
    if (e) e.preventDefault();

    if (!agentId) {
      toast.error("Agent ID not found");
      return;
    }

    // Calculate duration from start and end dates
    let duration = 1;
    if (packageData.startDate && packageData.endDate) {
      const start = new Date(packageData.startDate);
      const end = new Date(packageData.endDate);
      const diffTime = Math.abs(end - start);
      duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const packagePayload = {
      title: packageData.title,
      description: packageData.description,
      destination: packageData.destination,
      totalTravellers: parseInt(packageData.maxTravelers) || 0,
      price: parseFloat(packageData.price) || 0,
      duration: duration,
      agentId: agentId,
    };

    console.log(`Submitting as ${action}:`, packagePayload);

    if (!agentId) {
      toast.error("Critical Error: Agent session expired. Please relogin.");
      navigate("/login");
      return;
    }

    if (images.length === 0) {
      toast.warning("Please upload at least one image.");
      return;
    }

    const formData = new FormData();

    formData.append("data",
      new Blob([JSON.stringify(packagePayload)], {
        type: "application/json"
      }));
    formData.append("image", images[0]);

    try {
      const response = await api.post('/api/packages', formData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Package submitted! Pending admin approval.");
        navigate("/agent/dashboard");
      } else {
        toast.error("Failed to add package. Server responded with error.");
      }
    } catch (err) {
      console.error('Error submitting package:', err);
      toast.error(err.response?.data || "Error submitting package. Please check all fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-100">
      <div className="mx-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Add / Edit Package
        </h1>

        {/* Package Details */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-10 transition-all duration-150 hover:shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Package Details
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Package Title
              </label>
              <input
                type="text"
                name="title"
                value={packageData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30 outline-none transition-all duration-150"
                placeholder="Enter package title"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                value={packageData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30 outline-none transition-all duration-150 resize-y min-h-[120px]"
                placeholder="Describe the package..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={packageData.destination}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30 outline-none transition-all duration-150"
                placeholder="e.g. Manali, Himachal Pradesh"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (₹)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                  ₹
                </div>
                <input
                  type="text"
                  name="price"
                  value={packageData.price}
                  onChange={handleInputChange}
                  className="w-full pl-10 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30 outline-none transition-all duration-150"
                  placeholder="25000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={packageData.startDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30 outline-none transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={packageData.endDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30 outline-none transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Travelers
              </label>
              <input
                type="number"
                name="maxTravelers"
                min="1"
                value={packageData.maxTravelers}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30 outline-none transition-all duration-150"
                placeholder="20"
              />
            </div>
          </div>
        </div>

        {/* Images Upload */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-10 transition-all duration-150 hover:shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Package Images
          </h2>

          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-10 text-center transition-colors">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
              Drag & drop images here or click to upload
            </p>

            <label className="cursor-pointer inline-block">
              <span className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium rounded-xl shadow-sm hover:shadow transition-all duration-150">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Choose Files
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {imagesPreview.length > 0 && (
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {imagesPreview.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-150"
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-44 object-cover"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-150 transform hover:scale-110"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl border border-gray-200 dark:border-gray-700 p-6 md:p-8 mb-10 transition-all duration-150 hover:shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Itinerary
          </h2>

          <div className="space-y-5">
            {itinerary.map((day, index) => (
              <div
                key={index}
                className="flex items-start gap-5 bg-gray-50 dark:bg-gray-700/30 p-5 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-150"
              >
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-semibold text-lg shadow-sm">
                    {index + 1}
                  </span>
                </div>

                <div className="flex-1 flex items-center gap-3">
                  <textarea
                    value={day}
                    onChange={(e) => handleItineraryChange(index, e.target.value)}
                    rows={3}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:focus:border-indigo-400 dark:focus:ring-indigo-400/30 outline-none transition-all duration-150 resize-y min-h-[90px]"
                    placeholder="Describe day activities..."
                  />
                  <button
                    type="button"
                    onClick={() => removeDay(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-150"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addNewDay}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150"
          >
            + Add Day
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button
            type="button"
            className="px-8 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium transition-all duration-150"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-10 py-3.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-150"
            onClick={(e) => handleSubmit(e, 'submit')}
          >
            Submit for Approval
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPackages;