import * as styles from "./sign-up.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import iconBack from "@/assets/back-icon.png";
import SignUpIdStep from "@/components/SignUp/SignUpIdStep";
import SignUpPasswordStep from "@/components/SignUp/SignUpPasswordStep";
import SignUpProfileStep from "@/components/SignUp/SignUpProfileStep";
import Modal from "@/components/Modal/Modal";
import { postUserSignUp } from "@/apis/users/users.api";

const stepComponents = {
  1: SignUpIdStep,
  2: SignUpPasswordStep,
  3: SignUpProfileStep,
} as const;

type Step = keyof typeof stepComponents;

export interface SignUpFormData {
  memberId: string;
  password: string;
  confirmPassword: string;
  name: string;
  email: string;
  age: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const CurrentStep = stepComponents[currentStep];

  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    memberId: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    age: "",
  });

  const handleNextBtnClick = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as Step);
    }
  };

  const handlePrevBtnClick = () => {
    if (currentStep === 1) {
      navigate("/login");
      return;
    }
    setCurrentStep((prev) => (prev - 1) as Step);
  };

  const handleUserSignUp = async () => {
    setIsLoading(true);

    try {
      await postUserSignUp({
        username: signUpFormData.memberId,
        password: signUpFormData.password,
        name: signUpFormData.name,
        email: signUpFormData.email,
        age: parseInt(signUpFormData.age),
      });
      setModalMessage("회원가입이 완료되었습니다. \n 로그인 후 이용해 주세요.");
      setModalOpen(true);
    } catch (error) {
      console.error("회원가입 실패:", error);
      setModalMessage("회원가입에 실패했습니다. 다시 시도해 주세요.");
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getOnNextHandler = () => {
    if (currentStep === 3) {
      return handleUserSignUp;
    }
    return handleNextBtnClick;
  };

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handlePrevBtnClick}
          disabled={isLoading}
        >
          <img src={iconBack} alt="뒤로가기" width={20} height={20} />
        </button>

        <h1 className={styles.title}>회원가입</h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
            className={styles.step}
          >
            <CurrentStep
              onNext={getOnNextHandler()}
              signUpFormData={signUpFormData}
              setSignUpFormData={setSignUpFormData}
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          className={styles.loginLink}
          onClick={() => navigate("/login")}
          disabled={isLoading}
        >
          이미 계정이 있나요? <strong>로그인</strong> 하러 가기
        </button>
      </form>
      <Modal
        type="alert"
        message={modalMessage}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          navigate("/login");
        }}
      />
    </main>
  );
}
