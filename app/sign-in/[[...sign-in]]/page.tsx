import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back!
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to your account and manage your cars effortlessly.
        </p>
        <SignIn
          appearance={{
            elements: {
              card: "shadow-none",
              formFieldInput:
                "w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none",
              formButtonPrimary:
                "w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition-transform transform hover:scale-105",
              formButtonSecondary:
                "text-indigo-600 underline text-sm hover:text-indigo-700",
              footer: "text-gray-500 mt-4",
            },
          }}
          path="/sign-in"
          signUpUrl="/sign-up"
          routing="path"
          forceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
