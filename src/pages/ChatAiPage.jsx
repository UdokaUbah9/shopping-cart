import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer";
import { HiOutlineMicrophone, HiOutlinePlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ChatAi() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { messages, setMessages } = useCart();

  const messagesEndRef = useRef(null);
  const startDate = new Date();
  
  const formatterDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(startDate)
  const formattedDate = formatterDate.charAt(0).toUpperCase() + formatterDate.slice(1);

  //SCROLL TO THE BOTTOM WHEN A NEW MESSAGE IS ADDED
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //TYPE A QUESTION   IN THE INPUT
 const userMessage = async () => {
  if (!input.trim()) return;

  // Add user message to UI
  setMessages((messages) => [...messages, { from: "user", text: input }]);
  const currentInput = input; // store input before clearing
  setInput("");

  // Show typing indicator
  setMessages((messages) => [...messages, { from: "bot", text: "Thinking..." }]);
  setIsTyping(true);

  try {
    // Send POST request to your backend
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: currentInput }),
    });

    const data = await res.json();

    // Replace "Typing..." with real bot reply
    setMessages((messages) =>
      messages.map((msg) =>
        msg.text === "Thinking..."
          ? { from: "bot", text: data.reply }
          : msg
      )
    );
  } catch (error) {
    console.error("Error:", error);
    // Replace "Typing..." with an error message
    setMessages((messages) =>
      messages.map((msg) =>
        msg.text === "Thinking  ..."
          ? { from: "bot", text: "⚠️ Something went wrong. Try again." }
          : msg
      )
    );
  } finally {
    setIsTyping(false);
  }
};


  //AN INDICATOR OF A BOT TYPING

  //A BOT GIVES A REPLY DEPENDING ON THE WORD THAT WAS FOUND IN THE INPUT

  //A BOT REPLY GOT SAVED IN THE ARRAY AS WELL

  if (messages.length === 0)
    return (
      <div className="relative">
        <h1 className="font-bold text-2xl text-center py-3 px-4 tracking-wide">
          Support Chat
        </h1>
        <BackButton />

        <main
          className="min-h-[85vh] flex flex-col justify-center items-center text-center space-y-8"
          role="main"
        >
          <img
            src="/support-images/chatai.png"
            alt="Support chat"
            className="mx-auto"
          />

          <p className="text-limegreenChat font-bold text-2xl">
            What can I help you with friend?
          </p>

          <div className="mt-4 w-full flex gap-2">
            <div className="relative flex-1">
              <HiOutlinePlus className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-lg z-10 cursor-pointer" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything"
                className="pl-10 pr-10 py-2 rounded w-full font-roboto bg-limegreenPrimary h-10 text-zinc-800 focus:outline-none focus:ring-2  focus:ring-limegreenSecondary"
              />
              <HiOutlineMicrophone className="absolute top-1/2 -translate-y-1/2 text-zinc-500 right-0 text-2xl z-10 cursor-pointer" />
            </div>

            <button
              className="bg-limegreenSecondary text-limegreenLight py-2 px-3 rounded-lg"
              onClick={() => userMessage()}
            >
              Send
            </button>
          </div>
        </main>

        <Footer type="home" />
      </div>
    );

  if (messages.length > 0)
    return (
      <div>
        <div className="sticky top-0 bg-white h-[80px]">
          <Link to="/">
            <button className="absolute top-3 left-1 text-2xl">&larr; </button>
          </Link>
          <h1 className="font-semibold tracking-wider text-xl text-center py-3 px-4 mb-4">
            Support Chat
          </h1>
        </div>
        <main
  className="flex flex-col space-y-8 max-h-[460px] h-[460px] md:h-[360px] p-2"
  role="main"
>
<p className="text-zinc-700 text-center p-0">{formattedDate}</p>
 
  <div className="space-y-4 flex-1 overflow-y-scroll px-4 [scrollbar-width:none]"> 
    {messages.map((message, index) => (
      <div
        key={index}
        className={`relative flex ${
          message.from === "bot" ? "justify-start" : "justify-end"
        }`}
      >
        <div
          className={
            message.text === "Thinking..."
              ? "text-sm text-gray-500 italic" // simple style for typing
              : message.from === "bot"
              ? "bg-limegreenLight py-3 px-4 rounded-2xl rounded-bl-none tracking-wide w-fit font-semibold relative"
              : "bg-limegreenSecondary py-3 px-4 rounded-2xl rounded-br-none tracking-wide w-fit font-semibold relative text-white"
          }
        >
          {/* Markdown-enabled message text */}
          <div className="whitespace-pre-line">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>

          {/* Tail SVG only if not typing */}
          {message.text !== "Thinking..." &&
            (message.from === "bot" ? (
              <svg
                className="absolute left-0 bottom-0 -ml-3"
                width="12"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0 L0 8 L12 16 Z" fill="#D9F99D" />
              </svg>
            ) : (
              <svg
                className="absolute right-0 bottom-0 -mr-3 rotate-180"
                width="12"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0 L0 8 L12 16 Z" fill="#65A30D" />
              </svg>
            ))}
        </div>
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>

  <div className="relative mt-4 w-full gap-2 flex">
    <img src="/search-images/microphone.png" alt="microphone" className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-lg z-10" />
    <input
      type="text"
      placeholder="Ask anything"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="pl-10 pr-10 py-2 rounded w-full font-roboto bg-limegreenPrimary h-10 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-limegreenSecondary"
    />
    <button disabled={isTyping}
      className={`${isTyping ? "bg-slate-400" : "bg-limegreenSecondary"} text-limegreenLight py-2 px-3 rounded-lg`}
      onClick={() => userMessage()}
    >
      Send
    </button>
  </div>
</main>


        <Footer type="home" />
      </div>
    );
}

// <p className="bg-limegreenLight py-2 px-3 rounded-2xl rounded-bl-none tracking-wider w-fit">
//             Yes
//           </p>
// className={`${message.from === "you" && "text-right"}`}

//RESPONSES
//prettier-ignore
//   const replies = [
//   { keywords: ["hello", "hi", "hey", "hy"], response: "Hello! How can I assist you today?" },
//   { keywords: ["support"], response: "Our support team is available 24/7. What can I help you with?" },
//   { keywords: ["product"], response: "Which product are you interested in? I can provide more details." },
//   { keywords: ["order"], response: "To check your order status, please provide your order number." },
//   { keywords: ["expire"], response: "If your product has expired, please contact our support for a replacement." },
//   { keywords: ["refund"], response: "You can request a refund within 30 days of purchase. Would you like instructions?" },
//   { keywords: ["deliver", "delivery", "delivering"], response: "Delivery usually takes 3-5 business days." },
//   { keywords: ["pay", "paying", "payments", "payment", "pays"], response: "We accept credit cards, PayPal, and Apple Pay." },
//   { keywords: ["delay"], response: "We apologize for any delays. Please share your order number for updates." },
//   { keywords: ["discount"], response: "Currently, we have a 20% discount on select products!" },
//   { keywords: ["expensive"], response: "We offer competitive pricing and value for money. Let me know if you want a quote." },
//   { keywords: ["cheap"], response: "We have budget-friendly options available! What’s your budget?" },
//   { keywords: ["satisfy", "satisfied"], response: "We aim for 100% satisfaction! Let us know how we can improve." },
//   { keywords: ["cancel"], response: "You can cancel your order within 24 hours of placing it." },
//   { keywords: ["return"], response: "Returns are accepted within 30 days. Would you like to start a return?" },
//   { keywords: ["shipping"], response: "Shipping is free for orders over $50." },
//   { keywords: ["hours", "open", "opening", "opens", "opened"], response: "Our store hours are 9 AM - 6 PM, Monday to Friday." },
//   { keywords: ["track", "tracking"], response: "Please provide your tracking or order number for status updates." },
//   { keywords: ["payment method"], response: "We accept Visa, MasterCard, PayPal, and more." },

//   // New expanded topics:
//   { keywords: ["how are you", "how doing", "how's it going"], response: "I'm doing great, thanks for asking! How about you?" },
//   { keywords: ["medicine", "drug", "drugs", "health", "recover", "pain", "paining", "pains"], response: "For health-related queries, please consult a healthcare professional. I can assist with product info though!" },
//   { keywords: ["day going", "day went", "day goes"], response: "I hope your day is going well! How can I assist you further?" },
//   { keywords: ["budget"], response: "Let me know your budget, and I can suggest some options within that range." },
//   { keywords: ["weekend", "week", "weeks"], response: "Looking forward to the weekend? I’m here whenever you need help!" },
//   { keywords: ["price", "prices"], response: "Our prices vary by product. Which item are you interested in?" },
//   { keywords: ["day", "days", "month", "months"], response: "Are you asking about delivery times or product availability?" },
//   { keywords: ["weak"], response: "If you’re feeling weak, please make sure to rest and stay hydrated. Let me know if you need product info." },
//   { keywords: ["sleep", "sleeping"], response: "Good sleep is important! We have some products that might help if you're interested." },
//   { keywords: ["many", "consuming"], response: "Could you please clarify your question so I can assist better?" },
//   { keywords: ["eye", "eyes"], response: "For eye care products, I can provide recommendations or details." },
//   { keywords: ["ears"], response: "We offer products related to ear health and care. What do you need help with?" },
//   { keywords: ["skin"], response: "Our skincare products are quite popular! What type of skin concern do you have?" },
//   { keywords: ["body", "parts", "sense"], response: "I can help with product info related to various body parts or senses. What specifically are you interested in?" },
//   // More general fallback
//   { keywords: ["how much", "cost", "costs", "price"], response: "Could you please specify which product or service you're asking about?" },
//   { keywords: ["paracetamol"], response: "Paracetamol is commonly used to relieve pain and reduce fever. Always follow the dosage instructions on the package or your doctor's advice." },
//   { keywords: ["water"], response: "Staying hydrated is important! Drinking plenty of water can help with recovery and overall health." },
//   { keywords: ["how to take", "taking drugs", "drug usage", "medicine usage"], response: "Always follow the instructions on the medicine label or your healthcare provider's advice when taking any medication." },
//   { keywords: ["health"], response: "For health-related questions, I recommend consulting a healthcare professional. I can help with product information though!" },
//   // You can keep adding similar:
//   { keywords: ["side effects"], response: "If you experience any side effects from a medication, please contact your healthcare provider immediately." },
//   { keywords: ["symptoms"], response: "Can you describe your symptoms? I might be able to help with product suggestions or direct you to support." },
//   { keywords: ["thanks", "thank you", "okay", "kk", "ok"], response: "You're welcome! If you have more questions, just ask." },
//   { keywords: ["pain relief", "pain killer", "painkiller"], response: "We have several pain relief products available. Are you looking for something specific or general advice?" },
//   { keywords: ["how old", "age"], response: "Could you please specify what you mean by 'how old'? Are you asking about product suitability by age or something else?" },
//   { keywords: ["how many", "quantity"], response: "Please let me know what you are referring to, so I can provide accurate information on quantities or limits." },
//   { keywords: ["headache"], response: "For headaches, we recommend over-the-counter pain relief like paracetamol or ibuprofen. If pain persists, please consult a doctor." },
//   { keywords: ["backpain", "back pain"], response: "Back pain can be tough! We have some products that might help, but seeing a healthcare professional is best for persistent issues." },
//   { keywords: ["ear pain", "earpain"], response: "Ear pain can be caused by various reasons. For relief, we offer ear drops and soothing remedies, but please see a doctor if pain is severe." },
//   { keywords: ["pain"], response: "If you’re experiencing pain, please tell me more so I can recommend the best product or advice." },
//    {keywords: ["how much are your drugs", "price of drugs", "cost of drugs", "drug prices"],
//   response: "Our drug prices vary depending on the product. Could you please specify which medication you're interested in?"}, {
//   keywords: ["i love you", "love you", "love"],
//   response: "That's so kind of you! I'm here to help whenever you need. 😊"
// },
// {
//   keywords: ["you are welcome", "welldone", "well done", "weldone"],
//   response: "Thank you! I'm glad I could help. 😊"
// }, {
//   keywords: [
//     "help",
//     "helping",
//     "helped",
//     "helps",
//     "assist",
//     "assistance",
//     "i need help",
//     "i need assist",
//     "yes"
//   ],
//   response: "I'm here to assist you! Please tell me how I can help."
// }

// ];
