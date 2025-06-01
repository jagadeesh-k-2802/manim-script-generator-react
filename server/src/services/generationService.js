import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateManimScript(prompt) {
  try {
    console.log('Received prompt:', prompt);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const fullPrompt = `You are a Manim expert. Create a Python script using Manim that ${prompt}.
    The script MUST include:
    1. All necessary imports (from manim import *)
    2. A class named 'Scene' that inherits from Scene
    3. A construct method in the Scene class
    4. The actual animation code inside the construct method
    5. The Class Should always be named 'Scene'
    6. Don't use any assets, just use the basic shapes and colors
    7. Don't use Latex, just use the basic shapes and colors
    8. Don't use any other libraries, just use the basic shapes and colors
    9. Make sure the code is formatted correctly, with proper indentation and spacing

    Example structure:
    from manim import *

    class Scene(Scene):
        def construct(self):
            # Your animation code here
            pass

    Only return the Python code, no explanations.`;

    console.log('Sending prompt to Gemini:', fullPrompt);

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    console.log('Received response from Gemini:', text);

    // Remove backticks and clean up the code
    const cleanCode = text.replace(/```python\n?|\n?```/g, '').trim();

    return cleanCode;
  } catch (error) {
    console.error('Error generating script:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      apiKey: process.env.GEMINI_API_KEY ? 'exists' : 'missing'
    });
    throw error;
  }
}
