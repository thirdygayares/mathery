from openai import OpenAI
from app.core.settings import settings

# one shared client for your whole app
client = OpenAI(api_key=settings.OPENAI_API_KEY)
