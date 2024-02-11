import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator')
    if(!prompt) return new Response('Prompt not found', {status: 404});
  } catch (error) {
    return new Response(JSON.stringify(prompts), { status: 200 });
  }
};

// PATCH (update)

// DELETE (delete)
