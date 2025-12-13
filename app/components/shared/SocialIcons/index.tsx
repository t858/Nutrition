import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import type { TSocialIconsProps } from "./@types";

export default function SocialIcons({
  facebook,
  instagram,
  twitter,
  linkedin,
}: TSocialIconsProps) {
  return (
    <div className="flex items-center gap-4">
      <Link
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#8CC63F] hover:bg-emerald-700 rounded-lg flex items-center justify-center text-white transition-colors"
      >
        <FaFacebookF className="w-6 h-6 text-white" />
      </Link>
      <Link
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#8CC63F] hover:bg-emerald-700 rounded-lg flex items-center justify-center text-white transition-colors"
      >
        <FaInstagram className="w-6 h-6 text-white" />
      </Link>
      <Link
        href={twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#8CC63F] hover:bg-emerald-700 rounded-lg flex items-center justify-center text-white transition-colors"
      >
        <FaXTwitter className="w-6 h-6 text-white" />
      </Link>
      <Link
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#8CC63F] hover:bg-emerald-700 rounded-lg flex items-center justify-center text-white transition-colors"
      >
        <FaLinkedinIn className="w-6 h-6 text-white" />
      </Link>
    </div>
  );
}
