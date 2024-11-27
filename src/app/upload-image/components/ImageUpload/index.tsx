import React, { useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const ImageUpload = () => {
  const [files, setFiles] = useState<{ [key: string]: File[] }>({
    Mammogram: [],
    Ultrasound: [],
    Biopsy: [],
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files) {
      const updatedFiles = { ...files };
      updatedFiles[type] = Array.from(e.target.files);
      setFiles(updatedFiles);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
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
      files[type].forEach((file, index) => {
        formData.append(`${type.toLowerCase()}[${index}]`, file);
      });
    });

    try {
      const response = await fetch("https://webhook.site/6e8f5779-41bf-4f60-9b1c-169099a54481", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload the files.");
      }

      const result = await response.json();
      console.log(result);
      alert("Analysis completed. Check console for results.");
    } catch (error) {
      console.error(error);
      alert("Failed to analyze the images.");
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
        <div className={`w-[25%] flex flex-col space-y-4 ${getBackgroundColor("Mammogram")} p-4 rounded-lg`}>
          <div className="p-8 rounded-lg border-2 border-dashed border-pink-300 cursor-pointer">
            <label
              htmlFor="mammogram"
              className="text-center text-sm font-medium flex flex-col space-y-4"
            >
              <MdOutlineCloudUpload className="mx-auto text-4xl mb-2 text-[#1849D6]" />
              <span className="text-[#1849D6]">{renderSelectedFiles("Mammogram")}</span>
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
        <div className={`w-[25%] flex flex-col space-y-4 ${getBackgroundColor("Ultrasound")} p-4 rounded-lg`}>
          <div className="p-8 rounded-lg border-2 border-dashed border-pink-300 cursor-pointer">
            <label
              htmlFor="ultrasound"
              className="text-center text-sm font-medium flex flex-col space-y-4"
            >
              <MdOutlineCloudUpload className="mx-auto text-4xl mb-2 text-[#1849D6]" />
              <span className="text-[#1849D6]">{renderSelectedFiles("Ultrasound")}</span>
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

        {/* Biopsy */}
        <div className={`w-[25%] flex flex-col space-y-4 ${getBackgroundColor("Biopsy")} p-4 rounded-lg`}>
          <div className="p-8 rounded-lg border-2 border-dashed border-pink-300 cursor-pointer">
            <label
              htmlFor="biopsy"
              className="text-center text-sm font-medium flex flex-col space-y-4"
            >
              <MdOutlineCloudUpload className="mx-auto text-4xl mb-2 text-[#1849D6]" />
              <span className="text-[#1849D6]">{renderSelectedFiles("Biopsy")}</span>
              <span className="text-[#6D6D6D] font-normal">
                Max 10 MB files are allowed
              </span>
            </label>
            <input
              type="file"
              id="biopsy"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileChange(e, "Biopsy")}
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="Biopsy"
              id="biopsyCheckbox"
              checked={selectedTypes.includes("Biopsy")}
              onChange={handleCheckboxChange}
              className="h-5 w-5"
            />
            <label htmlFor="biopsyCheckbox" className="text-lg">
              Biopsy
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
      </div>
    </div>
  );
};

export default ImageUpload;
