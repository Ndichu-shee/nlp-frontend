import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { predict } from "@/app/utils/predict";
import Image from "next/image";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

const ImageUpload = () => {
  const [files, setFiles] = useState<{ [key: string]: File[] }>({
    Mammogram: [],
    Ultrasound: [],
    Cells: [],
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [predictions, setPredictions] = useState<any>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (e.target.files) {
      const updatedFiles = { ...files };
      updatedFiles[type] = Array.from(e.target.files);
      setFiles(updatedFiles);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    if (!selectedTypes.length) {
      alert("Please select at least one image type and corresponding files.");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    selectedTypes.forEach((type) => {
      let pluralKey;
      if (type === "Mammogram") {
        pluralKey = "mammograms";
      } else if (type === "Ultrasound") {
        pluralKey = "ultrasounds";
      } else {
        pluralKey = "cells";
      }
      files[type].forEach((file) => {
        formData.append(pluralKey, file);
      });
    });

    try {
      const response = await predict(formData);

      setPredictions(response.predictions);
      setIsModalOpen(true);
      console.log(response);
    } catch (error) {
      console.error(error);
      //   alert("Failed to analyze the images.");
    } finally {
      setLoading(false);
    }
  };

  const renderSelectedFiles = (type: string) => {
    if (!files[type]?.length) {
      return "Drag your file(s) or browse";
    }
    return files[type].map((file) => file.name).join(", ");
  };

  const getBackgroundColor = (type: string) => {
    return selectedTypes.includes(type)
      ? "bg-pink-100 border-pink-300"
      : "bg-gray-200 border-gray-300";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPredictions(null); // Reset predictions when modal is closed
    setFiles({ Mammogram: [], Ultrasound: [], Cells: [] }); // Reset file inputs
    setSelectedTypes([]); // Reset checkboxes
  };

  return (
    <div className="px-10 py-16 w-[70%] border-2 border-[#000000] mx-auto rounded-xl space-y-10 mt-8">
      <h2 className="text-[32px] font-normal text-center mb-6">
        Select the type of image you are uploading
      </h2>

      <div className="flex flex-wrap justify-between gap-4">
        {/* Mammogram */}
        <div className="p-4 rounded-lg w-[25%] flex flex-col space-y-4 ">
          <div
            className={`p-8 rounded-lg border-2 border-dashed  cursor-pointer ${getBackgroundColor(
              "Mammogram"
            )}`}
          >
            <label
              htmlFor="mammogram"
              className="text-center text-sm font-medium flex flex-col space-y-4"
            >
              <MdOutlineCloudUpload className="mx-auto text-4xl mb-2 text-[#1849D6]" />
              <span className="text-[#1849D6]">
                {renderSelectedFiles("Mammogram")}
              </span>
              <span className="text-[#6D6D6D] font-normal">
                Max 10 MB files are allowed
              </span>
            </label>
            <input
              type="file"
              id="mammogram"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e, "Mammogram")}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Mammogram"
              id="mammogramCheckbox"
              checked={selectedTypes.includes("Mammogram")}
              onChange={handleCheckboxChange}
              className="h-5 w-5"
            />
            <label htmlFor="mammogramCheckbox" className="text-lg">
              Mammogram
            </label>
          </div>
        </div>

        {/* Ultrasound */}
        <div className="w-[25%] flex flex-col space-y-4  p-4 rounded-lg">
          <div
            className={`p-8 rounded-lg border-2 border-dashed cursor-pointer ${getBackgroundColor(
              "Ultrasound"
            )} `}
          >
            <label
              htmlFor="ultrasound"
              className="text-center text-sm font-medium flex flex-col space-y-4"
            >
              <MdOutlineCloudUpload className="mx-auto text-4xl mb-2 text-[#1849D6]" />
              <span className="text-[#1849D6]">
                {renderSelectedFiles("Ultrasound")}
              </span>
              <span className="text-[#6D6D6D] font-normal">
                Max 10 MB files are allowed
              </span>
            </label>
            <input
              type="file"
              id="ultrasound"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e, "Ultrasound")}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Ultrasound"
              id="ultrasoundCheckbox"
              checked={selectedTypes.includes("Ultrasound")}
              onChange={handleCheckboxChange}
              className="h-5 w-5"
            />
            <label htmlFor="ultrasoundCheckbox" className="text-lg">
              Ultrasound
            </label>
          </div>
        </div>

        {/* Cells */}
        <div className="w-[25%] flex flex-col space-y-4  p-4 rounded-lg">
          <div
            className={`p-8 rounded-lg border-2 border-dashed cursor-pointer ${getBackgroundColor(
              "Cells"
            )}`}
          >
            <label
              htmlFor="cells"
              className="text-center text-sm font-medium flex flex-col space-y-4"
            >
              <MdOutlineCloudUpload className="mx-auto text-4xl mb-2 text-[#1849D6]" />
              <span className="text-[#1849D6]">
                {renderSelectedFiles("Cells")}
              </span>
              <span className="text-[#6D6D6D] font-normal">
                Max 10 MB files are allowed
              </span>
            </label>
            <input
              type="file"
              id="cells"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e, "Cells")}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Cells"
              id="cellsCheckbox"
              checked={selectedTypes.includes("Cells")}
              onChange={handleCheckboxChange}
              className="h-5 w-5"
            />
            <label htmlFor="cellsCheckbox" className="text-lg">
              Cells
            </label>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          className={`${
            loading ? "bg-gray-400" : "bg-[#FF69B4]"
          } text-white font-semibold py-3 px-6 rounded-lg text-2xl w-full cursor-pointer`}
          type="button"
          disabled={!selectedTypes.length || loading}
          onClick={handleSubmit}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Modal for displaying predictions */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg w-[40%] p-8 relative">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-500"
                onClick={closeModal}
              >
                ✖
              </button>

              <div className="flex item-center justify-center">
                <Image
                  src="/images/modal-bg.png"
                  width={250}
                  height={250}
                  alt="modal"
                />
              </div>

              {/* Modal Title */}
              <h2 className="text-2xl font-bold my-8 text-center">
                Prediction Results
              </h2>

              {/* Accordion for predictions */}
              <div className="space-y-4">
                {Object.entries(predictions).map(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ([type, details]: [string, any]) => (
                    <div key={type} className=" rounded-lg">
                      {/* Accordion Header */}
                      <button
                        className="w-full px-4 py-2 text-left font-semibold text-lg bg-pink-100 hover:bg-pink-200 capitalize flex justify-between items-center border-none rounded text-gray-600 focus:outline-none"
                        onClick={
                          () =>
                            setExpandedAccordion((prev) =>
                              prev === type ? null : type
                            ) /* Toggle accordion */
                        }
                      >
                        {type} {/* Accordion title */}
                        {expandedAccordion === type ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                        {/* <FaChevronRight /> */}
                      </button>

                      {/* Accordion Content */}
                      {expandedAccordion === type && (
                        <div className="px-4 py-2 bg-gray-50 text-left">
                          <p>
                            {details.class_prediction === "Positive"
                              ? `With a ${(details.confidence * 100).toFixed(
                                  2
                                )}% confidence level, the analysis points to the presence of breast cancer. Immediate follow-up with a clinical evaluation is advised to ensure timely diagnosis and intervention.`
                              : `The results indicate no evidence of breast cancer with a ${(
                                  details.confidence * 100
                                ).toFixed(
                                  2
                                )}% confidence level. Continued screening and follow-up is still recommended to maintain patient health.`}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              <button
                onClick={closeModal}
                className="text-white bg-[#FF69B4] px-10 py-2 rounded-lg mt-5"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
