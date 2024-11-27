import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";
import { predict } from "@/app/utils/predict";

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
      const pluralKey =
        type === "Mammogram"
          ? "mammograms"
          : type === "Ultrasound"
          ? "ultrasounds"
          : "cells";
      files[type].forEach((file) => {
        formData.append(pluralKey, file);
      });
    });

    try {
      const response = await predict(formData);

      setPredictions(response.predictions);
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
    return selectedTypes.includes(type) ? "bg-pink-100" : "bg-gray-200";
  };

  return (
    <div className="px-10 py-16 w-[70%] border-2 border-[#000000] mx-auto rounded-xl space-y-16 mt-8">
      <h2 className="text-[32px] font-normal text-center mb-6">
        Select the type of image you are uploading
      </h2>

      <div className="flex flex-wrap justify-between gap-4">
        {/* Mammogram */}
        <div
          className={`w-[25%] flex flex-col space-y-4 ${getBackgroundColor(
            "Mammogram"
          )} p-4 rounded-lg`}
        >
          <div className="p-8 rounded-lg border-2 border-dashed border-pink-300 cursor-pointer">
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
        <div
          className={`w-[25%] flex flex-col space-y-4 ${getBackgroundColor(
            "Ultrasound"
          )} p-4 rounded-lg`}
        >
          <div className="p-8 rounded-lg border-2 border-dashed border-pink-300 cursor-pointer">
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
        <div
          className={`w-[25%] flex flex-col space-y-4 ${getBackgroundColor(
            "Cells"
          )} p-4 rounded-lg`}
        >
          <div className="p-8 rounded-lg border-2 border-dashed border-pink-300 cursor-pointer">
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

      <div className="text-center mt-6">
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

        {predictions && (
          <>
            <h2 className="font-900 text-4xl my-2">Results</h2>
            <div className="flex gap-2 mt-5">
              {predictions &&
                Object.entries(predictions).map(
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  ([type, details]: [string, any]) => (
                    <div
                      key={type}
                      className="border border-gray-300 rounded-lg p-4 w-1/3"
                    >
                      <h3 className="text-lg font-semibold capitalize">
                        {type}
                      </h3>
                      <p>
                        {details.class_prediction === "Positive"
                          ? `The prediction indicates the presence of breast cancer with a confidence of ${(
                              details.confidence * 100
                            ).toFixed(
                              2
                            )}%. Further clinical evaluation is recommended.`
                          : `The prediction indicates no signs of breast cancer with a confidence of ${(
                              details.confidence * 100
                            ).toFixed(2)}%. Regular monitoring is advised.`}
                      </p>
                    </div>
                  )
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
