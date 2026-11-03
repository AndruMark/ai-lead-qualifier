import { NextRequest, NextResponse } from "next/server";
import { calculateLeadScore } from "@/lib/leadScorer";

interface ChatPayload {
  messages: Array<{ role: string; content: string }>;
  leadContext?: {
    name?: string;
    email?: string;
    company?: string;
    budget?: string;
    timeline?: string;
    useCase?: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatPayload;
    const { messages, leadContext } = body;
    const lastUserMessage = messages.filter((m) => m.role === "user").pop()?.content || "";

    let reply = "";
    const lower = lastUserMessage.toLowerCase();

    if (!leadContext?.name && (lower.includes("soy") || lower.includes("name is") || lower.includes("me llamo") || lower.includes("i am"))) {
      reply = "Great to connect with you! Could you share what company you represent and your business email so we can tailor our solution?";
    } else if (!leadContext?.company && (lower.includes(".com") || lower.includes("@") || lower.includes("inc") || lower.includes("corp") || lower.includes("agency"))) {
      reply = "Understood. To match you with the right pipeline and resources, what is your estimated monthly budget for this initiative (e.g. < $5,000, $5k-$20k, or Enterprise)?";
    } else if (!leadContext?.budget && (lower.includes("$") || lower.includes("budget") || lower.includes("k") || lower.includes("presupuesto"))) {
      reply = "Got it. And what is your target deployment timeline? Are you looking to launch immediately, in 1-3 months, or later this year?";
    } else if (!leadContext?.timeline && (lower.includes("month") || lower.includes("asap") || lower.includes("inmediato") || lower.includes("urgente") || lower.includes("semanas"))) {
      reply = "Excellent. Lastly, could you briefly describe the primary goal or use case you want to solve with our automated AI qualification widget?";
    } else {
      reply = "Thank you for the details. Based on our conversation, our automated qualification engine has processed your requirements. You can now finalize your submission below to route your profile directly to our specialized sales engineers.";
    }

    const scoring = calculateLeadScore({
      budgetStr: leadContext?.budget || (lower.includes("20k") ? "> $20,000" : "$5,000 - $20,000"),
      timelineStr: leadContext?.timeline || (lower.includes("asap") || lower.includes("inmediato") ? "Immediate" : "1-3 months"),
      useCaseStr: lastUserMessage || "Conversational pipeline qualification",
    });

    return NextResponse.json({
      reply,
      extracted: leadContext,
      score: scoring.score,
      status: scoring.status,
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Failed to process qualification dialogue" },
      { status: 500 }
    );
  }
}
