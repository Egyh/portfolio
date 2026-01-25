import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/app/lib/validations/contactSchema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = await contactSchema.validate(body, {
      abortEarly: false,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASS,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_USER,
      to: process.env.AUTH_USER,
      subject: `[Portfolio] ${validatedData.name}様からのお問い合わせ`,
      text: `
名前: ${validatedData.name}
メール: ${validatedData.email}

メッセージ:
${validatedData.message}
      `,
      html: `
<h2>ポートフォリオサイトからのお問い合わせ</h2>
<p><strong>名前:</strong> ${validatedData.name}</p>
<p><strong>メール:</strong> ${validatedData.email}</p>
<h3>メッセージ:</h3>
<p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "メッセージを送信しました" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { message: "入力内容に誤りがあります", errors: (error as { errors?: string[] }).errors },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "送信に失敗しました。しばらく経ってからお試しください。" },
      { status: 500 }
    );
  }
}
