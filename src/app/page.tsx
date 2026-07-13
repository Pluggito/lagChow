"use client";

import { useState } from "react";

type QuestionType = 'radio' | 'checkbox' | 'text' | 'form';

interface Question {
  id: string;
  section: string;
  title: string;
  type: QuestionType;
  options?: string[];
  note?: string;
  htmlNote?: React.ReactNode;
  max?: number;
  optional?: boolean;
}

const questions: Question[] = [
  // Original Q1-Q12
  { id: 'q1', section: 'Section 1 — About You', title: '1. Where do you stay?', type: 'radio', options: ['New Hall', 'Moremi', 'Mariere', "Elkanemi", "Gbajabiamila", 'Jaja', 'Biobaku', 'Fagunwa', 'Kofo', "Amina", 'Women Society', 'Off-campus (Akoka)', 'Off-campus (Yaba)', 'Other'] },
  { id: 'q2', section: 'Section 1 — About You', title: '2. How many times do you buy food in a typical week?', type: 'radio', options: ['1–2', '3–5', '6–10', 'More than 10'] },
  { id: 'q3', section: 'Section 1 — About You', title: '3. What\'s your usual budget for one meal?', note: '(This question is extremely important for your pricing.)', type: 'radio', options: ['Under ₦1,500', '₦1,500–₦2,500', '₦2,500–₦4,000', 'Above ₦4,000'] },
  
  // Section 2 starts
  { id: 'q4', section: 'Section 2 — Current Experience', title: '4. List your top 3 favorite food vendors in UNILAG.', type: 'text' },
  { id: 'q5', section: 'Section 2 — Current Experience', title: '5. Which of these frustrates you the most when buying food?', note: '(Choose up to 3)', type: 'checkbox', max: 3, options: ['Long queues', 'Walking to vendors', 'Food takes too long to prepare', 'Delivery fee', 'Service fee', 'Riders lying about arrival', 'Wrong orders', 'Food quality', 'Vendor customer service', 'Crowded vendors'] },
  { id: 'q6', section: 'Section 2 — Current Experience', title: '6. How often do you experience long queues?', type: 'radio', options: ['Never', 'Sometimes', 'Often', 'Almost every time'] },
  { id: 'q7', section: 'Section 2 — Current Experience', title: '7. Have you ever done any of these?', note: '(Select all that apply.)', type: 'checkbox', options: ['Sent a friend to buy food', 'Asked a roommate', 'Used Chowdeck', 'Used Glovo', 'Used Swoop', 'Decided not to buy because of the queue', 'Walked away because delivery was too expensive'] },
  
  // Section 3 starts
  { id: 'q8', section: 'Section 3 — What Would Make You Switch?', title: '8. If your favorite vendor was available on LagChow, would you try it?', type: 'radio', options: ['Definitely', 'Probably', 'Maybe', 'No'] },
  { id: 'q9', section: 'Section 3 — What Would Make You Switch?', title: '9. Which features would make you choose LagChow?', note: '(Pick your top 3.)', type: 'checkbox', max: 3, options: ['Lower service fees', 'Faster delivery', 'Verified student trekkers', 'Real-time queue status', 'Accurate delivery tracking', 'Better customer support', 'Vendor ratings', 'Daily food quality reviews', 'More trusted vendors', 'Student discounts'] },
  { id: 'q10', section: 'Section 3 — What Would Make You Switch?', title: '10. Imagine you\'re ordering food worth ₦2,000. How much would you comfortably pay for convenience (delivery + service fee)?', note: '(This is one of the most valuable questions for pricing.)', type: 'radio', options: ['₦300', '₦400', '₦500', '₦600+', 'I wouldn\'t pay extra'] },
  { 
    id: 'q11', 
    section: 'Section 3 — What Would Make You Switch?', 
    title: '11. Would seeing this before ordering change your decision?', 
    htmlNote: (
      <div className="flex items-center gap-3 my-5 p-4 bg-black/40 rounded-xl border border-white/10">
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span> Available</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span> Busy</div>
          <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span> Rush Hour</div>
        </div>
        <div className="ml-auto text-xs text-gray-400 text-right">Estimated<br/>preparation time</div>
      </div>
    ), 
    type: 'radio', 
    options: ['Definitely', 'Maybe', 'No'] 
  },
  { id: 'q12', section: 'Section 3 — What Would Make You Switch?', title: '12. Would you trust a verified UNILAG student trekker to deliver your food?', type: 'radio', options: ['Yes', 'Maybe', 'No'] },
  { id: 'q13', section: 'Section 3 — What Would Make You Switch?', title: '13. What\'s the ONE thing LagChow must get right for you to use it?', note: '(Short answer)', type: 'text' },
  
  // New Earning Questions
  { id: 'q14', section: 'Interested in Earning with LagChow?', title: '14. Would you be interested in earning money by delivering food around campus between classes?', type: 'radio', options: ['Definitely', 'Maybe', 'No'] },
  { id: 'q15', section: 'Interested in Earning with LagChow?', title: '15. How many hours per day could you realistically deliver food?', type: 'radio', options: ['Less than 1 hour', '1–2 hours', '2–4 hours', 'More than 4 hours'] },
  { id: 'q16', section: 'Interested in Earning with LagChow?', title: '16. Which times are you usually free?', note: '(Select all that apply.)', type: 'checkbox', options: ['8am–11am', '11am–2pm', '2pm–5pm', '5pm–8pm', '8pm–11pm'] },
  { id: 'q17', section: 'Interested in Earning with LagChow?', title: '17. Which delivery method would you prefer?', type: 'radio', options: ['Walking (Trekker)', 'Bicycle', 'Motorcycle', 'Either'] },
  { id: 'q18', section: 'Interested in Earning with LagChow?', title: '18. What would motivate you to become a LagChow delivery partner?', type: 'checkbox', options: ['Extra income', 'Flexible schedule', 'Walking around campus anyway', 'Meeting people', 'Other (Please specify)'] },
  { id: 'q19', section: 'Interested in Earning with LagChow?', title: '19. How much would you expect to earn per successful delivery?', note: 'This question is important because it tells you whether your proposed payout is attractive enough.', type: 'radio', options: ['₦250–₦300', '₦300–₦350', '₦350–₦400'] },
  { id: 'q20', section: 'Interested in Earning with LagChow?', title: '20. Would you be willing to wear a LagChow vest or branded T-shirt while delivering?', note: 'This validates our branding idea.', type: 'radio', options: ['Yes', 'Maybe', 'No'] },
  { id: 'q21', section: 'Interested in Earning with LagChow?', title: '21. If you\'re interested in becoming a delivery partner, leave your WhatsApp number.', note: '(Optional)', type: 'text', optional: true },
  
  // Final Form
  { id: 'final', section: 'Join the Waitlist', title: 'Almost there! Where should we send your invite?', type: 'form' }
];

