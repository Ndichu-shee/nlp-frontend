import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    // <div className="">

    <div className="flex w-full h-screen">
      <div className="bg-[#EE61BD] w-[30%] flex  flex-col items-center py-10">
        <div className="mb-5 ">
          <span className="border border-white rounded-lg text-white text-[40px] p-2">
            PinkCheck AI
          </span>
        </div>
        <div className="m-auto">
          <Image
            src="/images/bg-logo.png"
            alt="Hero Image"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div
        className="w-[70%] flex item-center "
        style={{
          backgroundImage: "url('/images/bg-image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="m-auto space-y-10 w-1/2">
          <h1 className="font-bold text-5xl">
            Breast Cancer Detection Made Simple
          </h1>
          <p className="font-normal text-2xl">
            Upload medical images and get an AI-based analysis to detect signs
            of breast cancer.
          </p>

          <button className="text-white px-8 py-4 text-[32px] bg-[#FF69B4] rounded-lg">
            <Link href={"/upload-image"} className="mt-5">
              Start Your Analysis
            </Link>
          </button>
        </div>
      </div>
    </div>

    // </div>
  );
};

export default Hero;
