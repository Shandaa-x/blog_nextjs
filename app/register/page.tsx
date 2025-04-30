// app/register/page.tsx
import dynamic from "next/dynamic";

export const metadata = {
  title: "Бүртгүүлэх",
};

const RegisterPageView = dynamic(() => import("./RegisterPage"), {
  ssr: false, // ✅ disables server-side rendering for this component
});

export default function Register() {
  return <RegisterPageView />;
}
