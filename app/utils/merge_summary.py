import logging
from typing import List
from app.core.openai_client import client  # <- use the shared client

def merge_summary(old: str, messages: List[str]) -> str:
    try:
        SYSTEM = (
            "You are Mathery's summary generator. "
            "Given the existing session summary and subsequent messages, "
            "produce an updated, concise summary that captures the key points."
        )
        user_content = (
            f"Existing Summary:\n{old}\n\n"
            "Here are the latest messages in chronological order:\n"
            + "\n".join(messages)
        )
        resp = client.chat.completions.create(
            model=settings.openai_model or "gpt-4-turbo",
            messages=[
                {"role": "system", "content": SYSTEM},
                {"role": "user",   "content": user_content},
            ],
            temperature=0.7,
            max_tokens=250,
        )
        return resp.choices[0].message.content.strip()
    except Exception:
        logging.exception("Failed to merge summary via OpenAI")
        # fallback...
        combined = old.strip()
        for m in messages:
            combined += "\n- " + m
        return combined
