import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/auth.action";

export async function POST(request: Request) {
  const body = await request.json();

  // Handle VAPI's nested data format
  let data;
  if (body?.message?.toolCalls?.[0]?.function?.arguments) {
    // VAPI format: data is nested in message.toolCalls[0].function.arguments
    data =
      typeof body.message.toolCalls[0].function.arguments === "string"
        ? JSON.parse(body.message.toolCalls[0].function.arguments)
        : body.message.toolCalls[0].function.arguments;
  } else {
    // Direct format: data is in the root of the request body
    data = body;
  }

  const { type, role, level, techstack, amount, userid } = data;

  // Validate required fields
  if (!type || !role || !level || !amount || !techstack) {
    return Response.json(
      {
        success: false,
        error: "Missing required fields: type, role, level, amount, techstack",
      },
      { status: 400 }
    );
  }

  try {
    let currentUserId = userid;

    if (!currentUserId) {
      try {
        const user = await getCurrentUser();

        if (!user) {
          currentUserId = "temp-vapi-user-" + Date.now();
        } else {
          currentUserId = user.id;
        }
      } catch {
        return Response.json(
          {
            success: false,
            error: "Authentication failed. Please provide userid in request.",
          },
          { status: 401 }
        );
      }
    }

    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: currentUserId,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
