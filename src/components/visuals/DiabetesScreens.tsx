/* HTML-recreated Diabetes Indicator screens (cash.app pattern: the phone
   frame never moves — the content inside slides per gesture). Buttons are
   decorative; Submit links to the live app. Values mirror the real product
   (92.65% confidence = live API response for the healthy-answer profile). */

const SCREENS = 4;

function Screen({ children }: { children: React.ReactNode }) {
  return <div className="dia-screen">{children}</div>;
}

export default function DiabetesScreens({ step }: { step: number }) {
  const clamped = Math.min(Math.max(step, 0), SCREENS - 1);
  return (
    <div className="dia-phone-screens" style={{ transform: `translateY(-${clamped * 100}%)` }}>
      <Screen>
        <p className="dia-title">Diabetes Indicator</p>
        <p className="dia-sub">
          Answer some questions to understand your risk of having diabetes.
        </p>
        <p className="dia-note">ML model · public Kaggle data</p>
        <span className="dia-btn dia-btn--primary">Start</span>
      </Screen>
      <Screen>
        <p className="dia-q">Do you have high blood pressure?</p>
        <div className="dia-choice">
          <span className="dia-btn">Yes</span>
          <span className="dia-btn dia-btn--primary">No</span>
        </div>
        <p className="dia-q">Do you have high cholesterol?</p>
        <div className="dia-choice">
          <span className="dia-btn">Yes</span>
          <span className="dia-btn dia-btn--primary">No</span>
        </div>
        <p className="dia-progress">Q 2/17</p>
      </Screen>
      <Screen>
        <p className="dia-q">Weight &amp; height</p>
        <div className="dia-field">
          <span>Weight</span>
          <span className="dia-input">70 kg</span>
        </div>
        <div className="dia-field">
          <span>Height</span>
          <span className="dia-input">175 cm</span>
        </div>
        <p className="dia-note">BMI 22.9 — calculated automatically</p>
        <p className="dia-progress">Q 17/17</p>
      </Screen>
      <Screen>
        <a
          className="dia-btn dia-btn--primary"
          href="https://kmads.dev/diabetes-indicator"
          target="_blank"
          rel="noreferrer noopener"
        >
          Submit
        </a>
        <p className="dia-result">
          ✅ You likely don&apos;t have diabetes
          <br />
          (92.65% confidence)
        </p>
        <p className="dia-note">/predict · FastAPI · scikit-learn</p>
      </Screen>
    </div>
  );
}
