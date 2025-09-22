import Image from "next/image";

const GoogleIcon = () => {
  return (
    <Image
      src="/svgs/google_icon.svg"
      alt="Google icon"
      height={20}
      width={20}
      className="object-contain"
    />
  );
};

export default GoogleIcon;