export default function WaitlistPage() {
  const [step, setStep] = useState<"intro" | "survey" | "success">("intro");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otherText, setOtherText] = useState("");

  const q = questions[currentStepIndex];

  const handleStart = () => {
    setStep("survey");
  };

  const handleNext = async () => {
    if (currentStepIndex < questions.length - 1) {
      if (q.id === 'q18' && answers['q18']?.includes('Other (Please specify)')) {
          const newQ18 = answers['q18'].filter((a: string) => a !== 'Other (Please specify)');
          if (otherText.trim()) newQ18.push(`Other: ${otherText.trim()}`);
          setAnswers({ ...answers, q18: newQ18 });
      }

      if (q.id === 'q14' && answers['q14'] === 'No') {
        setCurrentStepIndex(questions.length - 1);
      } else {
        setCurrentStepIndex(prev => prev + 1);
      }
    } else {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(answers),
        });
        if (!res.ok) throw new Error("Submission failed");
        setStep("success");
      } catch (err) {
        console.error(err);
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      if (currentStepIndex === questions.length - 1 && answers['q14'] === 'No') {
        const q14Index = questions.findIndex(question => question.id === 'q14');
        setCurrentStepIndex(q14Index);
      } else {
        setCurrentStepIndex(prev => prev - 1);
      }
    }
  };

  const handleInput = (val: string) => {
    if (q.type === 'radio') {
      setAnswers({ ...answers, [q.id]: val });
      setTimeout(() => {
        const nextBtn = document.getElementById("next-btn");
        if (nextBtn && !nextBtn.hasAttribute("disabled")) {
          nextBtn.click();
        }
      }, 350);
    } else if (q.type === 'checkbox') {
      const current = (answers[q.id] as string[]) || [];
      if (current.includes(val)) {
        setAnswers({ ...answers, [q.id]: current.filter(item => item !== val) });
      } else {
        const newArray = [...current];
        if (q.max && newArray.length >= q.max) {
          newArray.shift();
        }
        newArray.push(val);
        setAnswers({ ...answers, [q.id]: newArray });
      }
    }
  };

  const handleText = (val: string) => {
    setAnswers({ ...answers, [q.id]: val });
  };

  const handleForm = (field: string, val: string) => {
    setAnswers({ ...answers, [field]: val });
  };

  let isNextDisabled = true;
  if (step === 'survey' && q) {
    if (q.optional) {
      isNextDisabled = false;
    } else if (q.type === 'radio') {
      isNextDisabled = !answers[q.id];
    } else if (q.type === 'checkbox') {
      const arr = answers[q.id];
      isNextDisabled = !arr || arr.length === 0;
      if (!isNextDisabled && q.id === 'q18' && arr.includes('Other (Please specify)')) {
         isNextDisabled = otherText.trim().length === 0;
      }
    } else if (q.type === 'text') {
      isNextDisabled = !answers[q.id] || answers[q.id].trim().length === 0;
    } else if (q.type === 'form') {
      const name = answers['name'];
      const email = answers['email'];
      isNextDisabled = !name || name.trim().length === 0 || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }

  const progressPercent = (currentStepIndex / (questions.length - 1)) * 100;

  return (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px]"></div>

      <main className="w-full max-w-lg mx-auto z-10 flex flex-col items-center animate-fade-in-up">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)]">
            <i className="ph-fill ph-hamburger text-2xl text-black"></i>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">LagChow</h1>
        </div>

        {(step === "intro" || step === "success") && (
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Coming soon to Unilag
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Campus food delivery, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-200">redefined.</span>
            </h2>
            <p className="text-lg text-muted max-w-md mx-auto">
              Skip the queues and stressful walks. Get your favorite meals from the best spots in and around campus delivered straight to your hostel or faculty.
            </p>
          </div>
        )}

        <div className="w-full glass-card p-6 md:p-8 rounded-3xl shadow-2xl relative transition-all duration-300 hover:border-white/10 min-h-[480px] flex flex-col">
          
          {step === "intro" && (
            <div className="flex-1 flex flex-col items-center justify-center py-6 text-center animate-fade-in-up">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 border border-accent/30 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
                <i className="ph-fill ph-clipboard-text text-4xl text-accent"></i>
              </div>
              <h3 className="text-2xl font-bold mb-3">LagChow Student Survey</h3>
              <p className="text-muted mb-8 max-w-sm">What is your Unilag experience with food?</p>
              <button 
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-3.5 bg-accent text-black font-bold text-lg rounded-xl hover:bg-yellow-400 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                Start Survey
              </button>
            </div>
          )}

          {step === "survey" && q && (
            <div className="relative w-full flex-1 flex flex-col animate-fade-in-up">
              <div className="w-full bg-white/10 h-1.5 rounded-full mb-6 mt-2">
                <div className="bg-accent h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="mb-4">
                  <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">{q.section}</p>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">{q.title}</h3>
                  {q.note && <p className="text-muted text-sm mt-2">{q.note}</p>}
                </div>
                {q.htmlNote}

                {(q.type === 'radio' || q.type === 'checkbox') && (
                  <div className="space-y-2.5 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
                    {q.options?.map((opt, idx) => {
                      const isChecked = Array.isArray(answers[q.id]) ? answers[q.id].includes(opt) : answers[q.id] === opt;
                      return (
                        <div key={idx}>
                          <label className={`flex items-center p-3.5 border rounded-xl cursor-pointer hover:bg-white/5 transition-all ${isChecked ? 'border-accent bg-accent/10' : 'border-white/10 bg-black/30'}`}>
                            <input 
                              type={q.type} 
                              name={q.id} 
                              value={opt} 
                              className="hidden" 
                              checked={isChecked}
                              onChange={() => handleInput(opt)}
                            />
                            <div className={`w-5 h-5 flex-shrink-0 border-2 flex items-center justify-center mr-3 transition-colors ${q.type === 'radio' ? 'rounded-full' : 'rounded-md'} ${isChecked ? 'border-accent bg-accent' : 'border-gray-500'}`}>
                              {q.type === 'radio' && isChecked && <div className="w-2 h-2 bg-black rounded-full"></div>}
                              {q.type === 'checkbox' && <i className={`ph-bold ph-check text-black text-xs ${isChecked ? 'opacity-100' : 'opacity-0'}`}></i>}
                            </div>
                            <span className={`text-sm sm:text-base ${isChecked ? 'text-white font-medium' : 'text-gray-300'}`}>{opt}</span>
                          </label>
                          
                          {/* Render text input if 'Other (Please specify)' is selected in Q18 */}
                          {q.id === 'q18' && opt === 'Other (Please specify)' && isChecked && (
                            <div className="mt-3 ml-2 animate-fade-in-up">
                               <input 
                                  type="text" 
                                  placeholder="Type your motivation here..."
                                  value={otherText}
                                  onChange={(e) => setOtherText(e.target.value)}
                                  className="w-full h-12 px-4 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all text-sm"
                                  autoFocus
                               />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {q.type === 'text' && (
                  <textarea 
                    rows={4} 
                    className="w-full p-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none transition-all" 
                    placeholder="Type your answer here..." 
                    value={answers[q.id] || ''}
                    onChange={(e) => handleText(e.target.value)}
                  />
                )}

                {q.type === 'form' && (
                  <div className="space-y-4 w-full mt-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                      <div className="relative flex items-center">
                        <i className="ph ph-user absolute left-4 text-xl text-gray-400"></i>
                        <input type="text" value={answers['name'] || ''} onChange={(e) => handleForm('name', e.target.value)} placeholder="John Doe" className="w-full h-14 pl-11 pr-4 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                      <div className="relative flex items-center">
                        <i className="ph ph-envelope-simple absolute left-4 text-xl text-gray-400"></i>
                        <input type="email" value={answers['email'] || ''} onChange={(e) => handleForm('email', e.target.value)} placeholder="hello@example.com" className="w-full h-14 pl-11 pr-4 bg-black/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-8 pt-4 border-t border-white/5">
                <button 
                  onClick={handlePrev}
                  className={`px-4 py-2 rounded-xl text-white hover:bg-white/10 transition-colors flex items-center gap-2 ${currentStepIndex === 0 ? 'invisible' : ''}`}
                >
                  <i className="ph-bold ph-arrow-left"></i> Back
                </button>
                <button 
                  id="next-btn"
                  onClick={handleNext}
                  disabled={isNextDisabled || isSubmitting}
                  className={`ml-auto px-6 py-2.5 font-bold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${currentStepIndex === questions.length - 1 ? 'bg-accent text-black hover:bg-yellow-400' : 'bg-white text-black hover:bg-gray-200'}`}
                >
                  {isSubmitting ? (
                    <i className="ph ph-spinner animate-spin text-xl"></i>
                  ) : currentStepIndex === questions.length - 1 ? (
                    <><span>Join Waitlist</span> <i className="ph-bold ph-rocket"></i></>
                  ) : (
                    <>Next <i className="ph-bold ph-arrow-right"></i></>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="flex-1 flex flex-col items-center justify-center py-6 text-center animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6 border border-green-500/30">
                <i className="ph-fill ph-check-circle text-5xl text-green-500"></i>
              </div>
              <h3 className="text-3xl font-bold mb-3">You're on the list!</h3>
              <p className="text-muted text-lg">Thank you for your feedback. We'll email you at <span className="text-white font-medium">{answers['email']}</span> the moment we launch.</p>
            </div>
          )}
        </div>

        {(step === "intro" || step === "success") && (
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <div className="flex -space-x-3">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=facc15" className="w-10 h-10 rounded-full border-2 border-background z-30" alt="Avatar" />
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=c0aede" className="w-10 h-10 rounded-full border-2 border-background z-20" alt="Avatar" />
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Oliver&backgroundColor=b6e3f4" className="w-10 h-10 rounded-full border-2 border-background z-10" alt="Avatar" />
              <div className="w-10 h-10 rounded-full border-2 border-background bg-card flex items-center justify-center text-xs font-bold z-0">
                +2k
              </div>
            </div>
            <p className="text-sm text-gray-500 font-medium">Join over 2,000 Akokites waiting for launch</p>
          </div>
        )}
      </main>
    </>
  );
}
