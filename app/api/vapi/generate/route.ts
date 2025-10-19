import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";
import { getCurrentUser } from "@/lib/actions/auth.action";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();
  
  try {
    // Get current user from session if userid not provided
    let currentUserId = userid;
    
    if (!currentUserId) {
      console.log("No userid provided, attempting to get current user from session...");
      
      try {
        const user = await getCurrentUser();
        console.log("getCurrentUser result:", user ? "User found" : "No user found");
        
        if (!user) {
          console.log("No authenticated user found in session");
          
          // TEMPORARY WORKAROUND: Use a default user ID for VAPI workflow
          // TODO: Fix VAPI workflow to pass userid or fix session authentication
          console.log("Using temporary workaround - generating with default user ID");
          currentUserId = "temp-vapi-user-" + Date.now();
          
          // Uncomment the lines below to enforce authentication:
          // return Response.json(
          //   {
          //     success: false,
          //     error: "User authentication required. Please ensure you are signed in or provide userid in the request.",
          //     debug: "Session-based authentication failed. This usually means: 1) User is not signed in, 2) Session expired, or 3) VAPI workflow needs to pass userid parameter."
          //   },
          //   { status: 401 }
          // );
        }
        currentUserId = user.id;
        console.log("Using user ID from session:", currentUserId);
      } catch (authError) {
        console.error("Authentication error:", authError);
        return Response.json(
          {
            success: false,
            error: "Authentication failed. Please provide userid in request.",
            debug: "Session authentication error occurred."
          },
          { status: 401 }
        );
      }
    } else {
      console.log("Using provided userid:", currentUserId);
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
      userId: currentUserId, // Use the resolved user ID
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
