import { SignIn } from "@stackframe/stack"
import AuthDisclaimer from "../../legal/_components/auth-disclaimer"

export default function SignInPage() {
  return <SignIn fullPage={false} extraInfo={<AuthDisclaimer />} />
}
