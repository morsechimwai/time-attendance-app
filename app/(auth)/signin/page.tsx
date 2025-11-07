import { SignIn } from "@stackframe/stack"
import AuthDisclaimer from "@/app/legal/_components/auth-disclaimer"

export default function SignInPage() {
  return <SignIn fullPage={false} extraInfo={<AuthDisclaimer />} />
}
