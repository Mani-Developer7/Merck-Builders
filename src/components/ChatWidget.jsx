import { useState, useRef, useEffect } from 'react';

// Lightweight rule-based assistant so the UI works out of the box.
// To upgrade to a real AI assistant, replace `getReply` with a call to
// your backend (which can in turn call the Anthropic API) instead of
// the canned responses below.
const getReply = (message) => {
  const m = message.toLowerCase();
  if (m.includes('price') || m.includes('cost')) {
    return 'Pricing varies by project and unit type. Check the project detail page for "Starting From" pricing, or use our EMI calculator to estimate installments.';
  }
  if (m.includes('visit') || m.includes('tour')) {
    return 'You can schedule a site visit from any project page — look for the "Schedule a Site Visit" button.';
  }
  if (m.includes('location') || m.includes('where')) {
    return 'Marjan Classic Mall & Residency is located in Sector 16-A, Shah Latif Town, Karachi. See the map on our Home and Contact pages.';
  }
  if (m.includes('contact') || m.includes('call') || m.includes('phone')) {
    return 'You can reach our sales office at +92 300 0000000 or info@marjanclassic.com.';
  }
  if (m.includes('career') || m.includes('job')) {
    return 'Open roles are listed on our Careers page — take a look and apply directly there.';
  }
  return "Thanks for your message! For detailed queries, our sales team will follow up, or you can browse our Projects and Gallery pages in the meantime.";
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I can help with pricing, site visits, location, or careers. What would you like to know?' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const reply = { from: 'bot', text: getReply(input) };
    setMessages((prev) => [...prev, userMsg, reply]);
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-brass text-ink flex items-center justify-center text-2xl shadow-2xl hover:scale-105 transition-transform"
      >
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-h-[28rem] bg-ink-2 border border-brass/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-ink px-4 py-3 border-b border-brass/20">
            <div className="font-display text-stone">Marjan Assistant</div>
            <div className="text-[11px] text-stone/50">Typically replies instantly</div>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm max-w-[85%] px-3 py-2 rounded-xl ${
                  m.from === 'bot'
                    ? 'bg-ink text-stone/90 self-start'
                    : 'bg-brass text-ink ml-auto self-end'
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="p-3 border-t border-brass/20 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 bg-ink border border-brass/20 rounded-full px-4 py-2 text-sm text-stone placeholder:text-stone/40"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-brass text-ink flex items-center justify-center"
              aria-label="Send"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
