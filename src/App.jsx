import React, { useState } from "react";
import {
  Home,
  ClipboardCheck,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Info,
} from "lucide-react";

const buyerPhases = [
  {
    name: "Pre-Contract",
    icon: <Home className="w-5 h-5" />,
    color: "text-blue-600",
    tasks: [
      {
        task: "Client Qualification",
        note: "Verify pre-approval or proof of funds before showings.",
        link: "https://www.consumerfinance.gov/owning-a-home/loan-options/",
      },
      {
        task: "Representation Agreement",
        note: "Ensure buyer signs exclusive representation agreement.",
      },
      {
        task: "Property Search",
        note: "Set up MLS alerts and refine search criteria.",
      },
      {
        task: "Showing Coordination",
        note: "Schedule showings, confirm availability, track feedback.",
      },
    ],
  },
  {
    name: "Under Contract",
    icon: <FileText className="w-5 h-5" />,
    color: "text-blue-600",
    tasks: [
      {
        task: "Offer Submission",
        note: "Confirm offer completeness, signatures, and timelines.",
      },
      {
        task: "Home Inspection",
        note: "Schedule inspection within contract deadlines.",
        link: "https://www.homeinspector.org/",
      },
      {
        task: "Appraisal",
        note: "Coordinate lender appraisal; verify value supports offer.",
      },
      {
        task: "Title Review",
        note: "Ensure title report is reviewed; confirm no encumbrances.",
      },
      {
        task: "Repair Negotiations",
        note: "Submit repair addenda within contingency deadlines.",
      },
    ],
  },
  {
    name: "Closing",
    icon: <ClipboardCheck className="w-5 h-5" />,
    color: "text-blue-600",
    tasks: [
      {
        task: "Closing Disclosure Review",
        note: "Buyer must receive at least 3 days before closing.",
        link: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/",
      },
      {
        task: "Wire Transfer Verification",
        note: "Confirm wiring instructions directly with title company.",
      },
      {
        task: "Final Walkthrough",
        note: "Confirm property condition and repairs before settlement.",
      },
      {
        task: "Document Signing & Key Delivery",
        note: "Coordinate signing appointment and key exchange.",
      },
    ],
  },
];

const sellerPhases = [
  {
    name: "Pre-Listing",
    icon: <Home className="w-5 h-5" />,
    color: "text-green-600",
    tasks: [
      {
        task: "Listing Agreement",
        note: "Ensure seller signs exclusive right-to-sell agreement.",
      },
      {
        task: "Comparative Market Analysis (CMA)",
        note: "Prepare pricing strategy and review with seller.",
      },
      {
        task: "Staging & Photography",
        note: "Coordinate prep, photography, and media materials.",
      },
      {
        task: "Seller Disclosures",
        note: "Provide and review required property disclosure forms.",
      },
      {
        task: "Lockbox & Sign Setup",
        note: "Install signage and secure property access.",
      },
    ],
  },
  {
    name: "Active Marketing",
    icon: <Users className="w-5 h-5" />,
    color: "text-green-600",
    tasks: [
      {
        task: "MLS Listing Activation",
        note: "Verify accuracy of all listing details and upload media.",
      },
      {
        task: "Virtual Tours & Social Media",
        note: "Promote across channels to maximize exposure.",
      },
      {
        task: "Open Houses",
        note: "Plan and host; collect visitor feedback.",
      },
      {
        task: "Feedback Collection",
        note: "Share buyer/agent feedback with seller weekly.",
      },
    ],
  },
  {
    name: "Under Contract",
    icon: <FileText className="w-5 h-5" />,
    color: "text-green-600",
    tasks: [
      {
        task: "Offer Review & Negotiation",
        note: "Present offers promptly; discuss pros/cons with seller.",
      },
      {
        task: "Inspection Coordination",
        note: "Schedule and manage buyer inspections per contract.",
      },
      {
        task: "HOA / Condo Docs",
        note: "Provide association documents to buyer timely.",
      },
      {
        task: "Move-Out Planning",
        note: "Coordinate timing with closing and possession.",
      },
    ],
  },
  {
    name: "Closing",
    icon: <DollarSign className="w-5 h-5" />,
    color: "text-green-600",
    tasks: [
      {
        task: "Settlement Review",
        note: "Verify final settlement statement with seller.",
      },
      {
        task: "Closing Appointment",
        note: "Confirm signing date/time and ID requirements.",
      },
      {
        task: "Utilities & Keys",
        note: "Ensure utilities transferred and keys/remotes provided.",
      },
      {
        task: "Proceeds Confirmation",
        note: "Confirm wire receipt or check delivery post-closing.",
      },
    ],
  },
];

