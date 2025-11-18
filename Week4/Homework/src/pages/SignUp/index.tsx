import * as styles from "./sign-up.css";

import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import iconBack from "@/assets/back.png";
import SignUpIdStep from "@/components/SignUp/SignUpIdStep";
import SignUpPasswordStep from "@/components/SignUp/SignUpPasswordStep";
import SignUpProfileStep from "@/components/SignUp/SignUpProfileStep";

const stepComponents = {
  1: SignUpIdStep,
  2: SignUpPasswordStep,
  3: SignUpProfileStep,
} as const;

type Step = keyof typeof stepComponents;

export default function SignUp() {
  const navigate = useNavigate();
  const { step } = useParams();
  const currentStep = Number(step) as Step;

  const CurrentStep = stepComponents[currentStep];

  const handleNextBtnClick = () => {
    const next = (currentStep + 1) as Step;
    navigate(`/sign-up/${next}`);
  };

  const handlePrevBtnClick = () => {
    if (currentStep === 1) {
      navigate("/login");
      return;
    }
    const prev = (currentStep - 1) as Step;
    navigate(`/sign-up/${prev}`);
  };
  return (
    <main className={styles.container}>
      <form className={styles.form}>
        <button className={styles.backButton} onClick={handlePrevBtnClick}>
          <img src={iconBack} alt="뒤로가기" width={20} height={20} />
        </button>

        <h1 className={styles.title}>회원가입</h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className={styles.step}
          >
            <CurrentStep onNext={handleNextBtnClick} />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          className={styles.loginLink}
          onClick={() => navigate("/login")}
        >
          이미 계정이 있나요? <strong>로그인</strong> 하러 가기
        </button>
      </form>
    </main>
  );
}
