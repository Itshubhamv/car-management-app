import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-400 via-teal-500 to-blue-600">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Join Us Today!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Create your account and explore the world of cars effortlessly.
        </p>
        <SignUp
          appearance={{
            elements: {
              card: "shadow-none",
              formFieldInput:
                "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none",
              formButtonPrimary:
                "w-full py-3 bg-teal-600 text-white rounded-lg font-semibold shadow-md hover:bg-teal-700 hover:shadow-lg transition-transform transform hover:scale-105",
              formButtonSecondary:
                "text-teal-600 underline text-sm hover:text-teal-700",
              footer: "text-gray-500 mt-4",
            },
          }}
          path="/sign-up"
          signInUrl="/sign-in"
          routing="path"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
