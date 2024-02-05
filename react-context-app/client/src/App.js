import { useState } from 'react';
import './App.css';
import OrderPage from './pages/OrderPage';
import SummaryPage from './pages/SummaryPage';
import CompletePage from './pages/CompletePage';

function App() {
  const [step, setStep] = useState(0);
  return (
    <div style={{padding: '4rem'}}>
      {/* step이 바뀔때마다 업데이트 해줘야하므로 setStep도 내려줘야함 */}
      {step === 0 && <OrderPage setStep={setStep} /> }
      {step === 1 && <SummaryPage setStep={setStep} /> }
      {step === 2 && <CompletePage setStep={setStep} /> }
    </div>
  );
}

export default App;