export default function App() {
  const [transactionType, setTransactionType] = useState("buyer");
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({});

  const phases = transactionType === "buyer" ? buyerPhases : sellerPhases;
  const primaryColor =
    transactionType === "buyer" ? "blue" : "green";

  const totalTasks = phases.reduce(
    (acc, phase) => acc + phase.tasks.length,
    0
  );
  const completedTasks = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const toggleTask = (phase, index) => {
    const key = `${phase}-${index}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleExpand = (phaseName) => {
    setExpanded((prev) => ({ ...prev, [phaseName]: !prev[phaseName] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Real Estate Transaction Checklist
        </h1>

        {/* Transaction Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setTransactionType("buyer")}
            className={`px-4 py-2 rounded-lg font-semibold border ${
              transactionType === "buyer"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white border-gray-300 text-gray-600"
            }`}
          >
            Buyer Transaction
          </button>
          <button
            onClick={() => setTransactionType("seller")}
            className={`px-4 py-2 rounded-lg font-semibold border ${
              transactionType === "seller"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white border-gray-300 text-gray-600"
            }`}
          >
            Seller Transaction
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 bg-${primaryColor}-600`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Checklist Phases */}
        <div className="space-y-4">
          {phases.map((phase) => (
            <div
              key={phase.name}
              className="border rounded-xl bg-gray-50 shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left font-semibold"
                onClick={() => toggleExpand(phase.name)}
              >
                <span className="flex items-center gap-2">
                  <span className={`${phase.color}`}>{phase.icon}</span>
                  {phase.name}
                </span>
                <span className="text-gray-500 text-sm">
                  {expanded[phase.name] ? "▲" : "▼"}
                </span>
              </button>
              {expanded[phase.name] && (
                <div className="p-4 space-y-3 bg-white">
                  {phase.tasks.map((task, index) => {
                    const key = `${phase.name}-${index}`;
                    return (
                      <div
                        key={key}
                        className="flex items-start gap-3 border-b pb-2"
                      >
                        <input
                          id={key}
                          type="checkbox"
                          checked={checked[key] || false}
                          onChange={() => toggleTask(phase.name, index)}
                          className="mt-1 w-5 h-5 accent-blue-600"
                        />
                        <label
                          htmlFor={key}
                          className={`flex-1 ${
                            checked[key]
                              ? "line-through text-gray-400"
                              : "text-gray-800"
                          }`}
                        >
                          <span className="font-medium block">
                            {task.task}
                          </span>
                          <span className="text-sm text-gray-500">
                            {task.note}
                          </span>
                          {task.link && (
                            <a
                              href={task.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-blue-600 hover:underline text-sm mt-1"
                            >
                              Resource ↗
                            </a>
                          )}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reminder Section */}
        <div className="mt-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg flex gap-3">
          <Info className="w-6 h-6 text-yellow-600" />
          <div className="text-sm text-yellow-800">
            <p className="font-semibold">Important Reminders:</p>
            <ul className="list-disc ml-5 space-y-1">
              <li>Timelines vary by state and contract.</li>
              <li>Verify deadlines in all purchase agreements.</li>
              <li>Maintain clear communication with all parties.</li>
              <li>Organize documents and retain transaction files.</li>
              <li>Confirm all state-specific disclosures are complete.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
