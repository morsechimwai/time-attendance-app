import { SignUp } from "@stackframe/stack"
import AuthDisclaimer from "../../legal/_components/auth-disclaimer"

export default function SignUpPage() {
  return <SignUp fullPage={false} extraInfo={<AuthDisclaimer />} />
}
