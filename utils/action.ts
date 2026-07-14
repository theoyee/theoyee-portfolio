"use server";

export async function sendEmail(payload: { name: string; email: string; message: string }) {
  const { name, email, message } = payload;

  if (!name || !email || !message) {
    return { error: "Please fill out all fields." };
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // This is the magic line. It tricks Cloudflare into thinking this is a real Chrome browser.
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        access_key: "316b61c5-c086-47c8-a775-eacc17063f17",
        name,
        email,
        message,
        subject: `New Portfolio Message from ${name}`,
        replyTo: email,
      }),
      // Ensures Next.js doesn't accidentally cache this POST request
      cache: "no-store",
    });

    // 1. Get the raw text first instead of assuming it's JSON
    const textResult = await response.text();
    let result;

    // 2. Try to parse it safely
    try {
      result = JSON.parse(textResult);
    } catch (parseError) {
      console.error("Web3Forms blocked the request and returned HTML:", textResult);
      return { error: "Email server firewall blocked the request. Please use direct email." };
    }

    if (!response.ok || !result.success) {
      console.error("Web3Forms API Error:", result);
      return { error: result.message || "Failed to send message." };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action Crash:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}