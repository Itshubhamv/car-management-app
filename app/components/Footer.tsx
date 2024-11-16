import { Mail, Linkedin, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Personal Info */}
        <p className="text-sm text-center md:text-left mb-4 md:mb-0">
          Designed and Developed by <span className="font-bold">Shubham Verma</span>
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6">
          {/* Email */}
          <a
            href="mailto:itshubhamv@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <Mail className="h-6 w-6" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/shubham-verma-897396213/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <Linkedin className="h-6 w-6" />
          </a>

          {/* Resume */}
          <a
            href="https://drive.google.com/file/d/1mleKL0he_L_lVOdNlsxow6mBQ2Mr2-6e/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FileText className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
