import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Check, CheckCircle2, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../lib/firebase-errors';

function CustomSelect({ options, placeholder, value, onChange }: { options: {value: string, label: string}[], placeholder: string, value: string, onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#1A1A1A] border-none rounded-lg px-4 py-3.5 text-left focus:outline-none focus:ring-1 focus:ring-white/20 transition-shadow text-sm flex items-center justify-between"
      >
        <span className={selectedOption ? "text-white/90" : "text-[#555]"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#888888] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-[#1A1A1A] border border-white/5 rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between"
                >
                  {option.label}
                  {value === option.value && <Check className="w-4 h-4 text-[#0066FF]" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Feedback() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showIncompletePopup, setShowIncompletePopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [comments, setComments] = useState('');
  const [botField, setBotField] = useState(''); // Honeypot field

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all fields are filled
    if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !comments.trim()) {
      setShowIncompletePopup(true);
      return;
    }

    setIsSubmitting(true);
    
    // Honeypot check: If a bot filled out the hidden field, silently reject it
    if (botField) {
      console.log("Bot detected.");
      setIsSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    const formData: any = {
      timestamp: serverTimestamp()
    };

    if (q1) formData.time_invested = q1;
    if (q2) formData.frustration_level = q2;
    if (q3) formData.bias_opinion = q3;
    if (q4) formData.usefulness = q4;
    if (q5) formData.recommend_likelihood = q5;
    if (q6) formData.return_likelihood = q6;
    if (comments) formData.comments = comments.slice(0, 2000);

    try {
      await addDoc(collection(db, 'feedback'), formData);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitted(true); // Show success anyway so user isn't stuck
      handleFirestoreError(error, OperationType.CREATE, 'feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  const q1Options = [
    { value: "less-than-1", label: "Less than 1 hour a week" },
    { value: "1-2-hours", label: "1–2 hours a week" },
    { value: "3-5-hours", label: "3–5 hours a week" },
    { value: "5-plus-hours", label: "5+ hours a week" },
  ];

  const q2Options = [
    { value: "1", label: "1 - Not frustrating at all" },
    { value: "2", label: "2 - Slightly frustrating" },
    { value: "3", label: "3 - Moderately frustrating" },
    { value: "4", label: "4 - Very frustrating" },
    { value: "5", label: "5 - Extremely frustrating" },
  ];

  const q3Options = [
    { value: "1", label: "1 - Strongly Disagree" },
    { value: "2", label: "2 - Disagree" },
    { value: "3", label: "3 - Neutral" },
    { value: "4", label: "4 - Agree" },
    { value: "5", label: "5 - Strongly Agree" },
  ];

  const q4Options = [
    { value: "1", label: "1 - Not at all useful" },
    { value: "2", label: "2 - Slightly useful" },
    { value: "3", label: "3 - Moderately useful" },
    { value: "4", label: "4 - Very useful" },
    { value: "5", label: "5 - Extremely useful" },
  ];

  const q5Options = [
    { value: "1", label: "1 - Very unlikely" },
    { value: "2", label: "2 - Unlikely" },
    { value: "3", label: "3 - Neutral" },
    { value: "4", label: "4 - Likely" },
    { value: "5", label: "5 - Very likely" },
  ];

  const q6Options = [
    { value: "1", label: "1 - Very unlikely" },
    { value: "2", label: "2 - Unlikely" },
    { value: "3", label: "3 - Neutral" },
    { value: "4", label: "4 - Likely" },
    { value: "5", label: "5 - Very likely" },
  ];

  return (
    <div className="flex-1 bg-black text-white font-sans selection:bg-indigo-500/30 flex items-center justify-center p-6 pt-32 lg:pt-40">
      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
        
        {/* Left Side - Text Block */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-10 max-w-lg mx-auto lg:mx-0 mt-12 lg:mt-0 text-center lg:text-left"
        >
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white">
              Help Us Build the Ultimate AI Tool Finder!
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#888888] leading-relaxed">
              Take this quick 2-minute survey to tell us what’s working, what isn’t, and what features you want to see next.
            </p>
          </div>

          <Link 
            to="/" 
            className="hidden lg:inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-[#1A1A1A] hover:bg-[#222222] rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>

        {/* Right Side - Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-2xl p-6 sm:p-10 shadow-2xl"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Honeypot Field - Hidden from users, visible to bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
              />
            </div>

            {/* Question 1 */}
            <div className="space-y-2">
              <label className="block text-sm text-[#888888]">
                1. How much time do you typically invest in searching for the best AI tools (via social media, articles, web searches, etc.)?
              </label>
              <CustomSelect 
                options={q1Options} 
                placeholder="Select an option..." 
                value={q1} 
                onChange={setQ1} 
              />
            </div>

            {/* Question 2 */}
            <div className="space-y-2">
              <label className="block text-sm text-[#888888]">
                2. How frustrating is the process of trying to keep up with the best AI tools on the market?
              </label>
              <CustomSelect 
                options={q2Options} 
                placeholder="Select an option..." 
                value={q2} 
                onChange={setQ2} 
              />
            </div>

            {/* Question 3 */}
            <div className="space-y-2">
              <label className="block text-sm text-[#888888]">
                3. "AI chatbots are biased toward recommending tools made by their own parent corporations."
              </label>
              <CustomSelect 
                options={q3Options} 
                placeholder="Select an option..." 
                value={q3} 
                onChange={setQ3} 
              />
            </div>

            {/* Question 4 & 5 Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col justify-between space-y-2">
                <label className="block text-sm text-[#888888]">
                  4. How useful did you find this app?
                </label>
                <CustomSelect 
                  options={q4Options} 
                  placeholder="Select an option..." 
                  value={q4} 
                  onChange={setQ4} 
                />
              </div>

              <div className="flex flex-col justify-between space-y-2">
                <label className="block text-sm text-[#888888]">
                  5. How likely are you to recommend this app to a friend or colleague?
                </label>
                <CustomSelect 
                  options={q5Options} 
                  placeholder="Select an option..." 
                  value={q5} 
                  onChange={setQ5} 
                />
              </div>
            </div>

            {/* Question 6 */}
            <div className="space-y-2">
              <label className="block text-sm text-[#888888]">
                6. How likely are you to return to the app when you are searching for a new AI tool?
              </label>
              <CustomSelect 
                options={q6Options} 
                placeholder="Select an option..." 
                value={q6} 
                onChange={setQ6} 
              />
            </div>

            {/* Question 7 */}
            <div className="space-y-2">
              <label className="block text-sm text-[#888888]">
                7. How can we improve? Please share any comments on your experience or suggestions for new features:
              </label>
              <textarea 
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Describe any details about your experience..."
                className="w-full bg-[#1A1A1A] border-none rounded-lg px-4 py-3.5 text-white/90 focus:outline-none focus:ring-1 focus:ring-white/20 transition-shadow resize-none text-sm placeholder:text-[#555]"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0066FF] hover:bg-[#005CE6] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-lg transition-colors mt-2"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </motion.div>

        {/* Mobile Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:hidden flex justify-center mt-[-1rem]"
        >
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-[#1A1A1A] hover:bg-[#222222] rounded-xl transition-colors w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </motion.div>

      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-2xl p-8 sm:p-12 max-w-lg w-full shadow-2xl text-center relative"
            >
              <div className="w-16 h-16 bg-[#0066FF]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#0066FF]" />
              </div>
              <h2 className="text-3xl font-semibold text-white mb-4 tracking-tight">Thanks!</h2>
              <p className="text-[#888888] text-lg mb-8 leading-relaxed">
                Your feedback directly decides which features we build next.
              </p>
              <Link
                to="/"
                className="inline-flex w-full items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-[#0066FF] hover:bg-[#005CE6] rounded-xl transition-colors"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Incomplete Form Popup */}
      <AnimatePresence>
        {showIncompletePopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0C0C0C] border border-[#1A1A1A] rounded-2xl p-8 sm:p-12 max-w-lg w-full shadow-2xl text-center relative"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-3xl font-semibold text-white mb-4 tracking-tight">Missing Fields</h2>
              <p className="text-[#888888] text-lg mb-8 leading-relaxed">
                Please fill out all the questions and provide a comment before submitting your feedback.
              </p>
              <button
                onClick={() => setShowIncompletePopup(false)}
                className="inline-flex w-full items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-[#1A1A1A] hover:bg-[#222222] rounded-xl transition-colors"
              >
                Go Back
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
