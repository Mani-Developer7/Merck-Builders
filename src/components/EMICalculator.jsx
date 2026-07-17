import { useMemo, useState } from 'react';

const EMICalculator = ({ defaultPrice = 5000000 }) => {
  const [price, setPrice] = useState(defaultPrice);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [rate, setRate] = useState(18);
  const [years, setYears] = useState(10);

  const { emi, principal, totalPayment, totalInterest } = useMemo(() => {
    const downPayment = (price * downPaymentPct) / 100;
    const principal = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const emi =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;
    return { emi, principal, totalPayment, totalInterest };
  }, [price, downPaymentPct, rate, years]);

  const fmt = (n) =>
    'PKR ' + Math.round(n).toLocaleString('en-PK');

  return (
    <div className="bg-ink-2 border border-brass/20 rounded-2xl p-6 md:p-8">
      <h3 className="font-display text-2xl text-stone mb-1">EMI &amp; Cost Calculator</h3>
      <p className="text-sm text-stone/60 mb-6">Estimate your monthly installment. Figures are indicative only.</p>

      <div className="grid gap-5">
        <Field label="Property Price" value={price} setValue={setPrice} min={500000} max={100000000} step={100000} format={fmt} />
        <Field label="Down Payment" value={downPaymentPct} setValue={setDownPaymentPct} min={0} max={90} step={1} format={(v) => `${v}%`} />
        <Field label="Interest Rate (annual)" value={rate} setValue={setRate} min={1} max={30} step={0.5} format={(v) => `${v}%`} />
        <Field label="Loan Tenure" value={years} setValue={setYears} min={1} max={25} step={1} format={(v) => `${v} yrs`} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-brass/10 pt-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone/50">Monthly Installment</div>
          <div className="font-mono text-2xl text-brass mt-1">{fmt(emi)}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-stone/50">Loan Principal</div>
          <div className="font-mono text-xl text-stone mt-1">{fmt(principal)}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-stone/50">Total Interest</div>
          <div className="font-mono text-xl text-stone mt-1">{fmt(totalInterest)}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-stone/50">Total Payment</div>
          <div className="font-mono text-xl text-stone mt-1">{fmt(totalPayment)}</div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value, setValue, min, max, step, format }) => (
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="text-stone/70">{label}</span>
      <span className="font-mono text-brass">{format(value)}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full accent-brass"
    />
  </div>
);

export default EMICalculator;
